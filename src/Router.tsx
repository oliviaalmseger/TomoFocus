import { createBrowserRouter } from "react-router";
import { StartPage } from "./pages/StartPage";
import { TimerSettings } from "./pages/TimerSettings";
import { SessionPage } from "./pages/SessionPage";
import { CompletePage } from "./pages/CompletePage";
import { Layout } from "./pages/Layout";
import { Error } from "./pages/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <StartPage />,
      },
      {
        path: "settings",
        element: <TimerSettings />,
      },
      {
        path: "session",
        element: <SessionPage />,
      },
      {
        path: "complete",
        element: <CompletePage />,
      },
    ],
    errorElement: <Error />,
  },
]);
