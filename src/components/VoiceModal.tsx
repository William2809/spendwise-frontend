import { useState } from "react";
import ReactModal from "react-modal";
import transactionService from "../utils/transaction/transactionService";
import { useEffect } from "react";
import ReactLoading from "react-loading";
import LoadingScreen from "./LoadingScreen";

type VoiceModalProps = {
	setVoiceIsOpen: (isOpen: boolean) => void;
	voiceIsOpen: boolean;
	text: string;
	isListening: boolean;
	startListening: () => void;
	stopListening: () => void;
};

interface Classified {
	name: string;
	item: string;
	category: string;
	amount: number;
}

const VoiceModal: React.FC<VoiceModalProps> = ({
	voiceIsOpen,
	setVoiceIsOpen,
	text,
	isListening,
	startListening,
	stopListening,
}) => {
	const [isClassifying, setIsClassifying] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [classified, setClassified] = useState<Classified>();
	const [wasListening, setWasListening] = useState(isListening);

	const handleClassify = async () => {
		try {
			setIsClassifying(true);
			const result = await transactionService.classifyTransaction(text);
			setClassified(result);
			setIsClassifying(false);
		} catch (error: any) {
			console.log(error);
		}
	};

	const handleSubmit = async () => {
		try {
			setIsLoading(true);
			const status = await transactionService.addTransaction({
				name: classified?.name,
				item: classified?.item,
				category: classified?.category,
				amount: classified?.amount,
				createdAt: "",
				_id: "",
			});
			console.log(status);
			setIsLoading(false);
			setVoiceIsOpen(false);
		} catch (error: any) {
			console.log("error");
		}
	};

	useEffect(() => {
		// If text changes and it's not empty, and speech recognition has just stopped
		if (text && wasListening && !isListening) {
			handleClassify();
		}
		setWasListening(isListening); // Keep track of the previous listening state
	}, [text, isListening]);

	return (
		<div>
			{isLoading ? <LoadingScreen /> : null}
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
						height: "500px",
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
					<div>
						<div className="mb-5 text-primary font-semibold flex items-center gap-2">
							<ReactLoading
								type={"bars"}
								color={"#43AF61"}
								height={28}
								width={28}
							></ReactLoading>
							Listening...
						</div>
						<button
							className="bg-white rounded-lg p-4 text-primary font-semibold"
							onClick={stopListening}
						>
							Stop Listening
						</button>
					</div>
				) : (
					<div>
						<button
							className="bg-white rounded-lg p-4 text-primary font-semibold"
							onClick={startListening}
						>
							Start Listening
						</button>
					</div>
				)}
				{text.length > 0 ? (
					<div className="py-3">
						<div className="text-primary-muted font-semibold text-[20px]">
							Transcript:
						</div>
						<div className=" text-primary">{text}</div>
					</div>
				) : null}

				{isClassifying ? (
					<div className="flex items-center gap-2 text-primary">
						<ReactLoading
							type={"cylon"}
							color={"#43AF61"}
							height={60}
							width={60}
						></ReactLoading>
						Classifying...
					</div>
				) : (
					<div>
						{/* <button
							className="p-5 bg-primary text-white rounded-xl"
							onClick={handleClassify}
						>
							Classify
						</button> */}
						{classified ? (
							<div className="bg-primary-muted rounded-xl p-3 text-white font-medium mt-2">
								<div>
									Please check the following fields before adding the
									transaction:
								</div>
								<div className="font-normal mt-2">
									<div>Name: &emsp;&emsp;{classified.name}</div>
									<div>Category:&emsp;{classified.category}</div>
									<div>Item:&emsp;&emsp;&emsp;{classified.item}</div>
									<div>Amount:&ensp;&emsp;{classified.amount} yen</div>
								</div>
								<button
									className="mt-5 w-full bg-primary hover:bg-primary-hover text-white font-semibold text-[28px] py-4 rounded-xl"
									onClick={handleSubmit}
								>
									Add Transaction
								</button>
							</div>
						) : null}
					</div>
				)}
			</ReactModal>
		</div>
	);
};

export default VoiceModal;
