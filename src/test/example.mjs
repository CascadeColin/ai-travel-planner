import OpenAI from "openai";
import * as dotenv from 'dotenv'
dotenv.config();
const openai = new OpenAI({apiKey: process.env.VITE_OPENAI_KEY, organization: process.env.VITE_ORGANIZATION_KEY});

// TODO: once this is refined, export it to React component for rendering to user

const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: "plan a trip to hawaii from october 1 to october 7",
        },
    ],
});

console.log(completion.choices[0].message);