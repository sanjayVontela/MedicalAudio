
# Medical Audio Assistant: Real-Time Logic

## Project Overview

This project is a minimal prototype for an audio-based Q&A assistant designed to:
1. Capture audio from a simulated conversation.
2. Transcribe the audio to text in real time.
3. Identify questions in the transcription.
4. Suggest answers based on predefined documents.

## Tech Stack
- **Frontend**: React.js 
- **Backend**: Firebase 
- **AI Model**: Gemini AI  for question answering

## Features
1. **Speech-to-Text**: Transcribes spoken words into text using the Web Speech API.
2. **Question Detection**: Detects questions in the transcribed text and checks for medical relevance.
3. **Answer Suggestion**: Suggests answers based on the provided question using Firebase cloud functions.

## Installation

### Prerequisites
- Node.js installed on your machine
- Firebase account and project set up
- Gemini AI API key (or another AI service if preferred)

### Steps to Set Up the Project

1. **Clone the repository**:
    ```bash
    git clone https://github.com/sanjayVontela/MedicalAudio.git
    cd MedicalAudio
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Firebase Setup**:
    - In the project directory, create a Firebase project.
    - Initialize Firebase functions:
      ```bash
      firebase init functions
      ```
    - Install necessary Firebase functions dependencies:
      ```bash
      cd functions
      npm install
      ```
    - Configure the cloud function in `functions/index.js` to call Gemini AI or your chosen AI service. Ensure you include your API key.

4. **Environment Variables**:
    - Ensure to store sensitive keys (such as OpenAI API keys) in Firebase config or in `.env` files for local use. Avoid committing them to the repository.

5. **Run the Application**:
    ```bash
    npm start
    ```
    This will start the development server on `localhost:3000`.

6. **Deploy Firebase Functions**:
    ```bash
    firebase deploy --only functions
    ```

## How to Use

1. **Speech Recognition**: 
   - Open the application.
   - Click the "Start" button to begin recording your speech.
   - Speak naturally, and the app will transcribe your speech into text.
   - Click "Stop" when you're done speaking.

2. **Question Detection**: 
   - The system will analyze the transcribed text and detect whether it contains any questions.
   - If it detects a question, it will classify whether the question is medically related.

3. **Answer Suggestion**: 
   - If a valid question is found, it is sent to the backend (Firebase functions) to retrieve a suggested answer from an AI service (OpenAI, etc.).
   - The suggested answer will be displayed below the question.

## Code Explanation

- **AppStart Component**:
  - Handles the overall flow of the app, including managing states for transcription, questions, and answers.
  - Initiates the transcription process and triggers question detection once the user finishes speaking.

- **SpeechToText Component**:
  - Uses the `react-speech-recognition` package to handle browser-based speech-to-text functionality.
  - Provides the ability to start and stop listening, and manages the transcription output.

- **analyzeQuestions.js**:
  - Contains the logic for detecting questions within the transcribed text.
  - Checks for medical relevance by matching the text against a list of medical terms.

- **AnswerService.js**:
  - Calls Firebase functions to interact with the AI service.
  - Processes the returned answers and formats them for display.

## Error Handling
- **Transcription Issues**: If the browser doesn't support speech recognition, it will notify the user via an error message.
- **Question Detection Failures**: If no valid question is detected, the user is informed (e.g., "No Question Found" or "No Medical Question").
- **Backend Errors**: If there's an issue fetching answers, the user will receive an error message like "Sorry, there was an error processing your question."

## Future Enhancements
- **Improved Question Detection**: Further refine the question detection logic to handle more complex sentence structures.
- **Extended Domain Knowledge**: Currently, the model focuses on medical questions. Extend support to other domains by adding more comprehensive document datasets.
- **UI Improvements**: Though UI is minimal in this version, adding features such as real-time visual feedback during transcription or improving layout design would be future goals.

## Demo
- To see the app in action, check out this [Loom Video](https://www.loom.com/share/bc60c0e495a4462691183375f7fb784d?sid=4c2e2394-7b1d-44c8-bd5e-2dd7a1e023e7).

## Conclusion
This project demonstrates the core logic of a real-time audio Q&A assistant. With improvements, it could become a robust tool for real-time customer support, healthcare Q&A, or even educational purposes.
