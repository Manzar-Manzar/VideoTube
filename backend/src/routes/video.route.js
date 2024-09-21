import { Router } from "express";
import {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
} from "../controllers/video.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);


// Publish a new video
router.route("/publish").post(publishAVideo);

// Get a specific video by its ID
router.route("/:videoId").get(getVideoById);

// Update a specific video by its ID
router.route("/:videoId").patch(updateVideo);

// Delete a specific video by its ID
router.route("/:videoId").delete(deleteVideo);

// Toggle the publish status of a specific video
router.route("/:videoId/publish").patch(togglePublishStatus);

export default router;
