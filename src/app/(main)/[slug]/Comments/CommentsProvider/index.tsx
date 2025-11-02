"use client";

import CommentForm from "@/components/Commentform";

interface CommentProviderProps {
  postId: number;
}

const CommentsProvider = ({ postId }: CommentProviderProps) => {
  return (
    <div className="mb-6">
      <CommentForm postId={postId} />
    </div>
  );
};

export default CommentsProvider;
