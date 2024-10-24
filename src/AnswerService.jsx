import { functions } from './firebase-config';
import { httpsCallable } from 'firebase/functions';

async function answerService(question) {
    if (!question?.trim()) {
        throw new Error('Question is required');
    }

    const estimatedTokens = question.length / 4;
    if (estimatedTokens > 2048) {
        throw new Error('Input text is too long. Please limit to approximately 2048 tokens.');
    }

    const processText = httpsCallable(functions, 'processText');

    try {
        const result = await processText({ question: question });
        
        if (!result.data || !result.data.text) {
            throw new Error('Invalid response format from server');
        }
        
        const responseText = result.data.text;
        const parts = responseText
            .split('**')
            .map(part => part.trim())
            .filter(part => part.length > 0);

        // Format as bullet points
        const formattedResponse = parts
            .map((part, index) => `${index + 1}. ${part}`)
            .join('\n');
            
        return formattedResponse || 'No response generated'; 
        
    } catch (error) {
        console.error('Error processing question:', error);
        throw error;
    }
}

export default answerService;