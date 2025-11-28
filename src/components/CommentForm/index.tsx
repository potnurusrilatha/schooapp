'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createComment } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/browser-client';

interface CommentFormProps {
  postId: number;
  onSuccess: () => void;
  parentId?: number | null;
}

const CommentForm = ({ postId, onSuccess, parentId = null }: CommentFormProps) => {
  const [content, setContent] = useState('');
  const supabase = createClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      
      return await createComment(postId, content, user.id, parentId);
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
        rows={4}
        disabled={mutation.isPending}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!content.trim() || mutation.isPending}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {mutation.isPending ? 'Posting...' : 'Post Comment'}
        </button>
      </div>
      {mutation.isError && (
        <p className="text-red-600 text-sm">
          Failed to post comment. Please try again.
        </p>
      )}
    </form>
  );
};

export default CommentForm;