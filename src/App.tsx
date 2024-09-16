import React from "react";
import { useEffect, useState } from "react";
import OpenAI from "openai";

function App() {
  const API_KEY: string = import.meta.env.VITE_OPENAI_KEY as string;
  const openai = new OpenAI({ apiKey: API_KEY, dangerouslyAllowBrowser: true });
  const [text, setText] = useState("");

  useEffect(() => {
    const result = async function testAPI() {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
              role: "user",
              content: "Write a haiku about recursion in programming.",
            },
          ],
        });
        console.log(completion.choices[0].message);
        const aiResponse = await Promise.resolve(completion);
        const content = aiResponse.choices[0].message.content;
        if (content !== null) {
          setText(content);
        }
      } catch (err) {
        console.error(err);
      }
    };
    result().catch((err: unknown) => { console.error(err); });
  }, [openai.chat.completions, text]);

  return (
    <>
      <h1>AI Travel Planner</h1>
      <p>OpenAI return message: {text}</p>
    </>
  );
}

export default App;
