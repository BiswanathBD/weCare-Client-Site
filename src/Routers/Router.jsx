import { createBrowserRouter } from "react-router";
import Root from "../Components/Root";
import HomePage from "../Pages/HomePage";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import CreateEvent from "../Private/CreateEvent";
import PrivateRoute from "../Private/PrivateRoute";
import UpcomingEvents from "../Pages/UpcomingEvents";
import EventDetails from "../Pages/EventDetails";

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
        path: "/upcomingEvents",
        element: <UpcomingEvents />,
      },
      {
        path: "/eventDetails/:id",
        element: <EventDetails />,
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
        element: (
          <PrivateRoute>
            <CreateEvent />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
