import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email address'),
})

export const updateUserSchema = z.object({
  id: z.uuid('Invalid user ID'),
  name: z.string().min(1, 'Name is required').optional(),
  email: z.email('Invalid email address').optional(),
})

const userSchema = z.object({
  id: z.uuid('Invalid user ID'),
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email address'),
})

export const findUserByEmailSchema = z.object({
  email: z.email().optional(),
})

export const userIdParamSchema = z.object({
  id: z.uuid('Invalid user ID'),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type User = z.infer<typeof userSchema>
export type FindUserByEmailInput = z.infer<typeof findUserByEmailSchema>
export type UserIdParam = z.infer<typeof userIdParamSchema>