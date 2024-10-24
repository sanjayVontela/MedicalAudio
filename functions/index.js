const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyCn8Rw0N32YbIjLAkInHQR2gbFY1EA2d3g");

const SAFETY_SETTINGS = [
  {
    category: "HARM_CATEGORY_HARASSMENT",
    threshold: "BLOCK_MEDIUM_AND_ABOVE",
  },
  {
    category: "HARM_CATEGORY_HATE_SPEECH",
    threshold: "BLOCK_MEDIUM_AND_ABOVE",
  },
  {
    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    threshold: "BLOCK_MEDIUM_AND_ABOVE",
  },
  {
    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
    threshold: "BLOCK_MEDIUM_AND_ABOVE",
  },
];


exports.processText = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {

      console.log('Request body:', req.body);
      

      if (!req.body.data || !req.body.data.question) {
        throw new Error('Missing question in request data');
      }

      var question = req.body.data.question;
      

      const estimatedTokens = question.length / 4;
      if (estimatedTokens > 2048) {
        throw new Error('Input text is too long. Please limit to approximately 2048 tokens.');
      }

      console.log('Processing question:', question);


      const model = genAI.getGenerativeModel({ 
        model: "gemini-pro",
        safetySettings: SAFETY_SETTINGS,
      });
      question = question+"? In short paragraph."
      console.log(question);

      const result = await model.generateContent(question);
      const response = await result.response;
      const text = response.text();
      
      console.log('Generated response:', text);


      return res.status(200).json({
        data: {
          text: text,
          status: 'success',
          tokenInfo: {
            estimatedInputTokens: estimatedTokens,
          }
        }
      });

    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({
        data: {
          error: error.message || "An internal error occurred",
          status: 'error'
        }
      });
    }
  });
});