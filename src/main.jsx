import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './web/ArticoWeb'
import './styles.css'
import './web/artico.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
