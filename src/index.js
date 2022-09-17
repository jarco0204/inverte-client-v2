import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

// Backend (Amplify)
import Amplify from "aws-amplify";
import { AWSIoTProvider } from "@aws-amplify/pubsub/lib/Providers";
import awsConfig from "./aws-exports";

// App and root csss
import App from "./App";
import "./assets/css/index.css";

Amplify.configure(awsConfig);
// MQTT Client

Amplify.configure({
    Auth: {
        identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
    },
});
Amplify.addPluggable(
    new AWSIoTProvider({
        aws_pubsub_region: process.env.REACT_APP_REGION,
        aws_pubsub_endpoint: `wss://${String(
            process.env.REACT_APP_MQTT_ID,
        )}.iot.${String(process.env.REACT_APP_REGION)}.amazonaws.com/mqtt`,
    }),
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <App />
    </Router>,
);
