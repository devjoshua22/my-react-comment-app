import { useMutation, useQueryClient } from "@tanstack/react-query";

const useEditComment = () => {
  const queryClient = useQueryClient();

  const editItem = async ({ id, parentId, content }) => {
  // COMMENT
  if (!parentId) {
    await fetch(`https://comment-data.onrender.com/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    return;
  }

  // REPLY
  const res = await fetch(`https://comment-data.onrender.com/comments/${parentId}`);
  const parent = await res.json();

  const updatedReplies = parent.replies.map(r =>
    r.id === id ? { ...r, content } : r
  );

  await fetch(`https://comment-data.onrender.com/comments/${parentId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ replies: updatedReplies }),
  });
};



  return useMutation({
    mutationFn: editItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });
};

export default useEditComment;
