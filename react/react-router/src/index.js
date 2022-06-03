import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Main from "./pages/routerTest/main";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <Main />
  </React.StrictMode>
);
