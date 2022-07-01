import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userSlice from './redux/slices/userSlice'
import  postSlice from './redux/slices/postSlice'

const store = configureStore({
  reducer: {
    userSlice,
    postSlice,
  },
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
