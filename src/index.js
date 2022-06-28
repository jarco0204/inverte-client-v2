import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

// Backend (Amplify)
import Amplify from "aws-amplify";
import awsConfig from "./aws-exports";

// App and root csss
import App from "./App";
import "./assets/css/index.css";

Amplify.configure(awsConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <App />
    </Router>,
);
