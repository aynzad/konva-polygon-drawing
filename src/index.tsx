import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'

import App from './App'
import reportWebVitals from './reportWebVitals'
import { store } from './store'
import theme from './theme'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
