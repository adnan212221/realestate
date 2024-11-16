import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </PersistGate>
  </Provider>,
)
