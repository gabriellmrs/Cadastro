import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";//rota
import "./index.css";
import Home from "./pages/Home";
import App from "./App";
import Consultar from "./pages/Consultar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "cadastrar",
        element: <Home />
      },
      {
        path: "consultar",
        element: <Consultar />
      }
    ]
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
