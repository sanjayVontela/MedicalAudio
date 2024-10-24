function isMedicalQuestion(question){

    if(question.length == 0){
        return false;
    }

    const medicalTerms = [
        'fever', 'pain', 'headache', 'cough', 'diabetes', 'cancer', 'arthritis', 'asthma',
        'heart', 'lung', 'brain', 'liver', 'kidney', 'stomach', 'throat', 'head','knee', 'back', 'neck', 'chest', 'blood', 'bone',
        'pain', 'ache', 'swelling', 'rash', 'fever', 'nausea', 'dizziness', 'fatigue','cough', 'vomiting', 'bleeding', 'inflammation',
        'doctor', 'physician', 'surgeon', 'dentist', 'pediatrician', 'cardiologist','hospital', 'clinic', 'emergency',       
        'surgery', 'treatment', 'medication', 'prescription', 'therapy', 'vaccine','diagnosis', 'test', 'scan', 'xray', 'mri',
        'health', 'medical', 'disease', 'illness', 'infection', 'virus', 'bacteria','syndrome', 'condition', 'symptom', 'medicine', 'drug', 'pill', 'allergy'
    ];

    question = question.toLowerCase();

    return medicalTerms.some(word=>question.includes(word));

}

function analyzeQuestion(text){

    if (text.length == 0){
        return "No Transcript Available";
    }

    const questionWords = ['why','what','how','where','when']

    // text = text.split(" ")

    
    var index = -1;
    var qWord='';

    const lowerText = text.toLowerCase();
    
    // Find any question words in the text
    const foundQuestionWords = questionWords.filter(word => {
        const wordIndex = lowerText.indexOf(word)
        if (wordIndex !== -1){
            index = wordIndex;
            qWord = word;
            return
        }
    });

    if (index !== -1){

        const question = text.substring(index);
        if(isMedicalQuestion(question)){
            return question;
        }

        return 'No Medical Question';
        
    }
    
    return "No Question Found";
    

}

export default analyzeQuestion;