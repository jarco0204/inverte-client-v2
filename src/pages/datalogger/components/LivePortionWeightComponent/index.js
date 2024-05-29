// Main Libraries
import dayjs from "dayjs";
import Chart from "chart.js/auto";
import PropTypes from "prop-types";
import { PubSub } from "aws-amplify";
import React, { useEffect, useState } from "react";

// MUI Imports
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";

// User Components
import Queue from "./QueueStructure";
import MDBox from "../../../../components/MDBox";
import PortionWeightLineChart from "./components/PortionWeightLineChart";
import { color } from "chart.js/helpers";

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
        datasets: { label: "Portion Weight", data: [], yAxisLabel: "Portion Weight", color: [] },
    };
};

/*!
   @description:
   @params:
   @return:
   @Comments
   @Coders: Fu€g0001
*/
const LivePortionWeightComponent = ({ clientRestaurantLocationNum, clientRestaurantName, timeZone, unitOfMass }) => {
    // Portion Sequence UseState
    console.log("clientRestaurantName is", clientRestaurantName);
    const [realTimeStampAR, setRealTimeStampAR] = useState([]);
    const [realTimePortionWeightAR, setRealTimePortionWeightAR] = useState([]);

    // Chart Variable
    const realTimePortionEventChartObject = createReportLineChartObject();
    const [realTimePortionEventChart, setRealTimePortionEventChart] = useState([]);

    //Use Effects
    useEffect(() => {
        const finalTopicRoute = "Inverte/1/1/dataLogger";
        console.log("finalTopicRouter is", finalTopicRoute);
        let updatedData = [];
        let colorArray = [];
        const subs = PubSub.subscribe(finalTopicRoute).subscribe({
            next: (data) => {
                console.log("The data for real chart is:", data);
                data.value.timestamp = dayjs
                    .unix(data.value.timestamp / 1000)
                    .tz(timeZone)
                    .format("MM-DD HH:mm");

                setRealTimePortionWeightAR((prevData) => {
                    updatedData = [...prevData, data.value.currentWR].slice(-10);
                    colorArray = [...colorArray, "rgba(255, 0, 250, .75)"].slice(-10);

                    realTimePortionEventChartObject.datasets.data = updatedData;
                    realTimePortionEventChartObject.datasets.color = colorArray;

                    return updatedData;
                });

                setRealTimeStampAR((prevData) => {
                    const updatedData = [...prevData, data.value.timestamp].slice(-10);
                    realTimePortionEventChartObject.labels = updatedData;
                    return updatedData;
                });
                setRealTimePortionEventChart(realTimePortionEventChartObject);
            },
            error: (error) => console.error(error),
            complete: () => console.log("Done"),
        });
    }, []);

    // Display Portion Weight Line Chart
    return (
        <Grid container py={1} spacing={4}>
            <Grid item xs={12} md={10} lg={12}>
                <MDBox mb={5}>
                    <PortionWeightLineChart color="success" title="Live Portion Weight" chart={realTimePortionEventChart} />
                </MDBox>
            </Grid>
        </Grid>
    );
};

// TODO: Handle the props
LivePortionWeightComponent.propTypes = {};

export default LivePortionWeightComponent;
