import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from './contexts/app.context'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'src/App'
import './index.css'
import { I18nextProvider } from 'react-i18next'
import i18n from 'src/i18n/i18n'
import { GoogleOAuthProvider } from '@react-oauth/google'
import config from './constants/config'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={config.clientId}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </AppProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
)
