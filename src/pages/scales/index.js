import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// General components
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../components/Navbars/DashboardNavbar";
import Footer from "../../components/Footer";
import Scale from "./components/Scale";

/*
    Main Route Container that hold array of Scale Components (Scale Cards)
*/
function ScalesContainer({ iotThingNames, restaurantName, restaurantLocationNum }) {
    const [scalesMetaArr, setScalesMetaArr] = useState([]); // Array of Scales
    const [scaleCardsReady, setScaleCardsReady] = useState(false);

    /*
        React Hook to generate array of scale card components
    */
    useEffect(() => {
        /*
            Create the Scale Card Components based on the number of IoT Things are associated with RestaurantID
        */
        const createScaleCardList = () => {
            // console.log("Your IoT Names fetched from API: ", iotThingNames); // Debug Statement
            const tempScalesMetaArr = [];
            for (let i = 0; i < iotThingNames.length; i++) {
                // Construct root scale topic
                let scaleRootTopic = restaurantName + "/" + restaurantLocationNum;
                tempScalesMetaArr.push({ topic: scaleRootTopic, iotNameThing: iotThingNames[i] });
            }
            setScalesMetaArr(tempScalesMetaArr);
            setScaleCardsReady(true);
        };
        createScaleCardList();
    }, []);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        {!scaleCardsReady ? null : (
                            <MDBox mb={1.5}>
                                {scalesMetaArr.map((mainScaleData, i) => (
                                    <Scale key={i} mainScaleData={mainScaleData} />
                                ))}
                            </MDBox>
                        )}
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

// Default props to start making JS into TS
ScalesContainer.propTypes = {
    iotThingNames: PropTypes.array,
    restaurantName: PropTypes.string,
    restaurantLocationNum: PropTypes.number,
};

export default ScalesContainer;
