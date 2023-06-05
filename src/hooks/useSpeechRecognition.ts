import { useEffect, useState } from 'react';

let recognition: any = null;

if('webkitSpeechRecognition' in window){
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US"; 
}

const useSpeechRecognition = () => {
    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        if(!recognition) return;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            console.log("onresult event: ", event);

            // Here we are updating the `text` state with the recognized speech.
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');
            setText(transcript);

            recognition.stop();
            setIsListening(false);
        }

    }, []);

    const startListening = () => {
        setText('');
        setIsListening(true);
        recognition.start();
    }

    const stopListening = () => {
        setIsListening(false);
        recognition.stop();
    }

    return {
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport: !!recognition
    }
}

export default useSpeechRecognition;
