"use server";

import { createClient } from "@/utils/supabase/server-client";
import { revalidatePath } from "next/cache";

export async function CreateComment(formData: FormData) {
  const content = formData.get("content")?.toString() || "";
  const postId = Number(formData.get("postId"));

  if (!content || !postId) throw new Error("Missing content or postId");

  const supabase = await createClient();

  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr) throw userErr;
  if (!user) throw new Error("Not authenticated");

  const { data: inserted, error: insertErr } = await supabase
    .from("comments")
    .insert({
      post_id: postId,
      author_id: user.id,
      content,
    })
    .select("*");

  if (insertErr) throw insertErr;

  revalidatePath(`/posts/${postId}`);
  return inserted;
}
