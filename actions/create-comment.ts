"use server";

import { commentSchema } from "../actions/schemas";
import z from "zod";
import { createClient } from "@/utils/supabase/server-client";
import { revalidatePath } from "next/cache";

export const createComment = async (
  userdata: z.infer<typeof commentSchema>
) => {
  try {
    const parsedData = commentSchema.parse(userdata);

    const supabase = await createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: "Not Authorized" };
    }

    const userId = user.id;

    await supabase
      .from("comments")
      .insert([
        {
          user_id: userId,
          post_id: parsedData.postId,
          content: parsedData.content
        }
      ])
      .throwOnError();

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error creating comment:", error);
    return {
      error: error instanceof Error ? error.message : "An error occurred"
    };
  }
};