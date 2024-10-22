import { Request, Response } from 'express';
import { Education, Profile } from '../../model/schema'; // Assuming you have a Profile model
import mongoose from 'mongoose';

// Controller to add education details
export const userAddEducationController = async (req: Request, res: Response) => {
    try {
        const profileId = req.profileId;

        // Extract education details from the request body
        const { collegeName, degree, place, duration, percentage } = req.body;

        const newEducation = {
            collegeName, degree, place, duration, percentage
        };

        // Update the profile with the new education information
        const addEducation = await Education.create(newEducation);
        if (addEducation) {
            console.log("Addeducation is : ", addEducation);
            const updatedProfile = await Profile.findByIdAndUpdate(
                new mongoose.Types.ObjectId(profileId),
                { $push: { education: addEducation._id } },
                { new: true }
            );

            if (!updatedProfile) {
                return res.status(404).json({ message: 'Profile not found' });
            }
            return res.status(200).json({
                msg: 'Education added successfully',
                updatedEducation: addEducation
            });
        }
        else {
            res.status(500).json({ message: 'Unable to add Education' });
        }


    } catch (error) {
        console.error('Error adding education:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const userUpdateEducationController = async (req: Request, res: Response) => {
    try {
        const profileId = req.profileId;  // Get the profile ID from request (assuming it's set in middleware)
        const educationId = req.params.educationId;  // Get the education ID from request params

        // Extract education details from the request body
        const { collegeName, degree, place, duration, percentage } = req.body;

        // Validate the profile exists
        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Check if the educationId is associated with the profile
        const isEducationAssociated = profile.education.includes(new mongoose.Types.ObjectId(educationId));
        if (!isEducationAssociated) {
            return res.status(403).json({ message: 'This education entry is not associated with your profile' });
        }

        // Prepare the updated education object
        const updatedData = {
            collegeName,
            degree,
            place,
            duration,
            percentage
        };

        // Update the education document with new data

        const updatedEducation = await Education.findByIdAndUpdate(
            educationId,
            { $set: updatedData },
            { new: true }
        );

        if (!updatedEducation) {
            return res.status(404).json({ message: 'Education not found' });
        }

        return res.status(200).json({
            message: 'Education updated successfully',
            education: updatedEducation
        });

    } catch (error) {
        console.error('Error updating education:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

