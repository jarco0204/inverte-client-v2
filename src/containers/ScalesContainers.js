import Scale from "../components/Scale";
// Aws Imports
import Amplify from "aws-amplify";
import { AWSIoTProvider } from "@aws-amplify/pubsub/lib/Providers";

// CSS
import "../assets/css/scale.css";

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
Amplify.PubSub.subscribe("ESM/1/ESM-1-F0-7/Pub").subscribe({
    next: (data) => console.log("Message received", data),
    error: (error) => console.error(error),
    close: () => console.log("Done"),
});

/*
    Main Container Function
  */
export default function ScalesContainer() {
    return (
        <div
            style={{
                position: "relative",
                top: "150px",
                left: "150px",
                display: "flex",
                flexDirection: "row",
                gap: "25px",
            }}
        >
            <Scale />
        </div>
    );
}
