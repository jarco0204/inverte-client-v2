// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../components/Navbars/DashboardNavbar";
import Footer from "../../components/Footer";

import Scale from "./components/Scale";

// AWS Imports
// import { API, graphqlOperation } from "aws-amplify";
import { useEffect } from "react";

// GQL Queries
// import { listRestaurants } from "../../graphql/queries";

function Dashboard() {
    // Function
    // const getRestaurantList = async () => {
    //     try {
    //         const restaurants = await API.graphql(graphqlOperation(listRestaurants));
    //         console.log("your res ", restaurants);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    // Hook
    useEffect(() => {
        getRestaurantList();
    }, []);
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <Scale />
                        </MDBox>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default Dashboard;
