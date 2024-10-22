import { Request, Response } from "express";
import { Profile } from "../../model/schema";
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';
import { removeAvatar, uploadAvatar } from "../../services/cloudinary";



interface Skill {
    category?: string;
    skills: string[];
}

// Define an interface for updatable profile fields
interface UpdateableProfileFields {
    avatar?: string;
    name?: string;
    about?: string;
    descriptors?: string;
    email?: string;
    github?: string;
    linkedin?: string;
    skills?: Skill[]; // Array of Skill objects
}

export const userGetProfileDetailsController = async (req: Request, res: Response) => {
    try {
        const profileId = req.params.profileId;

        // Validate if profileId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(profileId)) {
            return res.status(400).json({ msg: 'Invalid Profile ID' });
        }

        // Fetch the user's profile and populate the necessary fields
        const userProfile = await Profile.findById(profileId)
            .populate('projects')        // Populate the projects array
            .populate('education')       // Populate the education array
            .populate('certifications')  // Populate the certifications array
            .populate('courses')         // Populate the courses array
            .populate('competitions')    // Populate the competitions array
            .populate('extracurricular') // Populate the extracurricular array
            .exec();

        // If the profile is not found
        if (!userProfile) {
            return res.status(404).json({ msg: 'USer not found!' });
        }

        // Return the populated user profile details
        return res.status(200).json({
            userProfile
        });

    }
    catch (error) {
        console.log("error is  : ", error);

        return res.status(500).json({
            msg: "Something went wrong !"
        })
    }
}

export const userUpdateProfileController = async (req: Request, res: Response) => {
    try {
        const profileId = req.profileId; // Assuming profileId is set in the request object

        // Fields that can be updated directly in the profile schema
        const allowedFields: (keyof UpdateableProfileFields)[] = ['avatar', 'name', 'about', 'descriptors', 'email', 'github', 'linkedin', 'skills'];

        // Create an object with only the allowed fields from the request body
        const updateFields = allowedFields.reduce<UpdateableProfileFields>((acc, field) => {
            if (field in req.body) {
                if (field === 'skills' && Array.isArray(req.body[field])) {
                    // Ensure skills is an array of Skill objects
                    acc[field] = req.body[field].filter((skill: unknown): skill is Skill => {
                        if (typeof skill === 'object' && skill !== null) {
                            const { category, skills } = skill as Skill;
                            return typeof category === 'string' && Array.isArray(skills) && skills.every(s => typeof s === 'string');
                        }
                        return false;
                    });
                } else {
                    acc[field] = req.body[field];
                }
            }
            return acc;
        }, {});

        // Update the profile
        const updatedProfile = await Profile.findByIdAndUpdate(
            profileId,
            { $set: updateFields },
            { new: true, runValidators: true }
        );
        console.log("profile id is : ", updatedProfile?.name)

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({
            message: 'Profile updated successfully',
            profile: updatedProfile
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const userUpdateAvatarController = async (req: Request, res: Response) => {
    try {
        const profileId = req.profileId;

        // Find the profile by profileId
        const profile = await Profile.findOne({ _id: profileId });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found!" });
        }

        // Get the previous avatar URL (if exists)
        const prevAvatar = profile.avatar;

        // Case 1: No file is provided, remove the current avatar if it exists
        if (!req.file) {
            if (prevAvatar) {
                const prevPublicId = prevAvatar.split('/').pop()?.split('.')[0]; // Extract public ID from the URL
                if (prevPublicId) {
                    await removeAvatar(prevPublicId); // Remove previous avatar from cloud storage
                }

                // Update the profile by removing the avatar field
                await Profile.updateOne(
                    { _id: profileId },
                    { $set: { avatar: "#" } } // Remove avatar field from the profile
                );

                return res.status(200).json({ message: "Avatar removed successfully" });
            }
        }
        else {

            // Case 2: A file is provided, validate it and update the avatar
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedMimeTypes.includes(req.file.mimetype)) {
                return res.status(400).json({ message: "Only image files (JPEG, PNG, GIF, WebP) are allowed!" });
            }

            // Generate a unique public ID using the profile name and current timestamp
            const publicId = `avatar_${profile.name?.split(' ')[0]}_${Date.now()}`;

            // Upload the new avatar to cloud storage
            const uploadResult = await uploadAvatar(req.file.buffer, publicId);

            // Delete the previous avatar from cloud storage if it exists
            if (prevAvatar) {
                const prevPublicId = prevAvatar.split('/').pop()?.split('.')[0];
                if (prevPublicId) {
                    await removeAvatar(prevPublicId); // Remove previous avatar from cloud storage
                }
            }

            // Update the profile with the new avatar URL
            await Profile.updateOne(
                { _id: profileId },
                { $set: { avatar: uploadResult.secure_url } }
            );

            return res.status(200).json({
                message: "Avatar updated successfully",
                avatar: uploadResult.secure_url
            });
        }
    } catch (error) {
        console.error("Error updating avatar:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


