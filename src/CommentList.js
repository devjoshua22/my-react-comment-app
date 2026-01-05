import { useState } from "react";
import UseHandleData from "./UseHandleData";
import CommentItem from "./CommentItem";

  
const CommentList = ({onReply, replyingTo}) => {
   
  const {user: currentUser, userLoading,userError,comments,commentLoading,commentError} = UseHandleData()
 

      
  if (commentLoading) return <p>Loading comments...</p>;
  if (commentError) return <p className=" text-LazyPink-400">Error loading comments</p>;
    return ( 
      <>
        {comments.map(comment => (
  <CommentItem
    key={comment.id}
    comment={comment}
    currentUser={currentUser}
    onReply={onReply}
    replyingTo={replyingTo}
    
  />
))}</>

     );
}
 
export default CommentList;
