import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import * as am4core from "@amcharts/amcharts4/core";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

am4core.options.autoDispose = true; //https://github.com/amcharts/amcharts4/issues/2040

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
