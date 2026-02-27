import { z } from "zod";

export const createCourseSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title cannot exceed 100 characters")
        .trim(),

    description: z
        .string()
        .min(10, "Description must be at least 10 characters")
        .max(1000, "Description cannot exceed 1000 characters")
        .trim(),

    capacity: z.number().int().min(1, "Capacity must be at least 1"),
});

export const courseIdSchema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid course ID"),
});

export const updateCourseSchema = z.object({
    title: z.string().min(3).max(100).trim().optional(),
    description: z.string().min(10).max(1000).trim().optional(),
});
