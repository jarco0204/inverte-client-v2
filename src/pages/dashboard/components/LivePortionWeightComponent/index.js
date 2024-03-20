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
    };
};

/*!
   @description:
   @params:
   @return:
   @Comments
   @Coders: Fu€g0001
*/
const LivePortionWeightComponent = ({ clientRestaurantLocationNum, clientRestaurantName, timeZone }) => {
    // Portion Sequence UseState
    console.log("clientRestaurantLocationNum is", clientRestaurantLocationNum);
    const [realTimeStampAR, setRealTimeStampAR] = useState([]);
    const [realTimePortionWeightAR, setRealTimePortionWeightAR] = useState([]);

    // Chart Variable
    const realTimePortionEventChartObject = createReportLineChartObject();
    const [realTimePortionEventChart, setRealTimePortionEventChart] = useState([]);

    //Use Effects
    useEffect(() => {
        const finalTopicRoute = clientRestaurantName + "/" + clientRestaurantLocationNum + "/weight";
        console.log("finalTopicRouter is", finalTopicRoute);
        const subs = PubSub.subscribe(finalTopicRoute).subscribe({
            next: (data) => {
                data.value.timestamp = dayjs
                    .unix(data.value.timestamp / 1000)
                    .tz(timeZone)
                    .format("MM-DD HH:mm");

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
