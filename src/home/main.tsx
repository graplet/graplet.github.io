import React from 'react'
import ReactDOM from 'react-dom/client'
import '../index.css'
import { HomePage } from './App.tsx'
import { ThemeProvider } from '../scripts/models/themeprovider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  </React.StrictMode>,
)
