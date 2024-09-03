import React from 'react';
import './index.css';
import App from './App';
import axios from 'axios';
import * as am4core from '@amcharts/amcharts4/core';
import { createRoot } from 'react-dom/client';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

am4core.options.autoDispose = true; //https://github.com/amcharts/amcharts4/issues/2040

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
