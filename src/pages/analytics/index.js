import Grid from "@mui/material/Grid"
import dayjs, { Dayjs } from 'dayjs';
import ComplexStatisticsCard from "../../components/Cards/StatisticsCards/ComplexStatisticsCard";
import { TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import MDBox from "../../components/MDBox";
import DashboardNavbar from "../../components/Navbars/DashboardNavbar";
import ReportsBarChart from "../../components/Charts/BarCharts/ReportsBarChart";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Footer from "../../components/Footer";

function AnalyticsDashboard() {
    const [requestedDate, setRequestedDate] = useState(dayjs())
    const [requestedEndDate, setRequestedEndDate] = useState(requestedDate)
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DashboardLayout>
                <DashboardNavbar />
                <MDBox mt={6}>
                    <Grid container justifyContent="center" spacing={5}>
                        <Grid item>
                            <DateTimePicker 
                                disableFuture
                                label="Start Date"
                                openTo="day"
                                views={['year','month','day','hours']}
                                value={requestedDate}
                                onChange={(newDate) => {
                                    setRequestedDate(newDate);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                                />
                        </Grid>
                        <Grid item>
                            <DateTimePicker 
                                disableFuture
                                label="End Date"
                                openTo="day"
                                minDate={requestedDate}
                                views={['year','month','day','hours']}
                                value={requestedDate}
                                onChange={(newValue) => {
                                    setRequestedEndDate(newValue);
                                }}
                                
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                    </Grid>
                </MDBox>
                <MDBox mt={4.5}>
                    <Grid container justifyContent="center" spacing={5}>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                    <ReportsBarChart 
                                        color="success" 
                                        title="Graph 1" 
                                        description="Describing" 
                                        date={requestedDate.toString()}
                                        chart={{
                                            labels: ["M", "T", "W", "TR", "F", "S", "S"],
                                            datasets: { label: "Mobile apps", data: [500, 800, 1200, 1500, 2500, 2400, 1250, 230, 500] }
                                            }}
                                    />

                                </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                    <ReportsBarChart 
                                        color="secondary" 
                                        title="Placeholder" 
                                        description="Describing" 
                                        date={requestedDate.toString()}
                                        chart={{
                                            labels: ["M", "T", "W", "TR", "F", "S", "S"],
                                            datasets: { label: "Mobile apps", data: [500, 800, 1200, 1500, 2500, 2400, 1250, 230, 500] }
                                        }}
                                    />

                            </MDBox>
                        </Grid>
                    </Grid>
                </MDBox>
                <MDBox mt={4.5}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsBarChart 
                                    color="primary" 
                                    title="Placeholder" 
                                    description="Describing" 
                                    date={requestedDate.toString()}
                                    chart={{
                                        labels: ["M", "T", "W", "TR", "F", "S", "S"],
                                        datasets: { label: "Mobile apps", data: [500, 800, 1200, 1500, 2500, 2400, 1250, 230, 500] }
                                        }}
                                />

                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsBarChart 
                                    color="info" 
                                    title="Placeholder" 
                                    description="Describing" 
                                    date={requestedDate.toString()}
                                    chart={{
                                        labels: ["M", "T", "W", "TR", "F", "S", "S"],
                                        datasets: { label: "Mobile apps", data: [500, 800, 1200, 1500, 2500, 2400, 1250, 230, 500] }
                                        }}
                                        />

                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsBarChart 
                                    color="warning" 
                                    title="Placeholder" 
                                    description="Describing" 
                                    date={requestedDate.toString()}
                                    chart={{
                                        labels: ["M", "T", "W", "TR", "F", "S", "S"],
                                        datasets: { label: "Mobile apps", data: [500, 800, 1200, 1500, 2500, 2400, 1250, 230, 500] }
                                        }}
                                />

                            </MDBox>
                        </Grid>
                    </Grid>
                </MDBox>
                <MDBox mt={4.5}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsBarChart 
                                    color="error" 
                                    title="Placeholder" 
                                    description="Describing" 
                                    date={requestedDate.toString()}
                                    chart={{
                                        labels: ["M", "T", "W", "TR", "F", "S", "S"],
                                        datasets: { label: "Mobile apps", data: [500, 800, 1200, 1500, 2500, 2400, 1250, 230, 500] }
                                    }}
                                />

                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsBarChart 
                                    color="dark" 
                                    title="Placeholder" 
                                    description="Describing" 
                                    date={requestedDate.toString()}
                                    chart={{
                                        labels: ["M", "T", "W", "TR", "F", "S", "S"],
                                        datasets: { label: "Mobile apps", data: [500, 800, 1200, 1500, 2500, 2400, 1250, 230, 500] }
                                        }}
                                />

                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsBarChart 
                                    color="light" 
                                    title="Placeholder" 
                                    description="Describing" 
                                    date={requestedDate.toString()}
                                    chart={{
                                        labels: ["M", "T", "W", "TR", "F", "S", "S"],
                                        datasets: { label: "Mobile apps", data: [500, 800, 1200, 1500, 2500, 2400, 1250, 230, 500] }
                                        }}
                                        />

                            </MDBox>
                        </Grid>
                    </Grid>
                </MDBox>
                <Footer />
            </DashboardLayout>
        </LocalizationProvider>
    );
}

export default AnalyticsDashboard;
