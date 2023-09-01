// React Imports
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @Mui material components
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

// User Imports
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import Footer from "../../components/Footer";
import Scale from "./components/Scale";

/*!
   @description: Centering the Grid of Scale Cards
   @params:
   @return:
   @Comments:
   @Coders: DaVest
*/
const CustomizedGrid = styled(Grid)`
    /* Media query for laptop/desktop */
    @media only screen and (min-width: 770px) {
        display: flex;
        justify-content: center;
        width: 50%;
        margin: auto;
    }
`;

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
            <CustomizedGrid container spacing={1}>
                <Grid item xs={20} md={10} lg={10}>
                    {!scaleCardsReady ? null : (
                        <MDBox mb={20}>
                            {scalesMetaArr.map((mainScaleData, i) => (
                                <div key={i} style={{ marginTop: "50px" }}>
                                    <Scale mainScaleData={mainScaleData} />
                                </div>
                            ))}
                        </MDBox>
                    )}
                </Grid>
            </CustomizedGrid>
            <Footer />
        </DashboardLayout>
    );
};

// Default props to start making JS into TS
ScalesContainer.propTypes = {
    iotThingNames: PropTypes.object,
    restaurantName: PropTypes.string,
    restaurantLocationNum: PropTypes.string,
};

export default ScalesContainer;
