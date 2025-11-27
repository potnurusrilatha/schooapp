'use client';

import { useQuery } from "@tanstack/react-query";
import { getCommentsByPostId } from "@/utils/supabase/queries";
import CommentForm from '@/components/CommentForm/index'
import CommentItem from '@/components/CommentItem/index'

interface CommentsProps {
  postId: number;
  postAuthorId: string;
  currentUserId: string | null;
  isAuthenticated: boolean;
}

const Comments = ({
  postId,
  postAuthorId,
  currentUserId,
  isAuthenticated
}: CommentsProps) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const result = await getCommentsByPostId(postId);
      if (result.error) throw result.error;
      return result.data;
    }
  });

  const handleCommentSuccess = () => refetch();

  // Count total comments including replies
  const countComments = (comments: any[]): number => {
    if (!comments) return 0;
    return comments.reduce((total, comment) => {
      return total + 1 + countComments(comment.replies || []);
    }, 0);
  };

  const totalComments = countComments(data || []);

  if (error) {
    return (
      <div className="text-red-600 text-center py-4">
        Error loading comments. Please try again later.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mt-6 max-w-3xl mx-auto px-4 sm:px-6">
      <div className="py-6 sm:py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center sm:text-left">
          Comments ({totalComments})
        </h2>

        {/* Comment Form - Only for authenticated users */}
        {isAuthenticated ? (
          <div className="mb-6">
            <CommentForm postId={postId} onSuccess={handleCommentSuccess} />
          </div>
        ) : (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-400 text-center">
            <p className="text-gray-600">
              Please log in to post a comment
            </p>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8 text-gray-800">
              Loading comments...
            </div>
          ) : data && data.length > 0 ? (
            data.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                postAuthorId={postAuthorId}
                currentUserId={currentUserId}
                isAuthenticated={isAuthenticated}
                postId={postId}
                onSuccess={handleCommentSuccess}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-600">
              No comments yet. Be the first to comment!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;