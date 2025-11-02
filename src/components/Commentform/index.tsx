"use client";

import { CreateComment } from "../../../actions/create-comment";



interface CommentFormProps {
  postId: number;
}

export default function CommentForm({ postId }: CommentFormProps) {
  return (
    <form action={CreateComment} className="flex flex-col space-y-3">
      <input type="hidden" name="postId" value={postId} />
      <textarea
        name="content"
        placeholder="Write your comment..."
        required
        className="border rounded p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 w-32"
      >
        Submit Comment
      </button>
    </form>
  );
}
