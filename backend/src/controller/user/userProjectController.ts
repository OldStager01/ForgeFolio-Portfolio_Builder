import { Request, Response } from "express";
import { Profile, Project } from "../../model/schema";
import mongoose from "mongoose";
import { removeProjectImage, uploadAvatar, uploadImage, uploadProjectImage } from "../../services/cloudinary";


export const userAddProjectController = async (req: Request, res: Response) => {
    try {
        const authId = req.authId;
        const profileId = req.profileId;

        // Extract the project details from the request body
        const { name, description, technologies, githubLink, website, images } = req.body;

        // Validate if profileId exists
        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'User Profile not found' });
        }


        // Create a new project
        const newProject = await Project.create({
            name,
            description,
            technologies,
            githubLink,
            website,
            images: []
        });

        // Add the new project's ID to the profile's projects array
        await Profile.findByIdAndUpdate(profileId, {
            $push: { projects: newProject._id }
        });

        return res.status(200).json({
            message: 'Project added successfully',
            project: newProject
        });
    } catch (error) {
        console.log("error is : ", error);
        res.status(500).json({
            msg: "Something went wrong !"
        });
    }
}

export const userUpdateProjectController = async (req: Request, res: Response) => {

    try {
        let profileId = req.profileId
        let { projectId } = req.params


        if (!profileId) return res.status(400).json({
            msg: "Profile Id is required !"
        })
        const profile = await Profile.findById(profileId);
        if (!profile || !profile.projects.includes(new mongoose.Types.ObjectId(projectId))) {
            return res.status(400).json({ msg: "Profile or Project not Found" })
        }

        const { name, description, technologies, githubLink, website, images } = req.body;
        const updateFields: Partial<{
            name: string;
            description: string;
            technologies: string[];
            githubLink: string;
            website: string;
            images: string[];
        }> = {};

        if (name) updateFields.name = name;
        if (description) updateFields.description = description;
        if (technologies && Array.isArray(technologies)) updateFields.technologies = technologies;
        if (githubLink) updateFields.githubLink = githubLink;
        if (website) updateFields.website = website;
        if (images && Array.isArray(images)) updateFields.images = images;

        // Find and update the project in the Project collection
        const updatedProject = await Project.findByIdAndUpdate(
            projectId,
            { $set: updateFields },
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        return res.status(200).json({
            message: 'Project updated successfully',
            project: updatedProject
        });

    }
    catch (error) {
        console.error('Error updating project:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const userProjectImageController = async (req: Request, res: Response) => {
    try {
        const profileId = req.profileId; // Get the profile ID from middleware
        const projectId = req.params.projectId; // Get the project ID from request params

        // Validate if the projectId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({ message: 'Invalid Project ID' });
        }

        // Find the profile by profileId and populate projects
        const profile = await Profile.findById(profileId).populate('projects');
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found!' });
        }

        // Check if the projectId is associated with the profile using includes
        const isProjectAssociated = profile.projects.some(p => p._id.toString() === projectId);
        if (!isProjectAssociated) {
            return res.status(403).json({ message: 'This project is not associated with your profile!' });
        }

        // Use find to get the specific project details
        const project = await Project.findById(new mongoose.Types.ObjectId(projectId))
        // Validate the existing number of images
        if (!project) {
            return res.status(404).json({
                msg: "project Not Found !"
            })
        }
        const existingImageCount: number = project.images.length;
        const newImageCount: number | any = req.files?.length || 0;

        if (newImageCount > 3) { return res.status(400).json({ msg: "You cant upload more than 3 images" }) }
        // Check if the new images exceed the limit of 3    

        // Array to store uploaded image URLs
        const uploadedImages = [];

        if (req.files) {
            let index: number = 0;
            for (const file of req.files as Express.Multer.File[]) {
                if (index == 3) {
                    break;
                }
                // Validate file type
                const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
                if (!allowedMimeTypes.includes(file.mimetype)) {
                    return res.status(400).json({ message: 'Only image files (JPEG, PNG, WebP) are allowed!' });
                }

                // Generate a unique public ID for the image using project ID and current timestamp
                const publicId = `project_${projectId}_${Date.now()}`;

                const existingImageUrl = project.images.find(image => image.includes(publicId));
                if (existingImageUrl) {
                    // If image exists, do not upload again
                    uploadedImages.push(existingImageUrl);
                    continue; // Skip to the next file
                }

                // Upload the image to Cloudinary
                const uploadResult = await uploadProjectImage(file.buffer, publicId);

                // Remove old images if necessary (to maintain only 3 images)
                if (existingImageCount + uploadedImages.length > 3) {
                    const imageToRemove = project.images.shift(); // Remove the oldest image from the array
                    if (imageToRemove) {
                        const imagePublicId = imageToRemove.split('/').pop()?.split('.')[0];
                        if (imagePublicId) {
                            await removeProjectImage(imagePublicId); // Remove the image from Cloudinary
                        }

                        // Also remove the image from the project's images array
                        await Project.findByIdAndUpdate(
                            projectId,
                            { $pull: { images: imageToRemove } }, // Remove the old image URL from the images array
                            { new: true }
                        );
                    }
                }

                // Add the newly uploaded image URL to the array
                uploadedImages.push(uploadResult.secure_url);
            }

            // Update the project images using MongoDB's $push
            await Project.findByIdAndUpdate(
                projectId,
                { $push: { images: { $each: uploadedImages } } },
                { new: true }
            );

            return res.status(200).json({
                message: 'Project images updated successfully',
                images: project.images.concat(uploadedImages), // Return the updated images list
            });
        } else {
            return res.status(400).json({ message: 'No images provided' });
        }

    } catch (error) {
        console.error('Error updating project images:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};






export const userRemoveProjectImageController = async (req: Request, res: Response) => {

}
