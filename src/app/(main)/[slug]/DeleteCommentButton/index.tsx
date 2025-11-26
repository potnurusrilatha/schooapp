"use client";
 
import { useMutation } from "@tanstack/react-query";
import DeleteComment from '../../../../../actions/delete-comment';
import { toast } from "sonner";
 
const DeleteCommentButton = ({
  commentId,
  onSuccess
}: {
  commentId: number;
  onSuccess?: () => void;
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: DeleteComment,
    onMutate: () => toast("Deleting comment..."),
    onSuccess: (result) => {
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Comment deleted!");
        onSuccess?.();
      }
    },
    onError: (error) => {
      toast.error("Failed to delete comment");
      console.error("Delete error:", error);
    }
  });
 
  return (
    <button
      onClick={() => mutate(commentId)}
      className="text-red-600 hover:text-red-800 text-sm font-medium"
      disabled={isPending}
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
};
 
export default DeleteCommentButton;