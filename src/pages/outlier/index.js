// Main Libraries
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Chart from "chart.js/auto";

// MUI Imports
import Grid from "@mui/material/Grid";

// User Components
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import Footer from "../../components/Footer";
import MDBox from "../../components/MDBox";
import PortionWeightLineChart from "./components/PortionWeightLineChart";

// Data Structures
import Queue from "./QueueStructure";

// Backend
import { PubSub } from "aws-amplify";

/*!
   @description: Helper function ton create an object to store the portion event data.
   @params:
   @return:
   @Comments
   @Coders: Wat€r1110
*/
const createReportLineChartObject = () => {
    return {
        labels: [],
        datasets: { label: "Portion Weight", data: [], yAxisLabel: "Portion Weight" },
        pointBackgroundColorAr: [],
    };
};

/*!
   @description:
   @params:
   @return:
   @Comments
   @Coders: Fu€g0001
*/
const OutlierContainer = () => {
    // Portion Sequence UseState
    const [realTimePortionWeightAR, setRealTimePortionWeightAR] = useState([]);
    const [realTimeStampAR, setRealTimeStampAR] = useState([]);

    // Chart Variable
    const realTimePortionEventChartObject = createReportLineChartObject();
    const [realTimePortionEventChart, setRealTimePortionEventChart] = useState([]);

    //Use Effects
    useEffect(() => {
        console.log("Subscribing to updates....");
        const subs = PubSub.subscribe("test/johan/1/weight").subscribe({
            next: (data) => {
                console.log("Outlier Data Point Received....");
                console.log("portion weight is..", data.value.portionWeight);
                console.log("portion status is..", data.value.portionStatus);
                console.log("timestamp is", data.value.timestamp);

                setRealTimePortionWeightAR((prevData) => {
                    const updatedData = [...prevData, data.value.portionWeight].slice(-10);
                    realTimePortionEventChartObject.datasets.data = updatedData;
                    return updatedData;
                });

                setRealTimeStampAR((prevData) => {
                    const updatedData = [...prevData, data.value.timestamp].slice(-10);
                    realTimePortionEventChartObject.labels = updatedData;
                    return updatedData;
                });

                console.log();
                setRealTimePortionEventChart(realTimePortionEventChartObject);
                return () => {
                    subs.unsubscribe();
                };
            },
            error: (error) => console.error(error),
            complete: () => console.log("Done"),
        });
    }, []);

    // Display Outlier Page
    return (
        // <DashboardLayout>
        // <MDBox py={1}>
        // <MDBox mt={10}>
        <Grid container py={4} spacing={4}>
            <Grid item xs={12} md={10} lg={12}>
                <MDBox mb={5}>
                    <PortionWeightLineChart color="success" title="Live Portion Weight of Ingredient" chart={realTimePortionEventChart} />
                </MDBox>
            </Grid>
        </Grid>
        // </MDBox>
        // </MDBox>
        // <Footer />
        // </DashboardLayout>
    );
};

// Handle the props
OutlierContainer.propTypes = {};

export default OutlierContainer;
