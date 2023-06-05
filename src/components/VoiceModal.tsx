import { useState } from "react";
import ReactModal from "react-modal";

import LoadingScreen from "./LoadingScreen";
import transactionService from "../utils/transaction/transactionService";

type VoiceModalProps = {
	setVoiceIsOpen: (isOpen: boolean) => void;
	voiceIsOpen: boolean;
	text: string;
	isListening: boolean;
	startListening: () => void;
	stopListening: () => void;
};

interface Classfied {
	name: string;
	item: string;
	category: string;
	amount: string;
}

const VoiceModal: React.FC<VoiceModalProps> = ({
	voiceIsOpen,
	setVoiceIsOpen,
	text,
	isListening,
	startListening,
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [classified, setClassified] = useState<Classfied>();
	const handleClassify = async () => {
		try {
			setIsLoading(true);
			const result = await transactionService.classifyTransaction(text);
			setClassified(result);
			setIsLoading(false);
		} catch (error: any) {
			console.log(error);
		}
	};

	return (
		<div>
			{isLoading ? (
				<LoadingScreen />
			) : (
				<ReactModal
					isOpen={voiceIsOpen}
					onRequestClose={() => {
						setVoiceIsOpen(false);
						setClassified(undefined);
					}}
					style={{
						overlay: {
							backgroundColor: "rgba(0, 0, 0, 0.75)",
							zIndex: 20,
							display: "flex",
							alignItems: "flex-end",
							justifyContent: "center",
						},
						content: {
							color: "lightsteelblue",
							height: "400px",
							margin: "auto",
							background: "#C5DDC6",
							borderRadius: "16px",
						},
					}}
					contentLabel="Example Modal"
					shouldCloseOnOverlayClick={true}
					shouldCloseOnEsc={false}
					ariaHideApp={false}
				>
					{isListening ? (
						<div className="my-10 text-primary font-semibold">Listening...</div>
					) : null}
					<button
						className="bg-white rounded-lg p-4 text-primary font-semibold"
						onClick={startListening}
					>
						Start Again
					</button>
					<div className="p-5 text-primary">{text}</div>

					<button
						className="p-5 bg-primary text-white rounded-xl"
						onClick={handleClassify}
					>
						Classify
					</button>
					{classified ? (
						<div className="text-black font-medium mt-10">
							<div>Name: {classified.name}</div>
							<div>Category: {classified.category}</div>
							<div>Item: {classified.item}</div>
							<div>Amount: {classified.amount}</div>
						</div>
					) : null}
				</ReactModal>
			)}
		</div>
	);
};

export default VoiceModal;
