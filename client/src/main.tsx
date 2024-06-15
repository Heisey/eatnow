
import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Router from 'react-router-dom'

import App from './App'

import AuthProvider from '@/components/providers/Auth'
import QueryProvider from '@/components/providers/Query'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Router.BrowserRouter>
        <QueryProvider>
          <App />
        </QueryProvider>
      </Router.BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
