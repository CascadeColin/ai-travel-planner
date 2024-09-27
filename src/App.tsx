import OpenAI from "openai";
import Nav from "./components/Nav";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AuthContext from "./context/AuthContext";
import { User, Auth } from "./interfaces";

const LOCAL_STORAGE_TOKEN_KEY = "tripToken"

function App() {
  const API_KEY: string = import.meta.env.VITE_OPENAI_KEY as string;
  const ORG_KEY: string = import.meta.env.VITE_ORGANIZATION_KEY as string;
  const openai = new OpenAI({
    apiKey: API_KEY,
    organization: ORG_KEY,
    dangerouslyAllowBrowser: true,
  });

  const [user, setUser] = useState<User | null>(null);
  const [restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    if (token) {
      login(token)
    }
    setRestoreLoginAttemptCompleted(true)
  }, [])

  const login = (token: string) => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token)

    const { sub: username } = jwtDecode(token);

    const user: User = {
      username,
      token,
    };

    setUser(user);
    return user;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
  };

  const auth: Auth = {
    user: user ? { ...user } : null,
    login,
    logout,
  };

  // TODO: Runs infinitely, test with mock data to get this working properly.
  // useEffect(() => {
  //   const result = async function testAPI() {
  //     try {
  //       const completion = await openai.chat.completions.create({
  //         model: "gpt-4o-mini",
  //         messages: [
  //           { role: "system", content: "You are a helpful assistant." },
  //           {
  //             role: "user",
  //             content: "Write a haiku about recursion in programming.",
  //           },
  //         ],
  //       });
  //       console.log(completion.choices[0].message);
  //       const aiResponse = await Promise.resolve(completion);
  //       console.log(aiResponse);
  //       const content = aiResponse.choices[0].message.content;
  //       if (content !== null) {
  //         setText(content);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   result().catch((err: unknown) => {
  //     console.error(err);
  //   });
  // }, [openai.chat.completions, text]);

  return (
    <AuthContext.Provider value={auth}>
      <Nav></Nav>
      <main>
        <Outlet />
      </main>
      {/* <p>OpenAI return message: {data.mockData.choices[0].message.content}</p> */}
    </AuthContext.Provider>
  );
}

export default App;
