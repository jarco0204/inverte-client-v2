import React from "react";
import MDBox from "../../../components/MDBox";
import ReportsBarChart from "../../../components/Charts/BarCharts/ReportsBarChart";
import { Grid } from "@mui/material";
import { CircularProgress } from "@mui/material";

/*
    @description: Plots that display data
    @params:
        name: name of the plot
        color: color of the plot
        description: brief explanation of the data shown
        requestedDate: date from which the data is being extracted
        labels: Labels of the dataset
        datasets: data to be displayed
    @return:
        <Plot> component
    @Comments
        From them all, the easiest component to look at
*/
function Plot({ name, color, description, requestedDate, labels, datasets }) {
    const data = {
        labels: labels,
        datasets: { ...datasets },
    };
    return (
        <Grid item xs={12} md={6} lg={4}>
            <React.Suspense fallback={<CircularProgress />}>
                <MDBox mb={3}>
                    <ReportsBarChart 
                        color={color} 
                        title={name} 
                        description={description} 
                        date={requestedDate.toString()} 
                        chart={data} />
                </MDBox>
            </React.Suspense>
        </Grid>
    );
}

export default Plot;
