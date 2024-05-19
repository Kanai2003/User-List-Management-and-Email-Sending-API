import { User } from "../models/user.model.js";
import { List } from "../models/list.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendEmail } from "../utils/emailService.js";

export const unsubscribe = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        throw new ApiError(400, "Invalid user id");
    }

    await User.findByIdAndUpdate(userId, { unsubscribed: true });
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "User unsubscribed successfully"));
});

export const sendEmailToList = asyncHandler(async (req, res) => {
    const { listId } = req.params;
    const { subject, body } = req.body;

    const list = await List.findById(listId).populate("users");
    if (!list) {
        throw new ApiError(404, "List not found!");
    }

    const emailPromises = list.users.map(async (user) => {
        if (user.unsubscribed) return;

        let emailBody = body;
        // for (const [key, value] of Object.entries(user.properties)) {
        //     const placeholder = `[${key}]`;
        //     emailBody = emailBody.replace(new RegExp(placeholder, 'g'), value || '');
        // }
        emailBody = emailBody
            .replace("[name]", user.name.toString())
            .replace("[email]", user.email.toString())
            .replace("[age]", user.age?.toString());

        await sendEmail(user, subject, emailBody);
    });

    await Promise.all(emailPromises);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Email sent successfully!"));
});

export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    return res.status(200).json(new ApiResponse({ users }));
});
