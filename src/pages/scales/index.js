import { useState, useEffect } from "react";
import { Buffer } from "buffer";
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// General components
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../components/Navbars/DashboardNavbar";
import Footer from "../../components/Footer";
import Scale from "./components/Scale";

//AWS Imports
import { API } from "aws-amplify";
import { IoTDataPlaneClient, GetThingShadowCommand } from "@aws-sdk/client-iot-data-plane";

// AWS SDK V3 Library HTTP Client to fetch Classic Shadow State
const iotClient = new IoTDataPlaneClient({
    //TODO: Add credentials as environment variables
    region: process.env.REACT_APP_AWS_REGION,
    credentials: {
        accessKeyId: process.env.REACT_APP_IAM_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_IAM_SECRET_KEY,
    },
    //shadowName: classic: null ? namedShadow
});

/*
    Main Route Container that hold array of Scale Components (Scale Card)
*/
function ScalesContainer({ iotThingNames, restaurantName, restaurantLocationNum }) {
    const [scalesMetaArr, setScalesMetaArr] = useState([]); // Array of Scales

    /*
        Fetch the scale(s) metadata and shadows associated with the restaurantID (CognitoID)1
    */
    const getRestaurantList = async () => {
        try {
            const tempScalesMetaArr = [];
            for (let i = 0; i < iotThingNames.length; i++) {
                // Fetch Shadow State Using SDK V3 Library
                const getThingShadowRequestInput = {
                    thingName: iotThingNames[i], // Requesting Classic Shadow as opposed to timeseries one
                };
                const command = new GetThingShadowCommand(getThingShadowRequestInput);

                const tempShadow = await iotClient.send(command);
                const tempPayload = JSON.parse(Buffer.from(tempShadow.payload).toString("utf8")); // encoded form of JSON Response

                // Construct root scale topic
                let scaleRootTopic = restaurantName + "/" + restaurantLocationNum;
                tempScalesMetaArr.push({ topic: scaleRootTopic, state: tempPayload.state.reported, iotNameThing: iotThingNames[i] });
            }
            setScalesMetaArr(tempScalesMetaArr);
        } catch (err) {
            console.log(err);
        }
    };

    /*
        React Hook to fetch essential metadata from Dynamo using Amplify API Call and then from Classic Shadow.
    */
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
                            {scalesMetaArr.map((mainScaleData, i) => (
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

// Default props to start making JS into TS
ScalesContainer.propTypes = {
    userSession: PropTypes.object,
};
ScalesContainer.defaultProps = {
    userSession: {
        username: "test",
    },
};

export default ScalesContainer;
