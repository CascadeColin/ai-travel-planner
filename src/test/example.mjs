import OpenAI from "openai";
import * as dotenv from 'dotenv'
dotenv.config();
const openai = new OpenAI({apiKey: process.env.VITE_OPENAI_KEY, organization: process.env.VITE_ORGANIZATION_KEY});

// TODO: once this is refined, export it to React component for rendering to user

const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
        {
            role: "assistant",
            content: "show me hotels in las vegas from november 1 to november 5",
        },
    ],
});

/*
content: "I can't display live information or search real-time results, but I can guide you on how to find this information. You can check hotel availability and prices for your specified dates by using various travel booking websites. Here are some popular ones you can use:\n" +
    '\n' +
    '1. **Booking.com**\n' +
    '2. **Expedia**\n' +
    '3. **Hotels.com**\n' +
    '4. **TripAdvisor**\n' +
    '5. **Trivago**\n' +
    '6. **Kayak**\n' +
    '7. **Airbnb**\n' +
    '\n' +
    "Here's a general guide on how you can proceed:\n" +
    '\n' +
    '1. **Choose a Website:** Go to one of the aforementioned websites.\n' +
    '2. **Enter Location:** Type "Las Vegas" in the destination search bar.\n' +
    '3. **Set Dates:** Set the check-in date to November 1 and the check-out date to November 5.\n' +
    '4. **Search:** Hit the search button to see the list of available hotels.\n' +
    '5. **Filters:** Use filters to narrow down your search using criteria such as price range, star rating, amenities, and guest reviews.\n' +
    '\n' +
    "Additionally, if you're a member of any hotel loyalty program, you might want to check the hotel chain’s website directly for special deals or discounts.\n" +
    '\n' +
    "Don't forget to read reviews and compare prices across different platforms to get the best deal for your stay in Las Vegas!",
*/

// FOLLOWED BY... access each source and map to get website for each of the external booking websites
const bookingEngines = ["Booking.com", "Trivago", "Kayak"]  // etc...

const website = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
        {
            role: "assistant",
            content: `what is the url to access ${bookingEngines[1]}`,  // gets the url for Trivago 
        },
    ],
});

/*
content: 'To access Trivago, you can visit their official website at the following URL:\n' +
    '\n' +
    '[https://www.trivago.com](https://www.trivago.com)\n' +
    '\n' +
    'This will take you to their homepage, where you can search for hotels and compare prices.',
*/ 

// NOTE: It appears that ALL of the AI text responses are written in markdown, so URLs can be dynamically extracted when it uses the [URL](URL) syntax

console.log(completion)
console.log("\n\n")
console.log(completion.choices)
console.log("\n\n")
console.log(completion.choices[0].message);