const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { getFoodGuideOptions } = require('../functions/getFoodGuideOptions');

admin.initializeApp();

exports.getFoodGuideOptionsData = functions.https.onRequest(async (req, res) => {

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
            data: data
        });
    } catch (error) {
        console.error('Error getting food guide options:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});
