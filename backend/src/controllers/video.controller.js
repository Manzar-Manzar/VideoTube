import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    const { file } = req;

    if (!title || !description || !file) {
        throw new ApiError(400, 'Title, description, and video file are required');
    }

    let videoUrl;
    try {
        const uploadResponse = await uploadOnCloudinary(file.path, 'videos'); // 'videos' is the Cloudinary folder
        videoUrl = uploadResponse.secure_url; // or the field that contains the URL
    } catch (error) {
        throw new ApiError(500, 'Error uploading video to Cloudinary');
    }

    const newVideo = new Video({
        title,
        description,
        url: videoUrl,
        createdAt: Date.now(),
    });

    await newVideo.save();

    res.status(201).json(new ApiResponse(201, 'Video published successfully', newVideo));
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}