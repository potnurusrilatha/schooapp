import { z } from 'zod' 

export const logInSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "your password must be in a minimum of 6 characters")
})

export const signUpSchema = z.object({
    email: z.email("wrong email format"),
    username: z.string().min(5, "Username must be 5"),
    password: z.string().min(5, "Password must be 5"),
    
})

export const postSchema = z.object ({
    title: z.string().min(3,"Titles must have at least 3 characters"),
    content: z.string().optional(),
    image:z.instanceof(FormData).optional()
})

export const commentSchema = z.object({
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(1000, "Comment is too long"),
  postId: z.number()
});

