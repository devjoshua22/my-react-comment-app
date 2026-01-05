import CommentItem from "./CommentItem";

const ReplyList = ({ replies, currentUser, onReply,  replyingTo , parentId}) => {
  
  if (!replies || replies.length === 0) return null;

  return (
    <div className="ml-3 border-l-2 border-gray-300 mt-2 pl-3 space-y-4 lg:ml-7 " >
      {replies.map(reply => (
        <CommentItem
        key={reply.id}
        comment={reply}
        currentUser={currentUser}
        onReply={onReply}
        replyingTo={replyingTo}
         parentId={parentId}
      />

      ))}
    </div>
  );
};

export default ReplyList;
