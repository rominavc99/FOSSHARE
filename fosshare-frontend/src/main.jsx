import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={clientId}>
    <StrictMode>
      <App />
    </StrictMode>
  </GoogleOAuthProvider>
);