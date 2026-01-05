const postReply = async () => {
  const res = await fetch(
    `https://comment-data.onrender.com/comments/${replyingTo.parentId}`
  );

  const parent = await res.json();

  const newReply = {
    id: Date.now(),
    content: text,
    replyingTo: replyingTo.username,
    user: currentUser,
    createdAt: "now",
    score: 0
  };

  await fetch(
    `https://comment-data.onrender.com/comments/${replyingTo.parentId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        replies: [...parent.replies, newReply]
      })
    }
  );

  setReplyingTo(null);
};
