import { Request, Response } from "express"
import { Extracurricular, Profile } from "../../model/schema"
import mongoose from "mongoose";

export const userAddExtraCurricularController = async (req: Request, res: Response) => {
    try {
        let profileId = req.profileId

        const { title, role, year, description } = req.body;
        let findProfile = await Profile.findById(profileId);
        if (!findProfile) {
            return res.status(404).json({
                msg: "Profile Not Found !"
            })
        }
        let newExtracurricular = await Extracurricular.create({
            title: title || "#",
            role: role || "#",
            year: year || "#",
            description: description || "#"
        })

        if (!newExtracurricular) {
            return res.status(400).json({
                msg: "Unable to add Extracurricular !"
            })
        }
        else {

            const updateProfile = await Profile.findByIdAndUpdate(
                profileId,
                {
                    $push: { extracurricular: newExtracurricular._id }
                },
                { new: true }
            )

            if (updateProfile) {
                return res.status(200).json({
                    msg: "Extracurricular Add Succesfully !"
                })
            }
            else {
                res.status(500).json({
                    msg: "extracurricular add Failed"
                })
            }
        }
    }
    catch (error) {
        console.log("error is : ", error)
        return res.status(500).json({
            msg: "Internal Server Error !"
        })
    }


}

export const userUpdateExtracurricular = async (req: Request, res: Response) => {
    try {
        const profileId = req.profileId;  // Get the profile ID from the request (assuming it's set in middleware)
        const extracurricularId = req.params.extracurricularId;  // Get the extracurricular ID from request params

        // Extract extracurricular details from the request body
        const { title, role, year, description } = req.body;

        // Validate if the profile exists
        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Check if the extracurricular ID is associated with the profile
        const isExtracurricularAssociated = profile.extracurricular.includes(new mongoose.Types.ObjectId(extracurricularId));
        if (!isExtracurricularAssociated) {
            return res.status(403).json({ message: 'This extracurricular activity is not associated with your profile' });
        }

        // Prepare the updated extracurricular data
        const updatedData = {
            title,
            role,
            year,
            description
        };

        // Update the extracurricular document with new data
        const updatedExtracurricular = await Extracurricular.findByIdAndUpdate(
            extracurricularId,
            { $set: updatedData },
            { new: true, runValidators: true }  // Return the updated document and validate the new data
        );

        if (!updatedExtracurricular) {
            return res.status(404).json({ message: 'Extracurricular activity not found' });
        }

        return res.status(200).json({
            message: 'Extracurricular activity updated successfully',
            extracurricular: updatedExtracurricular
        });

    } catch (error) {
        console.error('Error updating extracurricular activity:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
