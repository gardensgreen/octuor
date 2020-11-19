import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import Root from "./Root";
import configureStore from "./store";
import fetch, { restoreCSRF } from "./store/csrf";

import * as sessionActions from "./store/session";
import { ModalProvider } from "./context/Modal";

const store = configureStore();

//Exposing store to the window if app is not in production.
if (process.env.NODE_ENV !== "production") {
    window.store = store;
}

if (process.env.NODE_ENV !== "production") {
    restoreCSRF();

    window.csrfFetch = fetch;
    window.store = store;
    window.sessionActions = sessionActions;
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ModalProvider>
                <BrowserRouter>
                    <Root />
                </BrowserRouter>
            </ModalProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
