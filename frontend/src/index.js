import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import FormProvider from './context/FormContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FormProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FormProvider>
  </React.StrictMode>
);

