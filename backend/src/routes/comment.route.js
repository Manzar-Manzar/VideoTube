import { Router } from "express";
import {
    addComment,
    deleteComment,
    getVideoComments,
    updateComment
} from "../controllers/comment.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
// Apply JWT verification globally to all routes
router.use(verifyJWT);

// Get comments for a video and add a comment
router.route("/:videoId").get(getVideoComments).post(addComment);

// Update or delete a specific comment
router.route("/c/:commentId").delete(deleteComment).patch(updateComment);

export default router;
