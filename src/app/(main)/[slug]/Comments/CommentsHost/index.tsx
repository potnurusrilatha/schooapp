import { createClient } from "@/utils/supabase/server-client";
import CommentsComposer from "../CommentsComposer";

interface CommentHostProps {
  postId: number;
  user?: { id: string; username: string };
}

const CommentHost = async ({ postId, user }: CommentHostProps) => {
  const supabase = await createClient();

  const { data: comments } = await supabase
    .from("comments")
    .select("id, content, created_at, author_id, users(username)")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  return <CommentsComposer comments={comments} user={user} postId={postId} />;
};

export default CommentHost;
