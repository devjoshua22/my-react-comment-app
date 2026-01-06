import VoteBox from "./VoteBox";
import { useState } from "react";
import ReplyButton from "./ReplyButton";
import ReplyList from "./ReplyList";
import DeleteModal from "./DeleteModal";
import useHandleDelete from "./UseDelete";
import useEditComment from "./useEdit";

const CommentItem = ({ comment, currentUser, onReply, replyingTo, parentId = null }) => {
     const [showDelete, setShowDelete] = useState(false);
     const isCurrentUser = comment.user.username === currentUser.username;
     const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(comment.content);
     const avatar = comment.user?.image?.png;
     const deleteMutation = useHandleDelete();

     let isActiveReply = replyingTo?.id === comment.id;

     //voting logic
      const [userVote, setUserVote] = useState(null);
      const [score, setScore] = useState(comment.score);
     const handleVote = (value) => {
    // placeholder for now
    //console.log("Vote change:", delta, "for comment", comment.id);

      // If user clicks same vote again → undo
    if (userVote === value) {
      setUserVote(null);
      setScore(prev => prev - value);
      return;
    }
     // If user switches vote (+1 to -1 or vice versa)
    if (userVote !== null) {
      setScore(prev => prev - userVote + value  );
      
    } else {
      // First time voting
      setScore(prev => prev + value);
    }
      console.log(score ,value )

      setUserVote(value);
  };
  //handle delete logic
     const handleDelete = () => {
  deleteMutation.mutate({
    id: comment.id,
    parentId
  });
  setShowDelete(false);
};

// centralized show/hide for delete modal
const handleShowDelete = () => setShowDelete(true);
const handleHideDelete = () => setShowDelete(false);

 // use edit logic
    const editMutation = useEditComment();

const handleUpdate = () => {
    editMutation.mutate({
    id: comment.id,
    parentId,
    content: editText
  });
  setIsEditing(false);
};
 console.log("comment:", comment.id, "parentId:", parentId);


  return (
    
      <div id="comment"   className="flex flex-wrap w-cBox gap-3 text-gray-500 font-medium rounded-md justify-center items-center lg:w-fullBox Xlg:w-maxim "  >
  {showDelete && (
    <DeleteModal onConfirm={handleDelete} onCancel={handleHideDelete} />
  )}
  <div key={comment.id}   className={` bg-white rounded-md p-3  h-fit  transition lg:flex lg:justify-stretch gap-3 items-center    lg:h-deskHeight
    ${isActiveReply ? "ring-2 ring-DarkPurple-600" : ""} ${!comment.replies? "w-rBox lg:w-rBoxDesktop lg:h-36 Xlg:w-cBoxDesktop" :"w-cBoxDesktop Xlg:w-maxim"}
  `}>
     <div className="hidden lg:inline-block">
          <VoteBox score={score} onVote={handleVote} userVote={userVote} />
    </div>
    <div className=" lg:flex flex-wrap gap-2">
      <header className="flex items-center justify-between w-full">
      {comment.user?.image?.png && (
        <img src={comment.user.image.png} alt="avatar"  className=" h-10 w-10"/>
      )}
       <span className=" flex flex-wrap items-center justify-between  text-gray-800 font-semibold text-base gap-2">
      <div className="  text-gray-800 font-semibold text-lg">{comment.user?.username}
         {comment.user.username === currentUser.username && (
          <span className="ml-2 bg-DarkPurple-600  text-white text-xs p-1 rounded lg:hidden">
        you
        </span>
         )}
       <p className=" hidden lg:">{comment.createdAt}</p>
      </div>
      {comment.user.username === currentUser.username && (
  <div className=" lg:flex flex-nowrap items-center justify-between w-52 hidden">
        <span className="ml-2 bg-DarkPurple-600  text-white text-xs p-1 rounded">
        you
        </span>
        < button className=" flex flex-nowrap items-center gap-1 cursor-pointer" onClick={() => setIsEditing(true)}>
            <img src="/images/icon-edit.svg" alt="" className="" />
            <span className=" text-DarkPurple-600  font-bold text-lg">Edit</span>
        </button>
  <button  onClick={() =>{console.log("DELETE CLICKED", comment.id, parentId); handleShowDelete()}   } className=" flex flex-nowrap items-center gap-1 cursor-pointer">
            <img src="/images/icon-delete.svg" alt="" className="" />
            <span className=" text-LazyPink-400 font-bold text-lg">Delete</span>
            </button>
        </div>
        
      
        
        
    )}
      </span>

      
      <p className=" ">{comment.createdAt}</p>
         {comment.user.username != currentUser.username && (
          <div className=" hidden lg:inline-block">
            <ReplyButton onClick={() => onReply(comment)}  />
          </div>
          )}
    </header>
    <main id="body">
      {isEditing ? (
        <textarea
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="border w-full lg:w-cBox Xlg: p-2"
        />
      ) : (
        comment.replyingTo ? (
          <p className="py-2">
            <span className=" text-DarkPurple-600 font-bold">{comment.replyingTo + " "}</span>
            {comment.content}
          </p>
        ) : (
          <p className=" py-2">{comment.content}</p>
        )
      )}
      {isEditing && (
  <div className="flex gap-3 mt-2">
        <button onClick={handleUpdate} className="bg-DarkPurple-600 text-white px-3 py-1 rounded">
          Update
        </button>
        <button onClick={() => setIsEditing(false)}className="text-gray-500 bg-LazyPink-400 rounded text-white px-3" >
          Cancel
        </button>
      </div>
)}

   
    </main>
    {!isEditing && <section className="flex flex-nowrap justify-between lg:hidden">
         <VoteBox score={score} onVote={handleVote} userVote={userVote} />
          {isCurrentUser && (
            <button  onClick={() =>{console.log("DELETE CLICKED", comment.id, parentId); handleShowDelete()}   } className=" flex flex-nowrap items-center gap-1 cursor-pointer">
            <img src="/images/icon-delete.svg" alt="" className="" />
            <span className=" text-LazyPink-400 font-bold text-lg">Delete</span>
            </button>
        )}
        


          {isCurrentUser && (
           < button className=" flex flex-nowrap items-center gap-1 cursor-pointer" onClick={() => setIsEditing(true)}>
            <img src="/images/icon-edit.svg" alt="" className="" />
            <span className=" text-DarkPurple-600  font-bold text-lg">Edit</span>
        </button>
          )}

          {comment.user.username != currentUser.username && (
          <ReplyButton onClick={() => onReply(comment)}  />
          )}
        
    </section>}
    </div>
   
  </div>
  
        {/* 🔥 THIS IS THE KEY PART */}
        {comment.replies?.length > 0 && (
  <ReplyList
    replies={comment.replies}
    parentId={comment.id}     // 🔥 THIS IS THE SOURCE
    currentUser={currentUser}
    onReply={onReply}
    comment = {comment}
     isActiveReply = {isActiveReply}
     replyingTo={replyingTo}
  />
)}
        </div>

  );
};

export default CommentItem;
