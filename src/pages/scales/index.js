// @mui material components
import Grid from "@mui/material/Grid";
import { useState } from "react";

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../components/Navbars/DashboardNavbar";
import Footer from "../../components/Footer";

import Scale from "./components/Scale";

// AWS Imports
import { API } from "aws-amplify";
import { useEffect } from "react";

// GQL Queries
// import { listRestaurants } from "../../graphql/queries";

function Dashboard() {
    const [mainPublishTopic, setMainPublishTopic] = useState(null);

    // Function
    const getRestaurantList = async () => {
        try {
            const myAPI = "inverteScalesAPI";
            const path = "/restaurants/";
            let finalAPIRoute = path + "testID";
            await API.get(myAPI, finalAPIRoute)
                .then((response) => {
                    // console.log("Message correctly received from API V2", JSON.stringify(response));
                    let scalesData = response["scaleData"]["Item"];
                    // console.log(scalesData);
                    setMainPublishTopic(scalesData.mqttPublishTopicRoot);

                    // // Create Combined Dataset to generate ScaleCard Components
                    // let tempAr = [];
                    // for (let i = 0; i < scalesData["mqttPubTopic"].length; i++) {
                    //     tempAr.push([scalesData["mqttPubTopic"][i]]);
                    // }
                    // let subTopic = scalesData["mqttSubTopic"];
                    // // Set state
                    // setScalesData(tempAr);
                    // setSubTopic(subTopic);
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
                            <Scale mainPublishTopic={mainPublishTopic} />
                        </MDBox>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default Dashboard;
