import { Request, Response } from "express"
import { Profile } from "../../model/schema";

import { removeResume, uploadResume } from "../../services/cloudinary";

export const userResumeController = async (req: Request, res: Response) => {
    try {
        const profileId = req.profileId;

        const profile = await Profile.findOne({ _id: profileId });
        if (!profile) {
            return res.status(404).json({ msg: "Profile not found!" });
        }

        if (!req.file) {
            return res.status(400).json({ msg: "No file found!" });
        }

        if (req.file.mimetype !== 'application/pdf') {
            return res.status(400).json({ msg: "Only PDF files are allowed!" });
        }

        const prevResume = profile.resume;

        // Generate a unique public ID for the resume
        const publicId = `resume_${profile.name?.split(' ')[0]}-${profile.name?.split(' ')[1]}_${Date.now()}`;

        // Wrap the Cloudinary upload in a promise


        // Upload the new resume
        const uploadResult = await uploadResume(req.file.buffer, publicId);

        // Update only the resume field in the database
        await Profile.updateOne(
            { _id: profileId },
            { $set: { resume: uploadResult.secure_url } }
        );

        // Delete the previous resume from Cloudinary if it exists
        if (prevResume) {
            const prevPublicId = prevResume.split('/').pop()?.split('.')[0];
            if (prevPublicId) {
                await removeResume(prevPublicId)
            }
        }

        return res.json({ message: "Resume updated successfully", resume: uploadResult.secure_url });

    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ message: 'Server error ' });
    }
};