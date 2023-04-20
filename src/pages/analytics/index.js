import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../components/Navbars/DashboardNavbar";
import Footer from "../../components/Footer";
import MDBox from "../../components/MDBox";
import subtopic from "./data/TestData";
import Grid from "@mui/material/Grid";
import Row from "./components/Row";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

// const importView = () =>
//     lazy(() =>
//         import(`./components/Row`).catch(() => {
//             import(`./components/NullView`);
//         })
//     );

function AnalyticsDashboard({ rows_to_display = 3, number_of_plots = 3, rowToShow }) {
    /*
    @description: This component creates the rows that display the plots
    @params: rows_to_display: specifies how many rows of plots you want to display
            number_of_plots: specifies how many plots per row you want to display
            rowToShow: the data being passed for the component display the plots
    @return:
            A nested components of rows

    @Comments
        The utility of refined_data is to separate the incoming data into rows_to_display Arrays
        of number_of_plots Plots. E.g: rows_to_display = 3, number_of_plots=3 and data.length==7 then:
        refined_data will create an array of 3 arrays that will be of length 2,3 and 2 respectively.
        The first row will always only have 2 plots for emphasis of that data.
    */
    const [requestedDate, setRequestedDate] = useState(dayjs());
    const [requestedEndDate, setRequestedEndDate] = useState(requestedDate);

    const [rows, setRows] = useState([]);
    const extract_data = (response) => response.data.children.map((response) => response);
    // const unique_keys = []

    const refined_data = () =>
        Array.from(
            {
                length: rows_to_display,
            },
            (_, i) => {
                return i == 0 ? subtopic.data.children.splice(0, 2) : subtopic.data.children.splice(0, number_of_plots);
            }
        );
    const midle_man = refined_data();
    const modified_subtopic = async () => ({
        data: {
            children: [...midle_man],
        },
    });
    useEffect(() => {
        async function loadRows() {
            const rowToShow = await modified_subtopic("rows data").then(extract_data);
            let unique_keys = [];
            const componentPromises = rowToShow.map(async (data) => {
                let new_unique_key = Math.floor(Math.random() * 100);
                while (unique_keys.includes(new_unique_key)) {
                    new_unique_key = Math.floor(Math.random() * 100);
                }
                unique_keys.push(new_unique_key);
                // const Row = await importView();
                return <Row data={data} key={new_unique_key} requestedDate={requestedDate} />;
            });
            Promise.all(componentPromises).then(setRows);
        }
        loadRows();
    }, [rowToShow]);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DashboardLayout>
                <DashboardNavbar />
                <MDBox mt={4.5}>
                    <Grid container justifyContent="center">
                        <DateTimePicker
                            disableFuture
                            label="Start Date"
                            openTo="day"
                            views={["year", "month", "day", "hours"]}
                            value={requestedDate}
                            onChange={(newDate) => {
                                setRequestedDate(newDate);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DateTimePicker
                            disableFuture
                            label="End Date"
                            openTo="day"
                            minDate={requestedDate}
                            views={["year", "month", "day", "hours"]}
                            value={requestedDate}
                            onChange={(newValue) => {
                                setRequestedEndDate(newValue);
                                console.log(requestedEndDate);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <MDBox mt={6} mb={3}>
                        <Grid container spacing={number_of_plots} direction="column" justifyContent="space-between">
                            {rows}
                        </Grid>
                    </MDBox>
                </MDBox>
                <Footer />
            </DashboardLayout>
        </LocalizationProvider>
    );
}

AnalyticsDashboard.propTypes = {
    rows_to_display: PropTypes.number,
    number_of_plots: PropTypes.number,
    rowToShow: PropTypes.array,
};

export default AnalyticsDashboard;
