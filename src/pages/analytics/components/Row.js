import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Plot from "./Plot";
import { CircularProgress } from "@mui/material";
import PropTypes from "prop-types";

// const importPlot = () =>
//     lazy(() =>
//         import("./Plot").catch(() => {
//             import("./NullView");
//         })
//     );
/*
    @description: This component renders the plots that are being passed into the row. It follows the same
    pattern as its parent
    @params: 
        data: the data for each of the plots to be rendered
        requestedDate: date that is being requested
        plotToShow: the data being passed to the component by itself ot display the plots
    @return:
        component <Row> that displays <Plots> based on the data passed by the parent component
    @Comments:
        The data here is processed using the same patterns as by the parent component 
*/
function Row({ data, requestedDate, plotToShow }) {
    const [plots, setPlots] = useState([]);
    const extract_data = (response) => response.data.children.map(({ data }) => data);
    const datum = async () => ({
        data: {
            children: data,
        },
    });
    useEffect(() => {
        async function loadPlots() {
            const plotToShow = await datum("plots data").then(extract_data);
            let unique_keys = [];
            const componentPromises = plotToShow.map(async (data) => {
                let new_unique_key = Math.floor(Math.random() * 100);
                while (unique_keys.includes(new_unique_key)) {
                    new_unique_key = Math.floor(Math.random() * 100);
                }
                unique_keys.push(new_unique_key);
                // const Plot = await importPlot();
                return <Plot {...data} color="info" description="Test" key={new_unique_key} requestedDate={requestedDate} />;
            });
            Promise.all(componentPromises).then(setPlots);
        }
        loadPlots();
    }, [plotToShow]);
    return (
        <Grid container item spacing={5} justifyContent="center">
            <React.Suspense fallback={<CircularProgress />}>{plots}</React.Suspense>
        </Grid>
    );
}

Row.propTypes = {
    data: PropTypes.array,
    requestedDate: PropTypes.string,
    plotToShow: PropTypes.array,
};

export default Row;
