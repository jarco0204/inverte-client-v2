import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
// import ComplexStatisticsCard from "../../components/Cards/StatisticsCards/ComplexStatisticsCard";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import MDBox from "../../components/MDBox";
import DashboardNavbar from "../../components/Navbars/DashboardNavbar";
import ReportsBarChart from "../../components/Charts/BarCharts/ReportsBarChart";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Footer from "../../components/Footer";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

// import MDTypography from "../../components/MDTypography";
// import { scale } from "chroma-js";

function AnalyticsDashboard() {
    const [requestedDate, setRequestedDate] = useState(dayjs());
    const [requestedEndDate, setRequestedEndDate] = useState(requestedDate);

    const [analyticsMode, setAnalyticsMode] = useState("past"); // Other value is past

    const handleRadioChange = (e) => {
        if (e.target.value === "real-time") {
            setAnalyticsMode("real-time");
        } else {
            setAnalyticsMode("past");
        }
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DashboardLayout>
                <DashboardNavbar />
                <MDBox mt={6}>
                    <Grid container justifyContent="center" spacing={5}>
                        <FormControl>
                            <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" defaultValue="past" onChange={handleRadioChange}>
                                <FormControlLabel value="past" control={<Radio />} label="Past" />
                                <FormControlLabel value="real-time" control={<Radio />} label="Real-time (V2)" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid container justifyContent="center" spacing={-1}>
                        {analyticsMode === "past" && (
                            <>
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
                            </>
                        )}
                    </Grid>
                </MDBox>
                <MDBox mt={4.5}>
                    <Grid container justifyContent="center" spacing={5}>
                        {analyticsMode === "past" && (
                            <>
                                <Grid item xs={12} md={6} lg={4}>
                                    <MDBox mb={3}>
                                        <ReportsBarChart
                                            color="success"
                                            title="Inventory Levels"
                                            description="Business Intelligence"
                                            date={requestedDate.toString()}
                                            chart={{
                                                labels: ["M", "T", "W", "TR", "F", "S", "S"],
                                                datasets: { label: "Mobile apps", data: [500, 800, 1200, 1500, 2500, 2400, 1250, 230, 500] },
                                            }}
                                        />
                                    </MDBox>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <MDBox mb={3}>
                                        <ReportsBarChart
                                            color="secondary"
                                            title="Portions Completed"
                                            description="Business Intelligence"
                                            date={requestedDate.toString()}
                                            chart={{
                                                labels: ["M", "T", "W", "TR", "F", "S", "S"],
                                                datasets: { label: "Mobile apps", data: [500, 800, 1200, 1500, 2500, 2400, 1250, 230, 500] },
                                            }}
                                        />
                                    </MDBox>
                                </Grid>
                            </>
                        )}
                        {analyticsMode === "real-time" && (
                            <>
                                <Grid item xs={12} md={6} lg={4}>
                                    <MDBox mb={3}>
                                        <ReportsBarChart
                                            color="success"
                                            title="Inventory Weight"
                                            description="Business Intelligence"
                                            date={requestedDate.toString()}
                                            chart={{
                                                labels: ["M", "T", "W", "TR", "F", "S", "S"],
                                                datasets: { label: "Mobile apps", data: [500, 800, 1200, 1500, 2500, 2400, 1250, 230, 500] },
                                            }}
                                        />
                                    </MDBox>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <MDBox mb={3}>
                                        <ReportsBarChart
                                            color="secondary"
                                            title="Temperature"
                                            description="Business Intelligence"
                                            date={requestedDate.toString()}
                                            chart={{
                                                labels: ["M", "T", "W", "TR", "F", "S", "S"],
                                                datasets: { label: "Mobile apps", data: [500, 800, 1200, 1500, 2500, 2400, 1250, 230, 500] },
                                            }}
                                        />
                                    </MDBox>
                                </Grid>
                            </>
                        )}
                    </Grid>
                </MDBox>
                <MDBox mt={4.5}>
                    {analyticsMode === "past" && (
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={4}>
                                <MDBox mb={3}>
                                    <ReportsBarChart
                                        color="primary"
                                        title="Under Serving Portions"
                                        description="Describing"
                                        date={requestedDate.toString()}
                                        chart={{
                                            labels: ["M", "T", "W", "TR", "F", "S", "S"],
                                            datasets: { label: "Mobile apps", data: [500, 800, 1200, 1500, 2500, 2400, 1250, 230, 500] },
                                        }}
                                    />
                                </MDBox>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <MDBox mb={3}>
                                    <ReportsBarChart
                                        color="info"
                                        title="Accurate Portions"
                                        description="Describing"
                                        date={requestedDate.toString()}
                                        chart={{
                                            labels: ["M", "T", "W", "TR", "F", "S", "S"],
                                            datasets: { label: "Mobile apps", data: [500, 800, 1200, 1500, 2500, 2400, 1250, 230, 500] },
                                        }}
                                    />
                                </MDBox>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <MDBox mb={3}>
                                    <ReportsBarChart
                                        color="warning"
                                        title="Over serving Portions"
                                        description="Describing"
                                        date={requestedDate.toString()}
                                        chart={{
                                            labels: ["M", "T", "W", "TR", "F", "S", "S"],
                                            datasets: { label: "Mobile apps", data: [500, 800, 1200, 1500, 2500, 2400, 1250, 230, 500] },
                                        }}
                                    />
                                </MDBox>
                            </Grid>
                        </Grid>
                    )}
                </MDBox>
                <Footer />
            </DashboardLayout>
        </LocalizationProvider>
    );
}

export default AnalyticsDashboard;
