"use server";
 
import { createClient } from "@/utils/supabase/server-client";
import { revalidatePath } from "next/cache";
 
const DeleteComment = async (commentId: number) => {
  try {
    const supabase = await createClient();
 
    const {
      data: { user }
    } = await supabase.auth.getUser();
 
    if (!user) {
      console.error("Delete comment error: Not Authorized");
      return { error: "Not Authorized" };
    }
 
    // Get the comment to check ownership
    const { data: comment } = await supabase
      .from("comments")
      .select("user_id, post_id")
      .eq("id", commentId)
      .single();
 
    if (!comment) {
      console.error("Delete comment error: Comment not found");
      return { error: "Comment not found" };
    }
 
    // Get the post to check if user is the post author
    let isPostAuthor = false;
    if (comment.post_id) {
      const { data: post } = await supabase
        .from("posts")
        .select("user_id")
        .eq("id", Number(comment.post_id))
        .single();
      isPostAuthor = post ? user.id === post.user_id : false;
    }
 
    // Check if user is the comment author or the post author
    const isCommentAuthor = user.id === comment.user_id;
 
    if (!isCommentAuthor && !isPostAuthor) {
      console.error(
        "Delete comment error: Not authorized to delete this comment"
      );
      return { error: "Not authorized to delete this comment" };
    }
 
    await supabase.from("comments").delete().eq("id", commentId).throwOnError();
 
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting comment:", error);
    return {
      error: error instanceof Error ? error.message : "An error occurred"
    };
  }
};
 
export default DeleteComment;