/* eslint-disable react/jsx-no-undef */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// routers can't work without wraping main.jsx in Browser router
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { SocketContextProvider } from './context/SocketContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
