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
import { useSelector } from "react-redux";

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
const ScalesContainer = () => {
    // Variable Definition
    const scales = useSelector((state) => state.meta.scale.items);
    const iotThingNames = useSelector((state) => state.meta.iotThingNames);
    const restaurantName = useSelector((state) => state.meta.restaurantName);
    const restaurantLocationNum = useSelector((state) => state.meta.restaurantLocationNum);
    const keys = Object.keys(iotThingNames);
    const [scalesMetaArr, setScalesMetaArr] = useState([]);
    const [scaleCardsReady, setScaleCardsReady] = useState(false);
    const isMobileDevice = false;
    console.log(
        "The scale state scale",
        useSelector((state) => state.meta.scale.items)
    );

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
            for (let i = 0; i < scales.length; i++) {
                let scaleRootTopic = restaurantName + "/" + restaurantLocationNum;
                tempScalesMetaArr.push({ topic: scaleRootTopic, iotNameThing: scales[i] });
            }
            setScalesMetaArr(tempScalesMetaArr);

            setScaleCardsReady(true);
        };
        createScaleCardList();
    }, []);
    console.log("Scale Meta Arr", scalesMetaArr);
    return (
        <DashboardLayout>
            <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                <div style={{ flex: 1 }}>
                    <CustomizedGrid container spacing={1} style={{ height: "100%", padding: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Grid item xs={20} md={10} lg={10}>
                            {!scaleCardsReady ? null : (
                                <MDBox mb={20}>
                                    {scalesMetaArr.map((mainScaleData, i) => (
                                        <div key={i} style={{ marginTop: "50px" }}>
                                            <Scale mainScaleData={mainScaleData} isMobileDevice={isMobileDevice} />
                                        </div>
                                    ))}
                                </MDBox>
                            )}
                        </Grid>
                    </CustomizedGrid>
                </div>
                <Footer style={{ flexShrink: 0 }} />
            </div>
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
