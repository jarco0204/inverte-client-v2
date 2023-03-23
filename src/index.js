import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

// App and root csss
import App from "./App";
// import "./assets/css/index.css";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "./context";

import { Amplify } from "aws-amplify";
import awsmobile from "./aws-exports";

Amplify.configure(awsmobile);
Amplify.Logger.LOG_LEVEL = "DEBUG";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <MaterialUIControllerProvider>
            <App />
        </MaterialUIControllerProvider>
    </Router>
);
