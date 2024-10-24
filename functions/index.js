const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("Your_api_key");



exports.processText = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {

      console.log('Request body:', req.body);
      

      if (!req.body.data || !req.body.data.question) {
        throw new Error('Missing question in request data');
      }

      var question = req.body.data.question;
    
      const model = genAI.getGenerativeModel({ 
        model: "gemini-pro",
      });
      question = question+"? In short paragraph."
    

      const result = await model.generateContent(question);
      const response = await result.response;
      const text = response.text();
    


      return res.status(200).json({
        data: {
          text: text,
          status: 'success',
        }
      });

    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({error: error.message || "internal error"});
    }
  });
});