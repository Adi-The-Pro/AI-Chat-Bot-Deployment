import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import {createTheme,ThemeProvider} from "@mui/material";
import axios from 'axios';
import {Toaster} from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext.jsx';

const theme = createTheme({
  typography:{
    fontFamily: "Roboto Slab, serif",
    allVariants: {color:"white"},
  },
});
axios.defaults.baseURL = 'http://localhost:5000/api/v1';
axios.defaults.withCredentials = true;
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
          <Toaster position='top-center'/>
          <App />
      </ThemeProvider>
    </BrowserRouter>
  </AuthProvider>
)
