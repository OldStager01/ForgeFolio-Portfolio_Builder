import { Request, Response } from "express";
import { Course, Profile } from "../../model/schema";
import { request } from "websocket";
import mongoose from "mongoose";
import { removeCoursePreview, uploadCousePreview } from "../../services/cloudinary";

export const userAddCourseController = async (req: Request, res: Response) => {
    try {
        const authId = req.authId;   // Assuming you're using middleware to get authId
        const profileId = req.profileId;  // Assuming you're using middleware to get profileId

        // Extract the course details from the request body
        const { name, description, technologies, tutor, platform, year } = req.body;

        // Validate if profileId exists
        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'User Profile not found' });
        }

        // Create a new course
        const newCourse = await Course.create({
            name,
            description,
            technologies,
            tutor,
            platform,
            year,
            preview: "#"
        });

        // Add the new course's ID to the profile's courses array
        await Profile.findByIdAndUpdate(profileId, {
            $push: { courses: newCourse._id }
        });

        return res.status(200).json({
            message: 'Course added successfully',
            course: newCourse
        });
    } catch (error) {
        console.log('Error adding course:', error);
        res.status(500).json({
            msg: 'Something went wrong!'
        });
    }
};

export const userUpdateCourseController = async (req: Request, res: Response) => {
    const profileId = req.profileId;
    const courseId = req.params.courseId;

    // validation for courseId ( mongoose object id is valid or not ? : pending )

    try {
        const profileId = req.profileId;
        const courseId = req.params.courseId;


        // Validate if profileId exists
        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'User Profile not found' });
        }

        // Check if the course is associated with the profile
        const isCourseAssociated = profile.courses.includes(new mongoose.Types.ObjectId(courseId));
        if (!isCourseAssociated) {
            return res.status(403).json({ message: 'This course is not associated with your profile' });
        }

        // Extract the updated course details from the request body
        const { name, description, technologies, tutor, platform, year } = req.body;

        // Update the course details
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                name,
                description,
                technologies,
                tutor,
                platform,
                year,
            },
            { new: true, runValidators: true }  // Options to return the updated document and validate the fields
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        return res.status(200).json({
            message: 'Course updated successfully',
            course: updatedCourse,
        });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ message: 'Something went wrong!' });
    }
}

export const userAddPreviewController = async (req: Request, res: Response) => {
    try {
        const profileId = req.profileId;
        const courseId = req.params.courseId;

        // Validate if the courseId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ message: 'Invalid Course ID' });
        }

        // Find the profile by profileId
        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'User Profile not found' });
        }

        // Check if the course is associated with the profile
        const courseObjectId = new mongoose.Types.ObjectId(courseId);
        const isCourseAssociated = profile.courses.includes(courseObjectId);
        if (!isCourseAssociated) {
            return res.status(403).json({ message: 'This course is not associated with your profile' });
        }

        // Find the course to check for an existing preview
        const course = await Course.findById(courseObjectId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found!' });
        }

        // If no file is provided, remove the existing preview if it exists
        if (!req.file) {
            if (course.preview) {
                const prevPublicId = course.preview.split('/').pop()?.split('.')[0]; // Extract public ID from the URL
                if (prevPublicId) {
                    await removeCoursePreview(prevPublicId); // Function to remove the preview from cloud storage
                }

                // Remove the preview from the database
                await Course.findByIdAndUpdate(
                    courseObjectId,
                    { $set: { preview: "#" } }, // Removes the 'preview' field
                    { new: true }
                );

                return res.status(200).json({ message: "Preview removed successfully!" });
            }
            else {
                return res.status(200).json({
                    msg: "File Not Found"
                })
            }
        }
        else {

            // Validate the uploaded file if a file is provided
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (!allowedMimeTypes.includes(req.file.mimetype)) {
                return res.status(400).json({ message: 'Invalid file type! Only images (JPEG, PNG, WebP) are allowed.' });
            }

            // If the course already has a preview, delete the old one from cloud storage
            if (course.preview) {
                const prevPublicId = course.preview.split('/').pop()?.split('.')[0];
                if (prevPublicId) {
                    await removeCoursePreview(prevPublicId); // Function to remove the preview from cloud storage
                }

                // Generate a unique public ID for the new preview using course ID and current timestamp
                const publicId = `coursePreview_${profile.name?.split(' ')[0]}_${courseId}_${Date.now()}`;

                // Upload the new file to cloud storage (assuming you're using Cloudinary or a similar service)
                const uploadResult = await uploadCousePreview(req.file.buffer, publicId);

                // Update the course with the new preview URL
                const updatedCourse = await Course.findByIdAndUpdate(
                    courseObjectId,
                    { $set: { preview: uploadResult.secure_url } },
                    { new: true }
                );

                return res.status(200).json({
                    message: 'Course preview updated successfully',
                    course: updatedCourse
                });

            }
        }
    } catch (error) {
        console.error('Error updating course preview:', error);
        return res.status(500).json({ message: 'Server error' });
    }

}
