import { createClient } from "./browser-client";
import { type QueryData } from "@supabase/supabase-js";

export const getHomePosts = async(supabase: ReturnType<typeof createClient>) => {
  return await supabase.from('posts')
                  .select('id, title, slug, image, users("username"), comments(count)')
                  .order('created_at', {ascending: false});
}

export const getSinglePost = async (slug: string) => {
  const supabase = createClient();
  return await supabase.from('posts')
                      .select('id, title, content, slug, user_id, users("username"), image')
                       .eq('slug', slug)
                       .single();
}

export const getSearchPosts = async (searchTerm: string) => {
  const supabase = createClient();
  return await supabase.from('posts')
                        .select('title, slug')
                        .ilike('title',`%${searchTerm}%`)
}

export type HomePostType = QueryData<ReturnType<typeof getHomePosts>>;

// UPDATED: Fetch comments with nested structure
export const getCommentsByPostId = async (postId: number) => {
  const supabase = createClient();
  
  // Fetch all comments (both parent and replies)
  const { data, error } = await supabase
    .from("comments")
    .select("id, content, created_at, user_id, parent_id, users(username)")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) return { data: null, error };

  // Organize comments into nested structure
  const commentMap = new Map();
  const rootComments: any[] = [];

  // First pass: create a map of all comments
  data?.forEach((comment) => {
    commentMap.set(comment.id, { ...comment, replies: [] });
  });

  // Second pass: organize into tree structure
  data?.forEach((comment) => {
    if (comment.parent_id === null) {
      // Root comment
      rootComments.push(commentMap.get(comment.id));
    } else {
      // Reply to another comment
      const parent = commentMap.get(comment.parent_id);
      if (parent) {
        parent.replies.push(commentMap.get(comment.id));
      }
    }
  });

  return { data: rootComments, error: null };
};

export type CommentType = QueryData<ReturnType<typeof getCommentsByPostId>>[0];

// Create a new comment or reply
export const createComment = async (
  postId: number, 
  content: string, 
  userId: string,
  parentId?: number | null
) => {
  const supabase = createClient();
  return await supabase
    .from("comments")
    .insert([
      {
        post_id: postId,
        content: content,
        user_id: userId,
        parent_id: parentId || null,
      },
    ])
    .select()
    .single();
};

// Delete comment by ID
export const deleteComment = async (commentId: number) => {
  const supabase = createClient();
  return await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);
};