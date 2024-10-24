import React, { useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {NotificationContainer, NotificationManager} from 'react-notifications';
const SpeechToText = ({setText,stopSpeaking}) => {

    const [error, setError] = useState("")

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();

     

      const startListening = ()=>{
        if (!browserSupportsSpeechRecognition) {
            NotificationManager.error("Browser doesn't support speech recognition.");
            return;
          }
          stopSpeaking(false);
        SpeechRecognition.startListening({ continuous: true }).catch((err) => {
            console.error("Error starting speech recognition:", err);
            setError("Failed to start speech recognition. Please try again.");
        });
      } 

      const stopListening = () =>{
        if (!browserSupportsSpeechRecognition) {
            NotificationManager.error("Browser doesn't support speech recognition.");
            return;
          }
        SpeechRecognition.stopListening().catch((err) => {
            console.error("Error stopping speech recognition:", err);
            setError("Failed to stop speech recognition. Please try again.");
        });
        setText(transcript)
        stopSpeaking(true)
        resetTranscript();
      }




      
      return (
        <div>
          <p>Microphone: {listening ? 'on' : 'off'}</p>
          <button onClick={startListening}>Start</button>
          <button onClick={stopListening}>Stop</button>
          <h3>Text:</h3><p>{transcript}</p>
          <NotificationContainer/>
        </div>
      );
}

export default SpeechToText;