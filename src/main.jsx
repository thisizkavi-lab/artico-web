import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './web/ArticoApp'
import { LanguageProvider } from './web/Language'
import './styles.css'
import './web/artico.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider><App /></LanguageProvider>
  </React.StrictMode>,
)
