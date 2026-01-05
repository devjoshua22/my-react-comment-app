import { useState } from "react";
import UseHandleData from "./UseHandleData";
import UseAddReply from "./UseAddReply";
import useAddComment from "./AddComment";


const CommentInput = ({ replyingTo, setReplyingTo }) => {

  const [text, setText] = useState("");

  const addReplyMutation = UseAddReply();
  const addCommentMutation = useAddComment();
  const {comments,commentLoading,commentError,user, userLoading,userError} = UseHandleData();

  const isReplying = Boolean(replyingTo);

 const handleSubmit = (e) => {
  e.preventDefault();
  if (!text.trim()) return;

  if (replyingTo) {
    const newReply = {
      id: Date.now(), // simple ID for json-server
      content: text,
      createdAt: "just now",
      score: 0,
      replyingTo: replyingTo.user.username,
      user,
    };

    addReplyMutation.mutate({
      parentId: replyingTo.id,
      reply: newReply,
    });
  }

  if (!replyingTo) {
  const newComment = {
    id: Date.now(),
    content: text,
    createdAt: "just now",
    score: 0,
    user,
    replies: [],
  };

  addCommentMutation.mutate(newComment);
}


  setText("");
  setReplyingTo(null);
};


  return (
    <div className="bg-white w-cBox lg:w-rBoxDesktop p-3 rounded max-h-fit">
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            isReplying
              ? `Replying to @${replyingTo.user.username}`
              : "Add a comment"
          }
          className="border w-inBoxDesktop h-20 p-2 outline-none"
        />

        <div className="flex justify-between items-center mt-2">
          <img src={user?.image?.png} className="h-10 w-10" />
          {userLoading &&<span>Loading.....</span>}
          {userError&&  <span className=" text-LazyPink-400">User not found</span>}

          <button className="bg-DarkPurple-600 text-white px-4 py-2 rounded lg:px-7 lg:py-4">
            {isReplying ? "REPLY" : "SEND"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentInput;
