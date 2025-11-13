import { createClient } from "@/utils/supabase/server-client";
import CommentHost from "./Comments/CommentsHost";

const SinglePost = async ({ params }) => {
  const { slug } = params;
  const supabase = await createClient();
  
  // Fetch post
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>{post.image}</p>

      {/* Comments Section */}
      <CommentHost postId={post.id} user={user} />
    </div>
  );
};

export default SinglePost;
