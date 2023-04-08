import { useState, useEffect } from "react";

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
                .then((response) => {
                    console.log("Message correctly received from API V2", response.item.Item.mqttTopic);
                    const tempAr = [response.item.Item.mqttTopic]; // NOTE: This should be already an array
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
                            {scaleArr.map((mainPublishTopic, i) => (
                                <Scale key={i} mainPublishTopic={mainPublishTopic} />
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
