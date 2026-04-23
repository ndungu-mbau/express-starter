import { z } from "zod";

export const createTodoSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be at most 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description must be at most 200 characters")
    .optional(),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
