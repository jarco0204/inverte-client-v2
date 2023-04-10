import { useState, useEffect } from "react";

import { Buffer } from "buffer";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../components/Navbars/DashboardNavbar";
import Footer from "../../components/Footer";

// AWS Imports
import { API } from "aws-amplify";

// MQTT Client to Publish Messages and Fetch Shadows
import { IoTDataPlaneClient, GetThingShadowCommand } from "@aws-sdk/client-iot-data-plane";

const iotClient = new IoTDataPlaneClient({
    region: "ca-central-1",
    credentials: {
        accessKeyId: "AKIARHM5WBNOIW7X3JJD",
        secretAccessKey: "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",
    },
});

// User-level Imports
import Scale from "./components/Scale";

function ScalesContainer(userSession = console.log) {
    const [scaleArr, setScaleArr] = useState([]);

    // Function
    const getRestaurantList = async () => {
        try {
            const myAPI = "inverteClientAmplifyAPIv1";
            const path = "/restaurants/";
            const finalAPIRoute = path + userSession.userSession.username; //TODO: Cases where userSession is empty
            await API.get(myAPI, finalAPIRoute)
                .then(async (response) => {
                    console.log("Message correctly received from API V2", response.item.Item.mqttTopic);

                    const input = {
                        // GetThingShadowRequest
                        thingName: "P0-08-v2", // required
                        // shadowName: "", // Querying Classic Shadow
                    };
                    const command = new GetThingShadowCommand(input);
                    const response1 = await iotClient.send(command);
                    let payload = JSON.parse(Buffer.from(response1.payload).toString("utf8")); // encoded form of JSON Response

                    console.log(payload.state.reported);
                    const tempAr = [{ topic: response.item.Item.mqttTopic, state: payload.state.reported }]; // NOTE: This should be already an array

                    setScaleArr(tempAr);
                })
                .catch((error) => {
                    console.log("Failed to retrieve from API", error);
                });
        } catch (err) {
            console.log(err);
        }
    };

    // Hook
    useEffect(() => {
        getRestaurantList();
    }, []);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            {scaleArr.map((mainScaleData, i) => (
                                <Scale key={i} mainScaleData={mainScaleData} />
                            ))}
                        </MDBox>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default ScalesContainer;
