import { useMutation, useQueryClient } from "@tanstack/react-query";

const UseAddReply = () => {
  const queryClient = useQueryClient();

  const addReply = async ({ parentId, reply }) => {
    // 1. Get parent comment
    const res = await fetch(`https://comment-data.onrender.com/comments/${parentId}`);
    if (!res.ok) throw new Error("Failed to fetch parent comment");

    const parent = await res.json();

    // 2. Add new reply
    const updatedReplies = [...parent.replies, reply];

    // 3. Patch parent comment
    const updateRes = await fetch(
      `https://comment-data.onrender.com/comments/${parentId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ replies: updatedReplies }),
      }
    );

    if (!updateRes.ok) throw new Error("Failed to add reply");
  };
  

  return useMutation({
    mutationFn: addReply,
    onSuccess: () => {
      // 🔥 refetch comments so UI updates
      queryClient.invalidateQueries(["comments"]);
    },
  });
};

export default UseAddReply;
