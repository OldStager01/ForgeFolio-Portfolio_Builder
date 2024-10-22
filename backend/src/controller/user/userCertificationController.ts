import { Request, Response } from "express";
import { Certification, Profile } from "../../model/schema";
import { removeCertificationPreview, uploadCertificatePreview } from "../../services/cloudinary";
import mongoose from "mongoose";

export const userAddCertificationController = async (req: Request, res: Response) => {
    try {
        const profileId = req.profileId;

        // Extract the certification details from the request body
        const { logo, name, organization, rank, year, preview } = req.body;

        // Validate if profileId exists
        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'User Profile not found' });
        }

        // Validate necessary fields
        if (!name || !organization || !year) {
            return res.status(400).json({ message: 'Name, Organization, and Year are required!' });
        }

        // Create a new certification
        const newCertification = await Certification.create({
            logo: logo || '#', // Default logo if none provided
            name,
            organization,
            rank: rank || '', // Optional field, default to empty if not provided
            year,
            preview: preview || '#' // Default preview if none provided
        });

        // Add the new certification's ID to the profile's certifications array
        await Profile.findByIdAndUpdate(profileId, {
            $push: { certifications: newCertification._id }
        });

        return res.status(200).json({
            message: 'Certification added successfully',
            certification: newCertification
        });
    } catch (error) {
        console.error('Error adding certification:', error);
        res.status(500).json({
            message: 'Something went wrong!'
        });
    }
};



export const userUpdateCertificationController = async (req: Request, res: Response) => {
    try {
        const profileId = req.profileId;
        const certificationId = req.params.certificationId;

        // Validate if certificationId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(certificationId)) {
            return res.status(400).json({ message: 'Invalid Certification ID' });
        }

        // Validate if the profile exists
        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'User Profile not found' });
        }

        // Check if the certification is associated with the profile
        const isCertificationAssociated = profile.certifications.includes(new mongoose.Types.ObjectId(certificationId));
        if (!isCertificationAssociated) {
            return res.status(403).json({ message: 'This certification is not associated with your profile' });
        }

        // Extract the updated certification details from the request body
        const { logo, name, organization, rank, year, preview, } = req.body;

        // Validate necessary fields
        if (!name || !organization) {
            return res.status(400).json({ message: 'Name, Organization,  are required!' });
        }

        // Update the certification details
        const updatedCertification = await Certification.findByIdAndUpdate(
            certificationId,
            {
                $set: {
                    logo: logo || '#', // Default logo if not provided
                    name,
                    organization,
                    rank: rank || '', // Optional field, default to empty string if not provided
                    year,
                    // preview: preview || '#' // Default preview if not provided
                }
            },
            { new: true, runValidators: true } // Return updated doc, apply validation
        );

        if (!updatedCertification) {
            return res.status(404).json({ message: 'Certification not found' });
        }

        return res.status(200).json({
            message: 'Certification updated successfully',
            certification: updatedCertification,
        });
    } catch (error) {
        console.error('Error updating certification:', error);
        res.status(500).json({ message: 'Something went wrong!' });
    }
};



export const userCertificationPreviewController = async (req: Request, res: Response) => {
    try {
        const profileId = req.profileId;
        const certificationId = req.params.certificationId;

        // Validate if the certificationId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(certificationId)) {
            return res.status(400).json({ message: 'Invalid Certification ID' });
        }

        // Find the profile by profileId
        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'User Profile not found' });
        }

        // Check if the certification is associated with the profile
        const certificationObjectId = new mongoose.Types.ObjectId(certificationId);
        const isCertificationAssociated = profile.certifications.includes(certificationObjectId);
        if (!isCertificationAssociated) {
            return res.status(403).json({ message: 'This certification is not associated with your profile' });
        }

        // Find the certification to check for an existing preview
        const certification = await Certification.findById(certificationObjectId);
        if (!certification) {
            return res.status(404).json({ message: 'Certification not found!' });
        }
        console.log("certification is : ", certification);

        // If no file is provided, remove the existing preview if it exists
        if (!req.file) {
            if (certification.preview) {
                const prevPublicId = certification.preview.split('/').pop()?.split('.')[0]; // Extract public ID from the URL
                if (prevPublicId) {
                    await removeCertificationPreview(prevPublicId); // Function to remove the preview from cloud storage
                }

                // Remove the preview from the database
                await Certification.findByIdAndUpdate(
                    certificationObjectId,
                    { $set: { preview: "#" } }, // Remove the 'preview' field
                    { new: true }
                );

                return res.status(200).json({ message: "Preview removed successfully!" });
            } else {
                return res.status(200).json({ message: "No preview to remove." });
            }
        } else {
            // Validate the uploaded file if a file is provided
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (!allowedMimeTypes.includes(req.file.mimetype)) {
                return res.status(400).json({ message: 'Invalid file type! Only images (JPEG, PNG, WebP) are allowed.' });
            }

            // If the certification already has a preview, delete the old one from cloud storage
            if (certification.preview) {
                const prevPublicId = certification.preview.split('/').pop()?.split('.')[0];
                if (prevPublicId) {
                    await removeCertificationPreview(prevPublicId); // Function to remove the preview from cloud storage
                }
            }

            // Generate a unique public ID for the new preview using certification ID and current timestamp
            const publicId = `certificationPreview_${profile.name?.split(' ')[0]}_${certificationId}_${Date.now()}`;

            // Upload the new file to cloud storage (assuming you're using Cloudinary or a similar service)
            const uploadResult = await uploadCertificatePreview(req.file.buffer, publicId);

            // Update the certification with the new preview URL
            const updatedCertification = await Certification.findByIdAndUpdate(
                certificationObjectId,
                { $set: { preview: uploadResult.secure_url } },
                { new: true }
            );

            return res.status(200).json({
                message: 'Certification preview updated successfully',
                certification: updatedCertification
            });
        }
    } catch (error) {
        console.error('Error updating certification preview:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}