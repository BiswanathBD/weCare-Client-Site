import { createBrowserRouter } from "react-router";
import Root from "../Components/Root";
import HomePage from "../Pages/HomePage";
import UpcomingEvent from "../Pages/UpcomingEvent";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import CreateEvent from "../Pages/CreateEvent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/upcomingEvent",
        element: <UpcomingEvent />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/createEvent",
        element: <CreateEvent />,
      },
    ],
  },
]);

export default router;
