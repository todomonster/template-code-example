import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import "./i18nTest/i18n.js";
import TestTranslation from "./i18nTest/testTranslation.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TestTranslation />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
