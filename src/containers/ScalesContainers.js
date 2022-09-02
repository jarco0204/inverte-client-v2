import { useEffect, useState } from "react";
import Amplify, { API } from "aws-amplify";
import { AWSIoTProvider } from "@aws-amplify/pubsub/lib/Providers";

import Scale from "../components/Scale";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { setByAmount, addScale } from "../redux/counterScales";
// CSS
import "../assets/css/ScalesContainer.css";

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
    const [scalesData, setScalesData] = useState([]);
    const dispatch = useDispatch()
    useEffect(() => {
        async function callAPI() {
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
                    let scalesData = response["scaleData"]["Item"];
                    
                    // Create Combined Dataset to generate ScaleCard Components
                        let tempAr = [];
                        for (
                            let i = 0;
                            i < scalesData["mqttPubTopic"].length;
                            i++
                            ) {
                                tempAr.push([
                            scalesData["mqttPubTopic"][i],
                            scalesData["scalesType"][i],
                        ]);
                    }

                    // Set state
                    setScalesData(tempAr);
                    // console.log(tempAr)
                    dispatch(setByAmount(tempAr.length))
                    tempAr.forEach(e => {
                        dispatch(addScale(e))
                        
                    })
                    
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            callAPI();
            
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
        
        const scales = useSelector(state => state.scales.scales)
        console.log(scales)
        
        return (
            <div className="scalesContainer">
            {scalesData.map((scaleArr, i) => (
                <Scale key={i} scaleArr={scaleArr} />
                ))}
        </div>
    );
}
