'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createComment } from '@/utils/supabase/queries';

interface ReplyFormProps {
  postId: number;
  parentId: number;
  onSuccess: () => void;
  onCancel: () => void;
  currentUserId: string;
}

const ReplyForm = ({ 
  postId, 
  parentId, 
  onSuccess, 
  onCancel,
  currentUserId 
}: ReplyFormProps) => {
  const [content, setContent] = useState('');

  const mutation = useMutation({
    mutationFn: async () => {
      return await createComment(postId, content, currentUserId, parentId);
    },
    onSuccess: () => {
      setContent('');
      onSuccess();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      mutation.mutate();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 ml-4 sm:ml-8">
      <div className="flex flex-col gap-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a reply..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
          rows={3}
          disabled={mutation.isPending}
        />
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium"
            disabled={mutation.isPending}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!content.trim() || mutation.isPending}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            {mutation.isPending ? 'Posting...' : 'Reply'}
          </button>
        </div>
      </div>
      {mutation.isError && (
        <p className="text-red-600 text-sm mt-2">
          Failed to post reply. Please try again.
        </p>
      )}
    </form>
  );
};

export default ReplyForm;