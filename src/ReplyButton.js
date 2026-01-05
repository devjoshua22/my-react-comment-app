import { useState } from "react";

const ReplyButton = ({ onClick }) => {
  const [shake, setShake] = useState(false);

  const handleClick = () => {
    setShake(true);
    onClick();

    // remove class so it can re-trigger next time
    setTimeout(() => setShake(false), 300);
  };

  return (
    <button onClick={handleClick} className={`text-DarkPurple-600 font-bold flex gap-2 ${
      shake ? "animate-shake" : ""} `}>

      <img src="/images/icon-reply.svg" alt="" />
      Reply
    </button>
  );
};

export default ReplyButton;
