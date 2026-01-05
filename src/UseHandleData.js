import { useQuery } from "@tanstack/react-query";

const UseHandleData = () => {
    const fetchComments = async () => {
     const res = await fetch("https://comment-data.onrender.com/comments");
      if (!res.ok) throw new Error("Failed to fetch comments");
      return res.json();
    };

     const { data: comments = [], isLoading: commentLoading, error: commentError } = useQuery({
    queryKey: ["comments"],
    queryFn: fetchComments,
      });

     const fetchUser = async () => {
     const res = await fetch("https://comment-data.onrender.com/currentUser");
      if (!res.ok) throw new Error("Failed to fetch user");
      return res.json();
    };

    const { data: user = {}, isLoading: userLoading, error:userError } = useQuery({
         queryKey: ["user"],
         queryFn: fetchUser,
       });
    return {comments,commentLoading,commentError,user, userLoading,userError};
}
 
export default UseHandleData;