import { useEffect, useState } from "react";
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";
//eslint-disable-next-line
import Chart from "chart.js/auto";

// Material Dashboard 2 React example components
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../components/Navbars/DashboardNavbar";
import Footer from "../../components/Footer";
import ReportsBarChart from "../../components/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "../../components/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "../../components/Cards/StatisticsCards/ComplexStatisticsCard";
import PanToolIcon from "@mui/icons-material/PanTool";
import PrecisionManufacturingRoundedIcon from "@mui/icons-material/PrecisionManufacturingRounded";
import ScaleRoundedIcon from "@mui/icons-material/ScaleRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";

// Data
import reportsBarChartData from "./data/reportsBarChartData";
import reportsLineChartData from "./data/reportsLineChartData";

import { API } from "aws-amplify";

import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear.js";
dayjs.extend(dayOfYear);

// Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function Dashboard(userSession = console.log) {
    const { sales, tasks } = reportsLineChartData;
    const [items, setItems] = useState([]);
    const [scaleIDs, setScalesArray] = useState([]);

    // console.log(userSession); // Debug Statement
    useEffect(() => {
        const getScaleIDAndDailySummary = async () => {
            // Fetch Essential data
            try {
                const myAPI = "inverteClientAmplifyAPIv1";
                const path = "/restaurants/";
                const finalAPIRoute = path + userSession.userSession.username;

                // Get Essential Restaurant Meta Data (ScaleID)
                await API.get(myAPI, finalAPIRoute)
                    .then(async (response) => {
                        // console.log("Response from API: ", response.item.Item.scaleID); // Debug Statement
                        setScalesArray([response.item.Item.scaleID]);
                        try {
                            const myAPI = "inverteClientAmplifyAPIv1";
                            const path = "/daily/";
                            const finalAPIRoute = path + response.item.Item.scaleID;
                            // console.log(finalAPIRoute); // debug statement
                            let tempDate = dayjs(); // Automatically in local time

                            // Get daily-hourly summary
                            await API.get(myAPI, finalAPIRoute, {
                                queryStringParameters: {
                                    dayOfYear: tempDate.dayOfYear().toString(),
                                    hourOfDay: tempDate.hour().toString(),
                                },
                            })
                                .then((response) => {
                                    // console.log("Your api response: ", response); // Debug Statement
                                    let accuracy = response.daily.hourlySummary.accuracy + "%";
                                    let inventoryWeight = response.daily.hourlySummary.inventoryConsumed + "g";
                                    let timeSaved = "+" + response.daily.hourlySummary.minutesSaved;
                                    setItems([response.daily.hourlySummary.portionsCompleted, accuracy, inventoryWeight, timeSaved]);
                                })
                                .catch((error) => {
                                    console.log("Failed to retrieve from API (daily)", error);
                                });
                        } catch (err) {
                            console.log(err);
                        }
                    })
                    .catch((error) => {
                        console.log("Failed to retrieve from inverteClientAmplifyAPIv1 (restaurant): ", error);
                    });
            } catch (err) {
                console.log(err);
            }
        };

        getScaleIDAndDailySummary();
    }, []);

    // useEffect(() => {
    //     const getDailyItems = async () => {

    //     };
    //     getDailyItems();
    // }, []);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard
                                color="dark"
                                icon={<PanToolIcon />}
                                title="Portions Completed"
                                count={items[0]}
                                percentage={{
                                    color: "success",
                                    amount: "+24%",
                                    label: "than yesterday",
                                }}
                            />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard
                                icon={<PrecisionManufacturingRoundedIcon />}
                                title="Accuracy"
                                count={items[1]}
                                percentage={{
                                    color: "success",
                                    amount: "+3%",
                                    label: "than yesterday",
                                }}
                            />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard
                                color="success"
                                icon={<ScaleRoundedIcon />}
                                title="Inventory Used"
                                count={items[2]}
                                percentage={{
                                    color: "success",
                                    amount: "+10%",
                                    label: "than yesterday",
                                }}
                            />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard
                                color="primary"
                                icon={<AccessTimeFilledRoundedIcon />}
                                title="Minutes Saved"
                                count={items[3]}
                                percentage={{
                                    color: "success",
                                    amount: "+10%",
                                    label: "than yesterday",
                                }}
                            />
                        </MDBox>
                    </Grid>
                </Grid>
                <MDBox mt={4.5}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsLineChart color="dark" title="Inventory Depletion" description="Hourly Performance" date="just updated" chart={tasks} />
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsBarChart color="info" title="Accuracy Levels" description="Hourly Performance" date="Updated 5 minutes ago" chart={reportsBarChartData} />
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsLineChart
                                    color="success"
                                    title="Line Temperature"
                                    description={
                                        <>
                                            (<strong>+15%</strong>) increase in last 10 minutes.
                                        </>
                                    }
                                    date="updated 4 min ago"
                                    chart={sales}
                                />
                            </MDBox>
                        </Grid>
                    </Grid>
                </MDBox>
                {/* <MDBox>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={8}>
                            <Projects />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <OrdersOverview />
                        </Grid>
                    </Grid>
                </MDBox> */}
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default Dashboard;
