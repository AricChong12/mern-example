//import libs
import * as React from "react";
import * as ReactDOM from "react-dom/client";

//import libs
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//imports custom modules and styling files
import App from "./App";
import Record from "./components/Record";
import RecordList from "./components/RecordList";
import "./index.css";

// Create browser router (defines all routes in your app)
const router = createBrowserRouter([
  {
    // Root route "/"
    path: "/",
    element: <App />, 
    // Layout component (shared UI like navbar/footer)

    // Nested routes inside App
    children: [
      {
        path: "/", 
        // Home page
        element: <RecordList />,
        // Shows list of records
      },
    ],
  },
  {
    // Edit page route with dynamic ID
    path: "/edit/:id",
    // same layout wrapper
    element: <App />,
    children: [
      {
        path: "/edit/:id",
        // edit specific record by ID
        element: <Record />,
      },
    ],
  },
  {
    // Create new record route
    path: "/create",
    // same layout wrapper
    element: <App />,
    children: [
      {
        path: "/create",
        // form for creating new record
        element: <Record />,
      },
    ],
  },
]);

// Render React app into DOM
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     {/* Provide router to entire app */}
    <RouterProvider router={router} />
  </React.StrictMode>
);