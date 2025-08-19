import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Ensure title is set correctly
if (typeof document !== 'undefined') {
  document.title = 'Sentify - Advanced Sentiment Analysis';
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
