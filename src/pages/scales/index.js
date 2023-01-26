// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../components/Navbars/DashboardNavbar";
import Footer from "../../components/Footer";

import ComplexStatisticsCard from "../../components/Cards/StatisticsCards/ComplexStatisticsCard";

function Dashboard() {
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard
                                color="dark"
                                // icon={<PanToolIcon />}
                                title="Successful Portions"
                                count={281}
                                percentage={{
                                    color: "success",
                                    amount: "+56%",
                                    label: "than lask week",
                                }}
                            />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            {/* <ComplexStatisticsCard
                                icon={<PrecisionManufacturingRoundedIcon />}
                                title="Today's Accuracy"
                                count="99%"
                                percentage={{
                                    color: "success",
                                    amount: "+3%",
                                    label: "than yesterday",
                                }}
                            /> */}
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            {/* <ComplexStatisticsCard
                                color="success"
                                icon={<ScaleRoundedIcon />}
                                title="Inventory Consumed"
                                count="34kg"
                                percentage={{
                                    color: "success",
                                    amount: "+1%",
                                    label: "than yesterday",
                                }}
                            /> */}
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            {/* <ComplexStatisticsCard
                                color="primary"
                                icon={<AccessTimeFilledRoundedIcon />}
                                title="Minutes Saved"
                                count="+91"
                                percentage={{
                                    color: "success",
                                    amount: "",
                                    label: "Since Inception",
                                }}
                            /> */}
                        </MDBox>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default Dashboard;
