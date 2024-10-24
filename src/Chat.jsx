import React, { useState } from 'react';
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

function Chat() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSendMessage = async () => {
    try {
      // Replace 'YOUR_API_KEY' with your actual API key
      const genAI = new GoogleGenerativeAI('AIzaSyBgZeLeo5dYpX7M7Gh5UjGwv812bM0582E');

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(message );

      if (result.error) {
        console.error('Error generating content:', result.error);
        setResponse('Failed to generate content');
        return;
      }

      const generatedText = result.response.text();
      setResponse(generatedText);
    } catch (error) {
      console.error('Error processing request:', error.message);
      setResponse('Failed to process request');
    }
  };

  return (
    <div>
      <h1>Chat with Gemini AI</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={handleSendMessage}>Send</button>
      <div>{response}</div>
    </div>
  );
}

export default Chat;