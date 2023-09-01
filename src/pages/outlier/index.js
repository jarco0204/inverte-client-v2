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
        datasets: { label: "Portion Accuracy", data: [], yAxisLabel: "Percent" },
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
const OutlierContainer = ({ iotThingNames, displayIngredient }) => {
    // State of Container
    const [realTimePortionEventsAR, setRealTimePortionEventsAR] = useState([]); //
    const [realTimePortionEventChart, setRealTimePortionEventChart] = useState([]);
    const { weightGraph } = createReportLineChartObject();

    //Use Effects
    useEffect(() => {
        PubSub.subscribe("test/rohan/1/od").subscribe({
            next: (data) => {
                // console.log("Message received", data.value);
                console.log("timestamp is", data.value.timestamp);
                console.log("portion weight is", data.value.portionWeight);
                console.log("portion status is", data.value.portionStatus);
                console.log();
                setRealTimePortionEventChart(weightGraph);
            },
            error: (error) => console.error(error),
            complete: () => console.log("Done"),
        });
    }, []);

    // Display Outlier Page
    return (
        <DashboardLayout>
            <MDBox py={1}>
                <MDBox mt={10}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={10} lg={12}>
                            <MDBox mb={40}>
                                <PortionWeightLineChart color="success" title="Portion Accuracy Classification" chart={realTimePortionEventChart} />
                            </MDBox>
                        </Grid>
                    </Grid>
                </MDBox>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
};

// Handle the props
OutlierContainer.propTypes = {
    iotThingNames: PropTypes.array,
    displayIngredient: PropTypes.string,
};

export default OutlierContainer;
