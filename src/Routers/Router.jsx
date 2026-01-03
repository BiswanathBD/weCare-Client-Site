import { createBrowserRouter } from "react-router";
import Root from "../Components/Root";
import HomePage from "../Pages/HomePage";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import CreateEvent from "../Private/CreateEvent";
import PrivateRoute from "../Private/PrivateRoute";
import UpcomingEvents from "../Pages/UpcomingEvents";
import EventDetails from "../Pages/EventDetails";
import JoinedEvents from "../Private/JoinedEvents";
import ManageEvents from "../Private/ManageEvents";
import EditEvent from "../Pages/EditEvent";
import ErrorPage from "../Pages/ErrorPage";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Dashboard from "../Private/Dashboard";
import DashboardHome from "../Private/DashboardHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage />,
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

      {
        path: "/updateEvent/:id",
        element: (
          <PrivateRoute>
            <EditEvent />
          </PrivateRoute>
        ),
      },

      {
        path: "/about-us",
        element: <About />,
      },
      {
        path: "/contact-us",
        element: <Contact />,
      },
      {
        path: "/about-us",
        element: <About />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "manageEvents",
        element: <ManageEvents />,
      },
      {
        path: "joinedEvent/user/:userEmail",
        element: <JoinedEvents />,
      },
    ],
  },
]);

export default router;
