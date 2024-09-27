import App from "./App";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Config from "./components/Config";
import Landing from "./components/Landing";
import AllTrips from "./components/AllTrips";
import Trip from "./components/Trip";
import AddTrip from "./components/AddTrip";
import LoginLanding from "./components/LoginLanding";
// add other components

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// TODO: refactor into proper TS
export default function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: `/home/:loginId`,
          element: <LoginLanding />
        },
        {
          path: '/add-trip',
          element: <AddTrip />
        },
        {
          path: "/",
          element: <Landing />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: `/config/`,
          element: <Config />,
        },
        {
          path: "/my-trips",
          element: <AllTrips />,
        },
        {
          path: "/trip",
          element: <Trip />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
