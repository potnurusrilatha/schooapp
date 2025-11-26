'use client'
import DeletePost from '../../../../../actions/delete-post'
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const DeleteButton = ({postId}:{postId: number}) => {
    const {mutate, error} = useMutation({
        mutationFn: DeletePost,
        onMutate: () => toast("Deleting your post"),
        onSettled: () => toast.success("post deleted")
    })
    return <button onClick={ () => mutate(postId)} className="button-teritary px-4 py-2 
        lg:px-8
        w-full 
        sm:w-auto 
        text-center">Delete</button>
                     
}

export default DeleteButton