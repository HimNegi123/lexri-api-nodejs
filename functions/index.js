const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getFoodGuideOptions}=require('./utils/getFoodGuideOptions')
initializeApp();

exports.getFoodGuideOptionsData = onRequest(async (req, res) => {

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const userInput = req.query.userInput;
    const condition = req.query.condition;
    if (!userInput || typeof userInput !== 'string' || userInput.trim() === '') {
        return res.status(400).json({ error: 'userInput is required and must be a non-empty string' }); 
    }
    
    try {
        const data = await getFoodGuideOptions(userInput, condition);
        console.log(data);
        if (!data) {
            return res.status(500).json({ error: 'No data returned from OpenAI' });
        }
       
        // Respond with the received data
        return res.status(200).json({
            message: 'Data retrieved successfully',
            data: JSON.parse(data)
        });
    } catch (error) {
        console.error('Error getting food guide options:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});
