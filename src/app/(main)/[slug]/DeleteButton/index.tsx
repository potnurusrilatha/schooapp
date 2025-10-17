'use client'

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import DeletePost from "../../../../../actions/delete-post"



 
const DeleteButton = ({postId}:{postId:number}) => {
    const {mutate}= useMutation ({
        mutationFn: DeletePost,
        onMutate: () => toast("Deleting your post"),
        onSettled: () => toast.success("post deleted")
    })
    return <button onClick={() => mutate(postId)} className="button-tertiary">Delete Post</button>
}
export default DeleteButton