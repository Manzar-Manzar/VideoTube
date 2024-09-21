import { Comment } from "../models/comment.model.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Add Comment
const addComment = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { content, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, 'Invalid video Id');
    }

    if (!content || !userId) {
        throw new ApiError(400, 'Content and user Id are required');
    }

    const newComment = new Comment({
        content,
        user: userId,
        video: videoId,
        createdAt: Date.now(),
    });

    await newComment.save();

    res.status(201).json(new ApiResponse(201, 'Comment added successfully', newComment));
});

// Get Video Comments with Pagination
const getVideoComments = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, 'Invalid video ID');
    }

    const skip = (page - 1) * limit;
    const totalComments = await Comment.countDocuments({ video: videoId });

    const comments = await Comment.find({ video: videoId })
        .sort({ createdAt: -1 }) // Fixed the sorting key
        .skip(skip)
        .limit(parseInt(limit));

    res.status(200).json(new ApiResponse(200, 'Comments fetched successfully', {
        totalComments,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalComments / limit),
        comments
    }));
});

// Update Comment
const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        throw new ApiError(400, 'Invalid comment Id');
    }

    if (!content) {
        throw new ApiError(400, 'Content is required to update the comment');
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(404, 'Comment not found');
    }

    comment.content = content;
    await comment.save();

    res.status(200).json(new ApiResponse(200, 'Comment updated successfully', comment));
});

// Delete Comment
const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        throw new ApiError(400, 'Invalid comment Id');
    }

    const comment = await Comment.findByIdAndDelete(commentId);

    if (!comment) {
        throw new ApiError(404, 'Comment not found');
    }

    res.status(200).json(new ApiResponse(200, 'Comment deleted successfully'));
});

export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
};
