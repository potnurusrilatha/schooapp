  import { createClient } from "./browser-client";
  import {type  QueryData } from "@supabase/supabase-js";
  
  
  export const getHomePosts = async(supabase: ReturnType<typeof createClient>) => {
  
    return await supabase.from('posts')
                    .select('id, title, slug,image, users("username")')
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

  export const getCommentsByPostId = async (postId: number) => {
  const supabase = createClient();
  return await supabase
    .from("comments")
    .select("id, email, created_at, user_id, users(username)")
    .eq("post_id", String(postId))
    .order("created_at", { ascending: false });
};
export type CommentType = QueryData<ReturnType<typeof getCommentsByPostId>>[0];
 