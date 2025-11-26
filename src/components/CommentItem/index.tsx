'use client';

import { useState } from 'react';
import DeleteCommentButton from "@/app/(main)/[slug]/DeleteCommentButton";
import ReplyForm from '@/components/ReplayForm'
import { CommentType } from '@/utils/supabase/queries';

interface CommentItemProps {
  comment: CommentType;
  postAuthorId: string;
  currentUserId: string | null;
  isAuthenticated: boolean;
  postId: number;
  onSuccess: () => void;
  level?: number;
}

const CommentItem = ({
  comment,
  postAuthorId,
  currentUserId,
  isAuthenticated,
  postId,
  onSuccess,
  level = 0
}: CommentItemProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const isCommentAuthor = currentUserId === comment.user_id;
  const isPostAuthor = currentUserId === postAuthorId;
  const canDelete = isCommentAuthor || isPostAuthor;

  const handleReplySuccess = () => {
    setShowReplyForm(false);
    onSuccess();
  };

  return (
    <div className={`${level > 0 ? 'ml-4 sm:ml-8 border-l-2 border-gray-200 pl-4' : ''}`}>
      <div className="p-4 sm:p-6 rounded-lg border border-gray-300 bg-white">
        {/* Comment Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-gray-900">
              {comment.users?.username || 'Anonymous'}
            </span>
            {isPostAuthor && currentUserId === comment.user_id && (
              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                Author
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-gray-600">
              {new Date(comment.created_at).toLocaleDateString()}
            </span>
            {canDelete && (
              <DeleteCommentButton
                commentId={comment.id}
                onSuccess={onSuccess}
              />
            )}
          </div>
        </div>

        {/* Comment Content */}
        <p className="text-gray-800 whitespace-pre-wrap mb-3">
          {comment.content}
        </p>

        {/* Reply Button */}
        {isAuthenticated &&  !showReplyForm && (
          <button
            onClick={() => setShowReplyForm(true)}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Reply
          </button>
        )}

        {/* Reply Form */}
        {showReplyForm && currentUserId && (
          <ReplyForm
            postId={postId}
            parentId={comment.id}
            currentUserId={currentUserId}
            onSuccess={handleReplySuccess}
            onCancel={() => setShowReplyForm(false)}
          />
        )}
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply: any) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              postAuthorId={postAuthorId}
              currentUserId={currentUserId}
              isAuthenticated={isAuthenticated}
              postId={postId}
              onSuccess={onSuccess}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;