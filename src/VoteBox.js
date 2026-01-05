

const VoteBox = ({score, onVote, userVote }) => {
  return (
    <div>

      <div className="flex lg:hidden items-center bg-gray-100 w-24 justify-evenly rounded ">
      <button onClick={() => onVote(1)} className={userVote === 1 ? "opacity-50" : ""}
      >
        <img src="/images/icon-plus.svg" className="w-4 h-5" />
      </button>

      <p className="text-DarkPurple-600 font-bold">{score}</p>

      <button onClick={() => onVote(-1)} className={userVote === -1 ? "opacity-50" : ""} >
        <img src="/images/icon-minus.svg" className="w-5 h-1.5" />
      </button>
    </div>

    <div className="hidden lg:flex flex-wrap items-center bg-gray-100 w-10 px-1 h-28 justify-evenly rounded mt-2 ">
      <div>
        <button onClick={() => onVote(1)} className={userVote === 1 ? "opacity-50" : " "}>
        <img src="/images/icon-plus.svg" className="w-4 h-5" />
      </button>
      </div>
      <div>
        <p className="text-DarkPurple-600 font-bold px-2">{score}</p>
      </div>

      <div>
        <button onClick={() => onVote(-1)} className={userVote === -1 ? "opacity-50" : ""} >
        <img src="/images/icon-minus.svg" className="w-5 h-1.5" />
      </button>
      </div>

      

      
    </div>
    </div>
    

    
  );
};

export default VoteBox;

