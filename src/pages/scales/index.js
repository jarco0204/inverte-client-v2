import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
//card css
import "./components/Scale/card.css";
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
    const keys = Object.keys(iotThingNames);
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
            for (let i = 0; i < keys.length; i++) {
                // Construct root scale topic
                let scaleRootTopic = restaurantName + "/" + restaurantLocationNum;
                tempScalesMetaArr.push({ topic: scaleRootTopic, iotNameThing: keys[i] });
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
                <div className="card-container">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={3}>
                            {!scaleCardsReady ? null : (
                                <MDBox mb={1.5}>
                                    <div className="scales-container">
                                        {scalesMetaArr.map((mainScaleData, i) => (
                                            <div key={i} style={{ marginRight: "15px", marginTop: "35px", width: "100%", maxWidth: "300px" }}>
                                                <Scale mainScaleData={mainScaleData} />
                                            </div>
                                        ))}
                                    </div>
                                </MDBox>
                            )}
                        </Grid>
                    </Grid>
                </div>
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
