import React from "react";
interface CardProps {
  imgSrc: string;
  title: string;
  text: string;
  next: string;
}

const Card: React.FC<CardProps> = ({ imgSrc, title, text, next }) => {
  const onClickButton = () => {
    window.location.href = next;
  };
  return (
    <div className="bg-secondary rounded overflow-hidden shadow-lg">
      <div className="flex items-center gap-3">
        <img className="h-20 w-40" src={imgSrc} alt="Card Image" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{text}</p>
          <button
            className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded"
            onClick={onClickButton}
          >
            SEE THE DEAL
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
