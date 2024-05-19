import { User } from "../models/user.model.js";
import { List } from "../models/list.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { parseCSV } from "../utils/csvHandler.js";

export const createList = asyncHandler(async (req, res) => {
    const { title, customProperties } = req.body;
    const list = new List({ title, customProperties });
    if (!list) {
        throw new ApiError(400, "Invalid list data");
    }
    await list.save();
    res.status(201).json(
        new ApiResponse(200, { list }, "List created successfully"),
    );
});

export const addUsersFromCSV = asyncHandler(async (req, res) => {
    const { listId } = req.params;
    const list = await List.findById(listId);

    if (!list) {
        throw new ApiError(404, "List not found");
    }

    const csvData = await parseCSV(req.file.path);
    let successCount = 0;
    let failureCount = 0;
    const errors = [];

    for (const row of csvData) {
        try {
            const user = new User({
                name: row.name,
                email: row.email,
                properties: new Map(Object.entries(row)),
            });

            list.customProperties.forEach((prop) => {
                if (!user.properties.has(prop.title)) {
                    user.properties.set(prop.title, prop.fallbackValue);
                }
            });

            await user.save();
            list.users.push(user._id);
            successCount++;
        } catch (error) {
            errors.push({ row, error: error.message });
            failureCount++;
        }
    }

    await list.save();
    return res.status(201).json(
        new ApiResponse(
            200,
            {
                message: "Users added successfully!",
                successCount,
                failureCount,
                errors,
                totalCount: list.users.length,
            },
            "Users added successfully!",
        ),
    );
});

export const getAllLists = asyncHandler(async (req, res) => {
    const users = await List.find();
    res.status(200).json(
        new ApiResponse(200, users, "All lists fetched successfully"),
    );
});
