import CommentProvider from "../CommentsProvider";

import CommentsList from "../CommentsList";

type Comment = {
  id: number;
  content: string;
  created_at: string;
  author_id: string;
  users?: { username: string };
};

interface CommentsComposerProps {
  comments?: Comment[];
  user?: { id: string; username: string };
  postId: number;
}

const CommentsComposer = ({ comments, user, postId }: CommentsComposerProps) => {
  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>

      {user ? (
        <CommentProvider postId={postId} />
      ) : (
        <p className="text-gray-500 mb-4">
          You must{" "}
          <a href="/login" className="text-blue-600 underline">
            log in
          </a>{" "}
          to comment.
        </p>
      )}

      <CommentsList comments={comments} />
    </div>
  );
};

export default CommentsComposer;
