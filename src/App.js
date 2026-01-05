import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { useState } from "react";


function App() {
   const [replyingTo, setReplyingTo] = useState(null);
   const handleReplyToggle = (comment) => {
    setReplyingTo(prev =>
     prev?.id === comment.id ? null : comment
    );
    };
   

    return (
 <div className=" w-screen-sm  flex flex-wrap align-middle justify-center gap-4 bg-gray-100 h-full overflow-hidden p-6 lg:w-screen  Xlg:w-full  ">
        <CommentList onReply={handleReplyToggle} replyingTo={replyingTo}  />
       <CommentInput replyingTo={replyingTo} setReplyingTo={setReplyingTo} />
    </div>
  );
}

export default App;



