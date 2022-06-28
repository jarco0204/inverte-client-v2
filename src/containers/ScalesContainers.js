import { useEffect, useState } from "react";
import Amplify, { API } from "aws-amplify";
import { AWSIoTProvider } from "@aws-amplify/pubsub/lib/Providers";

import Scale from "../components/Scale";

// CSS
import "../assets/css/scale.css";

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

// API
const myAPI = "inverteAPIClientV2";
const path = "/restaurant/";

/*
    Main Container Function
  */
export default function ScalesContainer({ auth, username }) {
    const [publishRoutes, setPublishRoutes] = useState([]);

    useEffect(() => {
        async function callAPI(scalesData) {
            // Calling the API
            console.log("I fire API call once");
            let finalAPIRoute = path + username;
            await API.get(myAPI, finalAPIRoute)
                .then((response) => {
                    // Show the message received
                    console.log(
                        "Message correctly received from API",
                        JSON.stringify(response),
                    );
                    scalesData = response["scaleData"]["Item"];

                    // Publish
                    setPublishRoutes(scalesData["mqttPubTopic"]);
                    // console.log(publishRoutes);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        let scalesData;
        callAPI(scalesData);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            {publishRoutes.map((publishRoute, i) => (
                <Scale key={i} pub={publishRoute} />
            ))}
        </div>
    );
}
