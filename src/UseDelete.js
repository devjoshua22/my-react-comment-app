import { useMutation, useQueryClient } from "@tanstack/react-query";

const useHandleDelete = () => {
  const queryClient = useQueryClient();

 const deleteItem = async ({ id, parentId }) => {
  // TOP-LEVEL COMMENT
  if (!parentId ) {
    const res = await fetch(`https://comment-data.onrender.com/comments/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete comment");
    return;
  }

  // REPLY
  const res = await fetch(`https://comment-data.onrender.com/comments/${parentId}`);
  const parent = await res.json();

  const updatedReplies = parent.replies.filter(r => r.id !== id);

  await fetch(`https://comment-data.onrender.com/comments/${parentId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ replies: updatedReplies }),
  });
};



  return useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });
};

export default useHandleDelete;
