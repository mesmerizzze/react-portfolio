import React from 'react'
import ReactDOM from 'react-dom'
import ErrorBoundary from './hoc/ErrorBoundary'
import { HashRouter } from 'react-router-dom'
import App from './App'

import './index.scss'

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <App />
      </HashRouter>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
)
