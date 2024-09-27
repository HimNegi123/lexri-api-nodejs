require('dotenv').config();
const { FoodGuideOptions } = require("../models/food_guide_model");
const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const { zodResponseFormat } = require('openai/helpers/zod');
async function getFoodGuideOptions(userInput, condition) {
    let system_message = "You are a helpful food guide assistant.";
    if (condition) {
        system_message += `\nHere are some of the conditions that you must keep while generating a response:\n${condition}`;
    }

    // Create the prompt directly inside the function
    const prompt = `
    You are a helpful food guide assistant. A user has requested the following: "${userInput}".

Provide 3-5 different types of information that the user might want in response to their request.
Format the output as a JSON array of objects, where each object has a "name" and "description" field.

For example:
[
  {
    "name": "Caloric Breakdown",
    "description": "Information on the calorie content of different meals throughout the day."
  },
  {
    "name": "High-Protein Food Suggestions",
    "description": "A list of foods rich in protein that are good for building muscle."
  }
]`;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: system_message },
            { role: "user", content: prompt },
        ],
        response_format: zodResponseFormat(FoodGuideOptions, 'food_guide_options'),
    });

    const responseContent = completion.choices[0].message.content;// Adjust based on the response structure

    if (!responseContent) {
        console.log('An error occurred');
    }
    return responseContent || undefined;
}

module.exports = { getFoodGuideOptions };
