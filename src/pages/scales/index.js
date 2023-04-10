import { useState, useEffect } from "react";

import { Buffer } from "buffer";
import PropTypes from "prop-types";

import { Amplify, API } from "aws-amplify";
import { IoTDataPlaneClient, GetThingShadowCommand } from "@aws-sdk/client-iot-data-plane";

// @mui material components
import Grid from "@mui/material/Grid";

// General components
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../components/Navbars/DashboardNavbar";
import Footer from "../../components/Footer";

// User-level Imports
import Scale from "./components/Scale";

// MQTT Client to Receive Messages
import { AWSIoTProvider } from "@aws-amplify/pubsub";
Amplify.addPluggable(
    new AWSIoTProvider({
        aws_pubsub_region: "ca-central-1",
        aws_pubsub_endpoint: "wss://a33ho10nah991e-ats.iot.ca-central-1.amazonaws.com/mqtt",
    })
);

// Fetch Shadow State Using SDK V3 Library (no shadowName)
const iotClient = new IoTDataPlaneClient({
    //TODO: Add credentials as environment variables
    region: "ca-central-1",
    credentials: {
        accessKeyId: "AKIARHM5WBNOIW7X3JJD",
        secretAccessKey: "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",
    },
});

/*
    Main Function Component to hold Scale Cards
*/
function ScalesContainer({ userSession }) {
    const [scalesMetaArr, setScalesMetaArr] = useState([]); // Array of objects

    /*
        Fetch the scale(s) metadata and shadows associated with the restaurantID (CognitoID)
    */
    const getRestaurantList = async () => {
        try {
            const myAPI = "inverteClientAmplifyAPIv1";
            const path = "/restaurants/";
            const finalAPIRoute = path + userSession.username; //TODO: Cases where userSession is empty
            await API.get(myAPI, finalAPIRoute)
                .then(async (response) => {
                    console.log("Message correctly received from API V2", response); // Debug Statement
                    response = response.item.Item; // Simplify payload

                    for (let i = 0; i < response.iotThingNames.length; i++) {
                        // Fetch Shadow State Using SDK V3 Library

                        const getThingShadowRequestInput = {
                            thingName: response.iotThingNames[i],
                        };
                        const command = new GetThingShadowCommand(getThingShadowRequestInput);

                        const tempShadow = await iotClient.send(command);
                        const tempPayload = JSON.parse(Buffer.from(tempShadow.payload).toString("utf8")); // encoded form of JSON Response

                        setScalesMetaArr([...scalesMetaArr, { topic: response.mqttTopics, state: tempPayload.state.reported }]);
                    }
                })
                .catch((error) => {
                    console.log("Failed to retrieve from API or get shadow", error);
                    //TODO: Handle What to show when this happens
                });
        } catch (err) {
            console.log(err);
        }
    };

    // UseEffect Hook to fetch essential metadata
    useEffect(() => {
        setScalesMetaArr([]); // BUG: When modifying this file, react keeps adding arrays
        getRestaurantList();
    }, []);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            {scalesMetaArr.map((mainScaleData, i) => (
                                <Scale key={i} mainScaleData={mainScaleData} iotClient={iotClient} />
                            ))}
                        </MDBox>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

ScalesContainer.propTypes = {
    userSession: PropTypes.object,
};
ScalesContainer.defaultProps = {
    userSession: {
        username: "test",
    },
};

export default ScalesContainer;
