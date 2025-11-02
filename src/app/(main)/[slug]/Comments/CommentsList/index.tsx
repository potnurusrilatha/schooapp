type Comment = {
  id: number;
  content: string;
  created_at: string;
  author_id: string;
  users?: { username: string };
};

interface CommentListProps {
  comments?: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  if (!comments || comments.length === 0) {
    return <p className="text-gray-500 mt-2">No comments yet.</p>;
  }

  return (
    <ul className="mt-4 space-y-4">
      {comments.map((comment) => (
        <li
          key={comment.id}
          className="border p-3 rounded-md bg-gray-50 shadow-sm"
        >
          <p className="font-semibold text-gray-700">
            {comment.users?.username || "Anonymous"}
          </p>
          <p className="text-gray-800">{comment.content}</p>
          <span className="text-xs text-gray-400">
            {new Date(comment.created_at).toLocaleString()}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
