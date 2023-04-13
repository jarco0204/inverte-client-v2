import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

// App and root csss
import App from "./App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "./context";

import { Amplify } from "aws-amplify";
import { AWSIoTProvider } from "@aws-amplify/pubsub"; // MQTT Client to Receive Messages
import awsmobile from "./aws-exports";

Amplify.configure(awsmobile);
Amplify.addPluggable(
    // Amplify Pub/Sub MQTT Client for Scale Container
    new AWSIoTProvider({
        aws_pubsub_region: process.env.REACT_APP_AWS_REGION,
        aws_pubsub_endpoint: "wss://" + process.env.REACT_APP_MQTT_ENDPOINT + ".iot.ca-central-1.amazonaws.com/mqtt",
    })
);
// Amplify.Logger.LOG_LEVEL = "DEBUG";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <MaterialUIControllerProvider>
            <App />
        </MaterialUIControllerProvider>
    </Router>
);
