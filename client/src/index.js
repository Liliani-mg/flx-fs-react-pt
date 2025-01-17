import reportWebVitals from "./reportWebVitals";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ModalProvider } from "./contexts/ModalContext";
import { SearchProvider } from "./contexts/SearchContext";

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
