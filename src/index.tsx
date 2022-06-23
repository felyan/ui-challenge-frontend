import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/system";
import theme from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>      
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
        </AuthProvider>
        </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);


