import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App";
import { DarkModeContextProvider } from './context/darkModeContext';
import { AuthContextProvider } from './context/AuthContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <AuthContextProvider>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </AuthContextProvider>
  </>,
)
