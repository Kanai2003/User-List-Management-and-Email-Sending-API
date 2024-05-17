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
    res.status(201).json(new ApiResponse({ message: "List created", list }));
});

export const addUsersFromCSV = asyncHandler(async (req, res) => {
    const { listId } = req.params;
    const list = await List.findById(listId);

    if (!list) {
        throw new ApiError(404, "List not found");
    }

    const csvData = await parseCSV(req.file.buffer.toString());
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
                    user.properties.set(prop.title, prop.defaultValue);
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
        new ApiResponse({
            message: "Users added",
            successCount,
            failureCount,
            errors,
            totalCount: list.users.length,
        }),
    );
});
