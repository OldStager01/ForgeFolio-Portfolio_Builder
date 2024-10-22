import express from "express";

import { userGetProfileDetailsController, userUpdateAvatarController, userUpdateProfileController } from "../../controller/user/userProfileController";
import { M_userTokenMiddleware } from "../../middlewares/userMiddleware";
import { userAddProjectController, userProjectImageController, userUpdateProjectController } from "../../controller/user/userProjectController";
import { userAddEducationController, userUpdateEducationController } from "../../controller/user/userEducationController";
import { upload } from "../../config/cloudinary";
import { Project } from "../../model/schema";
import { userResumeController } from "../../controller/user/userResumeController";
import { userAddCourseController, userAddPreviewController, userUpdateCourseController } from "../../controller/user/userCourseController";
import { userAddCertificationController, userCertificationPreviewController, userUpdateCertificationController } from "../../controller/user/userCertificationController";
import { userAddCompetitionController, userCompetitionPreviewController, userUpdateCompetitionController } from "../../controller/user/userCompetitionController";
import { userAddExtraCurricularController, userUpdateExtracurricular } from "../../controller/user/userExtracurricularController";


export const router = express.Router();

router.get('/details/:profileId', userGetProfileDetailsController)
router.put('/updateProfile', M_userTokenMiddleware, userUpdateProfileController)
router.put('/updateAvatar', M_userTokenMiddleware, upload.single('file'), userUpdateAvatarController)


// --------------------------------------------------------------------------------------------------------
// Project
router.post('/addProject', M_userTokenMiddleware, userAddProjectController)
router.put('/updateProject/:projectId', M_userTokenMiddleware, userUpdateProjectController)
router.put('/projectImages/:projectId', M_userTokenMiddleware, upload.array('files', 3), userProjectImageController)

// --------------------------------------------------------------------------------------------------------
// education
router.post('/addEducation', M_userTokenMiddleware, userAddEducationController)
router.put('/updateEducation/:educationId', M_userTokenMiddleware, userUpdateEducationController)

// --------------------------------------------------------------------------------------------------------
// Course
router.post('/addCourse', M_userTokenMiddleware, userAddCourseController)
router.post('/updateCourse/:courseId', M_userTokenMiddleware, userUpdateCourseController)
router.put('/addCoursePreview/:courseId', M_userTokenMiddleware, upload.single('file'), userAddPreviewController)

// --------------------------------------------------------------------------------------------------------
// Certification
router.post('/addCertification', M_userTokenMiddleware, userAddCertificationController)
router.put('/updateCertification/:certificationId', M_userTokenMiddleware, userUpdateCertificationController)
router.put('/addCertificationPreview/:certificationId', M_userTokenMiddleware, upload.single('file'), userCertificationPreviewController)
// router.put('/addCoursePreview/:courseId', M_userTokenMiddleware, upload.single('file'), userAddPreviewController)


// --------------------------------------------------------------------------------------------------------
// Competition
router.post('/addCompetition', M_userTokenMiddleware, userAddCompetitionController)
router.put('/updateCompetition/:competitionId', M_userTokenMiddleware, userUpdateCompetitionController)
router.put('/addCompetitionPreview/:competitionId', M_userTokenMiddleware, upload.single('file'), userCompetitionPreviewController)

// --------------------------------------------------------------------------------------------------------
// Extracurricular
router.post('/addExtracurricular', M_userTokenMiddleware, userAddExtraCurricularController)
router.put('/updateExtracurricular/:extracurricularId', M_userTokenMiddleware, userUpdateExtracurricular)
// router.put('/addCompetitionPreview/:competitionId', M_userTokenMiddleware, upload.single('file'), userCompetitionPreviewController)

// --------------------------------------------------------------------------------------------------------
// resume 
router.post('/resume', M_userTokenMiddleware, upload.single('file'), userResumeController)