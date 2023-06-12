import React from "react";
interface CardProps {
	imgSrc: string;
	title: string;
	text: string;
	next: string;
}

const Card: React.FC<CardProps> = ({ imgSrc, title, text, next }) => {
	return (
		<div className="bg-secondary rounded overflow-hidden shadow-lg">
			<div className="flex items-center gap-3">
				<img
					className="ml-5 h-20 w-20 object-contain object-center rounded-full"
					src={imgSrc}
					alt="Card Image"
				/>
				<div className="px-6 py-4">
					<div className="font-bold text-xl mb-2">{title}</div>
					<p className="text-gray-700 text-base py-3">{text}</p>
					<a
						className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded"
						href={next}
						target="_blank"
					>
						SEE THE DEAL
					</a>
				</div>
			</div>
		</div>
	);
};

export default Card;
