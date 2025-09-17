import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Paper from "./pages/Paper";
import Dataset from "./pages/Dataset";
import Graph from "./pages/Graph";
import QA from "./pages/QA";
import Collections from "./pages/Collections";
import "./index.css";

const qc = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "results", element: <Results /> },
      { path: "paper/:uid", element: <Paper /> },
      { path: "dataset/:id", element: <Dataset /> },
      { path: "graph", element: <Graph /> },
      { path: "qa", element: <QA /> },
      { path: "collections", element: <Collections /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
