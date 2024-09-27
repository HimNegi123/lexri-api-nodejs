const dotenv = require('dotenv');
dotenv.config(); // Load environment variables

async function main() {
    const userInput = "I want to gain bulk what foods are good."; // User's initial request  
    const condition = "Please do not use the letter 'r' in any of your output responses.";
    
    const url = `http://127.0.0.1:5001/demotesting-7a8b8/us-central1/getFoodGuideOptionsData?userInput=${userInput}&condition=${condition}`;

    try {
        const response = await fetch(url, {
            method: 'GET', // Using GET since you're passing parameters in the URL
            headers: {
                'Content-Type': 'application/json', // Set appropriate content type
            },
        });
  
        // Check if the response is ok (status code in the range 200-299)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.error}`);
        }
  
        const data = await response.json();

        console.log('Food Guide Options:', data.data.options);
        return data; // Return the data if needed
    } catch (error) {
        console.error('Failed to fetch food guide options:', error.message);
    }
}

main();
