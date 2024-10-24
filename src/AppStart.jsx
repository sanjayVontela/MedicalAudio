import React, { useEffect, useState } from 'react';
import SpeechToText from './SpeechToText';
import analyzeQuestion from './analyzeQuestions';
import answerService from './AnswerService';

const AppStart = () => {
    const [text, setText] = useState("");
    const [stopSpeaking, setStopSpeaking] = useState(false);
    const [answer, setAnswer] = useState("");
    const [question, setQuestion] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!stopSpeaking) {
            setAnswer("");
            setQuestion("");
            setText(""); 
        }
    }, [stopSpeaking]);

    useEffect(() => {
        if (stopSpeaking && text) {
            setQuestion(analyzeQuestion(text));
        }
    }, [stopSpeaking, text]);

    useEffect(() => {
        const handleSubmit = async () => {
            if (!question || isProcessing || question === 'No Question Found' || question === 'No Medical Question') return;
            
            try {
                setIsProcessing(true);
                setAnswer(""); 
                const response = await answerService(question);
                setAnswer(response);
            } catch (error) {
                console.error('Error getting answer:', error);
                setAnswer('Sorry, there was an error processing your question.');
            } finally {
                setIsProcessing(false);
            }
        };

        if (stopSpeaking && question.length > 0) {
            handleSubmit();
        }
    }, [question, stopSpeaking]);

    const renderAnswer = (text) => {
        return text.split('\n').map((line, i) => (
            <React.Fragment key={i}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    return (
        <div>
            <SpeechToText setText={setText} stopSpeaking={setStopSpeaking}/>
            <h5>Question: {question}</h5>
            <h5>Answer: {renderAnswer(answer)}</h5>
        </div>
    );
}

export default AppStart;