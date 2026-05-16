import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary fallbackRender={({error}) => <div style={{padding: 40, color: 'red', background: 'white'}}><h1>Global Error</h1><pre>{error.message}</pre><pre>{error.stack}</pre></div>}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
