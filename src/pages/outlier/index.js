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
const OutlierContainer = () => {
    // const queue2 = new Queue();

    // State of Container
    const [realTimePortionWeightNum, setRealTimePortionWeightNum] = useState(0); //
    const queue1 = new Queue();
    const queue3 = new Queue();

    // const [realTimePortionTimestampQueue, setRealTimePortionTimestampQueue] = useState([]); //

    const [realTimePortionEventChart, setRealTimePortionEventChart] = useState([]);

    const realTimePortionWeightGraph = createReportLineChartObject();

    //Use Effects
    useEffect(() => {
        const subs = PubSub.subscribe("test/rohan/1/od").subscribe({
            next: (data) => {
                console.log("Outlier Data Point Received....");
                console.log("portion weight is..", data.value.portionWeight);
                console.log("portion status is..", data.value.portionStatus);
                console.log("timestamp is", data.value.timestamp);

                // Enqueue New Measurements
                queue1.enqueue(data.value.portionWeight);
                // queue2.enqueue(data.value.portionStatus);
                queue3.enqueue(data.value.timestamp);

                // realTimePortionWeightQueue.printQueue();
                realTimePortionWeightGraph.labels = queue3.getMySequence();
                realTimePortionWeightGraph.datasets.data = queue1.getMySequence();

                setRealTimePortionEventChart(realTimePortionWeightGraph);
                console.log();
                setRealTimePortionWeightNum(data.value.portionWeight);

                // subs.unsubscribe();
            },
            error: (error) => console.error(error),
            complete: () => console.log("Done"),
        });
    }, [realTimePortionWeightNum]);

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
OutlierContainer.propTypes = {};

export default OutlierContainer;
