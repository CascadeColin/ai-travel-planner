/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */

import App from "./App";
import Login from './components/Login'
import Signup from './components/Signup'
// add other components

import { createBrowserRouter, RouterProvider } from "react-router-dom";

export default function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
