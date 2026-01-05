import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddComment = () => {
  const queryClient = useQueryClient();

  const addComment = async (newComment) => {
    const res = await fetch("https://comment-data.onrender.com/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    });

    if (!res.ok) throw new Error("Failed to add comment");
  };

  return useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });
};

export default useAddComment;
