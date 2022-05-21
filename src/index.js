import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Amplify from "aws-amplify";
import config from "./config";

Amplify.configure({
    Auth: {
        mandatorySignId: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
