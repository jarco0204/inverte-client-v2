// React Imports
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @Mui material components
import Grid from "@mui/material/Grid";

// User Imports
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import Footer from "../../components/Footer";
import Scale from "./components/Scale";
import "./components/Scale/card.css";

/*!
   @description: Main Route Container that hold array of Scale Components (Scale Cards)
   @params:
   @return:
   @Comments
   @Coders: JAAM
*/
const ScalesContainer = ({ iotThingNames, restaurantName, restaurantLocationNum }) => {
    // Variable Definition
    const keys = Object.keys(iotThingNames);
    const [scalesMetaArr, setScalesMetaArr] = useState([]);
    const [scaleCardsReady, setScaleCardsReady] = useState(false);

    /*!
        @description: React Hook to Create the Scale Card Components based on the number of IoT Things are associated with RestaurantID
        @params:
        @return:
        @Comments
        @Coders: JohanWing$$
    */
    useEffect(() => {
        const createScaleCardList = () => {
            const tempScalesMetaArr = [];
            for (let i = 0; i < keys.length; i++) {
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
};

// Default props to start making JS into TS
ScalesContainer.propTypes = {
    iotThingNames: PropTypes.object,
    restaurantName: PropTypes.string,
    restaurantLocationNum: PropTypes.number,
};

export default ScalesContainer;
