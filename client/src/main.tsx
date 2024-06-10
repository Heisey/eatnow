
import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Router from 'react-router-dom'
import * as QueryTools from '@tanstack/react-query-devtools'

import App from './App'

import AuthProvider from '@/components/providers/Auth'
import QueryProvider from '@/components/providers/Query'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router.BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
          {/* <QueryTools.ReactQueryDevtools /> */}
      </QueryProvider>
    </Router.BrowserRouter>
  </React.StrictMode>,
)
