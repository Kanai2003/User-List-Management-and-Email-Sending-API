import { User } from "../models/user.model.js";
import { List } from "../models/list.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const unsubscribe = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        throw new ApiError(400, "Invalid user id");
    }

    await User.findByIdAndUpdate(userId, { unsubscribed: true });
    return res
        .status(200)
        .json(new ApiResponse({ message: "User unsubscribed successfully" }));
});

export const sendEmail = asyncHandler(async (req, res) => {});
