import { Request, Response } from "express";
import { Competition, Profile } from "../../model/schema";
import mongoose from "mongoose";
import { createTestAccount } from "nodemailer";
import { removeCompetitionCertificate, uploadCompetitionCertificate } from "../../services/cloudinary";

export const userAddCompetitionController = async (req: Request, res: Response) => {
    try {
        const profileId = req.profileId;

        // Extract competition details from the request body
        const { name, date, organization, achievement, projectSummary, repoLink } = req.body;

        // Validate if the profile exists
        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'User Profile not found' });
        }

        // Validate necessary fields
        if (!name || !date || !organization) {
            return res.status(400).json({ message: 'Name, Date, and Organization are required!' });
        }

        // Create a new competition object
        const newCompetitionData = {
            name,
            date,
            organization,
            achievement: achievement || '', // Optional field, default to empty if not provided
            projectSummary: projectSummary || '', // Optional field
            repoLink: repoLink || '', // Optional field
            certificate: '#', // Default certificate if none provided
        };

        //first add the newCompetition to Competition schema 
        // then 
        // Add the new competition to the profile's competitions array

        let newCompetition = await Competition.create(newCompetitionData);
        if (!newCompetition) {
            return res.status(200).json({
                msg: "failed to add new Data in Competition Schema !"
            })
        }
        await Profile.findByIdAndUpdate(profileId, {
            $push: { competitions: newCompetition }
        });

        return res.status(200).json({
            message: 'Competition added successfully',
            competition: newCompetition
        });
    } catch (error) {
        console.error('Error adding competition:', error);
        res.status(500).json({
            message: 'Something went wrong!'
        });
    }
};


export const userUpdateCompetitionController = async (req: Request, res: Response) => {
    try {
        let profileId = req.profileId;
        let competitionId = req.params.competitionId;

        if (!mongoose.Types.ObjectId.isValid(competitionId)) {
            return res.status(400).json({
                msg: "Competition Id is not valid !"
            })
        }

        let profile = await Profile.findById(profileId)
        if (!profile) {
            return res.status(400).json({
                msg: " PRofile Not Found !"
            })
        }

        // Check if the competition is associated with the profile
        let isCompetitionAssociated = await profile.competitions.includes(new mongoose.Types.ObjectId(competitionId));
        if (!isCompetitionAssociated) {
            return res.status(400).json({
                msg: "UnAuthorized Request",
                desc: " Respective Cometition is not associated with the Respective Profile !"
            })
        }

        const { name, date, organization, achievement, projectSummary, repoLink } = req.body;

        let updatedCompetition = await Competition.findByIdAndUpdate(competitionId, {
            name, date, organization, achievement, projectSummary, repoLink
        }, { new: true }
        )

        if (!updatedCompetition) {
            return res.status(400).json({
                msg: "Competition Not Found "
            })
        }

        return res.status(200).json({
            msg: "Competition Updated Succesfully !",
            updatedCompetition
        })
    } catch (error) {
        // console.log("Error is : ", error);

        return res.status(500).json({
            msg: "Internal Server Error "
        })
    }

}

export const userCompetitionPreviewController = async (req: Request, res: Response) => {
    try {
        let profileId = req.profileId;
        let competitionId = req.params.competitionId;

        if (!mongoose.Types.ObjectId.isValid(competitionId)) {
            return res.status(400).json({
                msg: "CompetitoinID is not valid"
            })
        }

        let profile = await Profile.findById(profileId)
        if (!profile) {
            return res.status(400).json({
                msg: "Profile Not Found !"
            })
        }
        const competition = await Competition.findById(new mongoose.Types.ObjectId(competitionId));
        if (!competition) {
            return res.status(404).json({ message: 'Competition not found!' });
        }

        let isAssociated = profile.competitions.includes(new mongoose.Types.ObjectId(competitionId))
        if (!isAssociated) {
            return res.status(400).json({
                msg: "UnAuthorized Request !",
                desc: "Respective course is not associated with the Respective profile "
            })
        }

        if (!req.file) {
            if (competition.certificate) {
                const prevPublicId = competition.certificate.split('/').pop()?.split('.')[0]; // Extract public ID from the URL
                if (prevPublicId) {
                    await removeCompetitionCertificate(prevPublicId)
                }

                await Competition.findByIdAndUpdate(
                    new mongoose.Types.ObjectId(competitionId),
                    { $set: { certificate: "#" } },
                    { new: true }
                )

                return res.status(200).json({
                    msg: "Certificate Removed Succsesfully !"
                })
            }
            else {

                await Competition.findByIdAndUpdate(
                    new mongoose.Types.ObjectId(competitionId),
                    { $set: { certificate: "#" } },
                    { new: true }
                )

                return res.status(200).json({
                    msg: "Certificate Removed Succsesfully !"
                })
            }
        }
        else {
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (!allowedMimeTypes.includes(req.file.mimetype)) {
                return res.status(400).json({ message: 'Invalid file type! Only images (JPEG, PNG, WebP) are allowed.' });
            }

            // If the competition already has a certificate, delete the old one from cloud storage
            if (competition.certificate) {
                const prevPublicId = competition.certificate.split('/').pop()?.split('.')[0];
                if (prevPublicId) {
                    await removeCompetitionCertificate(prevPublicId); // Function to remove the certificate from cloud storage
                }
            }

            // Generate a unique public ID for the new certificate using competition ID and current timestamp
            const publicId = `competitionCertificate_${profile.name?.split(' ')[0]}_${competitionId}_${Date.now()}`;

            // Upload the new file to cloud storage (assuming you're using Cloudinary or a similar service)
            const uploadResult = await uploadCompetitionCertificate(req.file.buffer, publicId);

            // Update the competition with the new certificate URL
            const updatedCompetition = await Competition.findByIdAndUpdate(
                new mongoose.Types.ObjectId(competitionId),
                { $set: { certificate: uploadResult.secure_url } },
                { new: true }
            );

            return res.status(200).json({
                message: 'Competition certificate updated successfully',
                competition: updatedCompetition
            });
        }

    } catch (error) {
        // console.log("error is : ", error);

        return res.status(500).json({
            msg: "Something Went Wrong !"
        })
    }
}