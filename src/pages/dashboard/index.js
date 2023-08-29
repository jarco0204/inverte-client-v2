// React Imports
import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Chart from "chart.js/auto";

// MUI material components
import Grid from "@mui/material/Grid";
import PanToolIcon from "@mui/icons-material/PanTool";
import PrecisionManufacturingRoundedIcon from "@mui/icons-material/PrecisionManufacturingRounded";
import ScaleRoundedIcon from "@mui/icons-material/ScaleRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";

// Material Dashboard
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import Footer from "../../components/Footer";
import PortionAccuracyLineChart from "./components/PortionAccuracyLineChart";
import ReportsLineChartComponent from "../../components/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "../../components/Cards/StatisticsCards/ComplexStatisticsCard";
import MobileComplexStatisticsCard from "./components/MobileComplexStatisticsCard";
import DropDownMenus from "./components/DropDownMenus";
import { getDay } from "../../graphql/queries";

// AWS & other libraries
import { onNewPortionEvent } from "../../graphql/subscriptions";
import { API, Auth, graphqlOperation } from "aws-amplify";
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear.js";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import toObject from "dayjs/plugin/toObject.js";

// Configure DayJS library
dayjs.extend(dayOfYear);
dayjs.extend(toObject);
dayjs.extend(utc);
dayjs.extend(timezone);

/*!
   @description: Helper function ton create an object to store the portion event data.
   @params:
   @return:
   @Comments
   @Coders: Mohan
*/
const createReportLineChartObject = () => {
    return {
        weightGraph: {
            labels: [],
            datasets: { label: "Portion Event", data: [], yAxisLabel: "Grams" },
            pointBackgroundColorAr: [],
        },
        accuracyGraph: {
            labels: [],
            datasets: { label: "Portion Accuracy", data: [], yAxisLabel: "Percent" },
            pointBackgroundColorAr: [],
        },
        portionTimeGraph: {
            labels: [],
            datasets: { label: "Portion Time", data: [], yAxisLabel: "Seconds" },
            pointBackgroundColorAr: [],
        },
        correctWeightGraph: {
            labels: [],
            datasets: { label: "Correct Weight", data: [], yAxisLabel: "Grams" },
            // pointBackgroundColorAr: [],
        },
    };
};

/*!
   @description: Main Dashboard container that displays portion event information to user. 
   @params:
   @return:
   @Comments
   @Coders: GangaLi
*/
const DashboardContainer = ({ iotThingNames, unitOfMass, displayIngredientIndex, timeZone, demo }) => {
    // Main Component State
    const [isMobileDevice, setIsMobileDevice] = useState(false);

    // Main Card Components
    const [cardSummaryItems, setCardSummaryItems] = useState([]);
    const [realTimeWeightData, setRealTimeWeightData] = useState([]);
    const [realTimeAccuracy, setRealTimeAccuracy] = useState([]);
    const [realTimePortionTime, setRealTimePortionTime] = useState([]);
    const { weightGraph, accuracyGraph, portionTimeGraph, correctWeightGraph } = createReportLineChartObject();

    // Drop-Down Menu State
    const options = Object.values(iotThingNames);
    const selectedIndexRef = useRef(displayIngredientIndex);
    const [selectedIndex, setSelectedIndex] = useState(displayIngredientIndex);
    const keys = Object.keys(iotThingNames);

    // UseEffect to change layout for mobile devices
    useEffect(() => {
        const handleResize = () => {
            setIsMobileDevice(window.innerWidth < 1100);
        };
        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    /*!
        @description: Update the index number of selected ingredient in dynamo 
        @params: integer
        @return:
        @Comments
        @Coders: Rohan-16
    */
    const updateIngredient = async (index) => {
        const user = await Auth.currentAuthenticatedUser();
        try {
            const AMPLIFY_API = process.env.REACT_APP_AMPLIFY_API_NAME;
            const path = "/restaurants/updateDisplayIngredientIndex/";
            const finalAPIRoute = path + user.username; //TODO: Cases where userSession is empty

            // Make REST API Call
            await API.get(AMPLIFY_API, finalAPIRoute, { queryStringParameters: { index: index } }).then((response) => {
                if (response == undefined) {
                    throw new Error("No Response from updateDisplayIngredientIndex route in GQL API");
                }
            });
        } catch (err) {
            console.log("Error when updating selected ingredient index in dashboard page...", err);
        }
    };

    /*!
       @description:
       @params:
       @return:
       @Comments
       @Coders: BillyCaine
    */
    const generateLowerRealTimeGraphs = (realTime) => {
        console.log("The realtimeAR pulled from Cloud is...", realTime);
        console.log("The length of the array is...", realTime.length);

        // Variable definition
        let [tempWeightAR, correctWeightAR, tempAccuracyAR, tempTimeAR, pointBackgroundColorAR] = [[], [], [], [], []];
        let oldTempKeys = Object.keys(realTime).sort();
        let tempKeys = oldTempKeys.slice(-7); //We are slicing the array so that only 7 data points get displayed on the graphs

        // Generate Data Arrays
        for (let i = 0; i < tempKeys.length; i++) {
            // Determine if the weight is negative or positive (Portion Event or Refill Event)
            if (realTime[tempKeys[i]].portionWeight < 0) {
                if (unitOfMass == "g") {
                    tempWeightAR.push(realTime[tempKeys[i]].portionWeight);
                } else {
                    tempWeightAR.push((realTime[tempKeys[i]].portionWeight / 28.35).toFixed(2));
                }
                pointBackgroundColorAR.push("rgba(55, 55, 55, .8)");
            } else {
                if (unitOfMass == "g") {
                    tempWeightAR.push(realTime[tempKeys[i]].portionWeight);
                } else {
                    tempWeightAR.push((realTime[tempKeys[i]].portionWeight / 28.35).toFixed(2));
                }
                pointBackgroundColorAR.push("rgba(255, 255, 255, .8)");
            }
            // Push Data points to arrays
            tempAccuracyAR.push(realTime[tempKeys[i]].accuracy);
            tempTimeAR.push(parseFloat(realTime[tempKeys[i]].portionTime).toFixed(1));
            correctWeightAR.push(27);
        }

        // Improve UI by adding labels and colours
        weightGraph.labels = tempKeys;
        weightGraph.datasets.data = tempWeightAR;
        weightGraph.pointBackgroundColorAr = pointBackgroundColorAR;

        correctWeightGraph.labels = tempKeys;
        correctWeightGraph.datasets.data = correctWeightAR;
        // correctWeightGraph.pointBackgroundColorAr = pointBackgroundColorAR;

        accuracyGraph.labels = tempKeys;
        accuracyGraph.datasets.data = tempAccuracyAR;
        accuracyGraph.pointBackgroundColorAr = pointBackgroundColorAR;

        portionTimeGraph.labels = tempKeys;
        portionTimeGraph.datasets.data = tempTimeAR;
        portionTimeGraph.pointBackgroundColorAr = pointBackgroundColorAR;

        // Improve UX by changing unit of mass keyword
        if (unitOfMass == "g") {
            weightGraph.datasets.yAxisLabel = "Grams";
        } else {
            weightGraph.datasets.yAxisLabel = "Ounces";
        }

        // Update the graphs
        setRealTimeWeightData(weightGraph);
        setRealTimeAccuracy(accuracyGraph);
        setRealTimePortionTime(portionTimeGraph);
    };

    /*!
       @description:
       @params:
       @return:
       @Comments
       @Coders: Jungler333
    */
    const getHourlyMetaRecords = async () => {
        try {
            let tempDate = dayjs().tz(timeZone); // Local time of Client

            const response = await API.graphql({
                query: getDay,
                variables: { dayOfYear_iotNameThing: tempDate.dayOfYear().toString() + "_" + keys[selectedIndexRef.current] }, // Provide the ID as a variable
            });

            let hour = response.data;
            let h = {
                getDay: {
                    dayOfYear_iotNameThing: "228_P0-10-v1",
                    weekOfYear_iotNameThing: "33_P0-10-v1_w",
                    dailySummary: {
                        accuracy: 93.28,
                        inventoryConsumed: 1932,
                        minutesSaved: 971,
                        portionsCompleted: 73,
                    },
                    realTime: {
                        "2023-8-16 10:41:48": { portionTime: "5.5", accuracy: "74", portionWeight: "23" },
                        "2023-8-16 10:47:54": { portionTime: "5", accuracy: "88", portionWeight: "19" },
                        "2023-8-16 11:00:34": { portionTime: "7.9", accuracy: "82", portionWeight: "22" },
                        "2023-8-16 10:55:00": { portionTime: "1", accuracy: "100", portionWeight: "20" },
                        "2023-8-16 10:58:17": { portionTime: "1", accuracy: "100", portionWeight: "20" },
                        "2023-8-16 9:43:32": { portionTime: "1", accuracy: "82", portionWeight: "22" },
                        "2023-8-16 10:13:15": { portionTime: "1", accuracy: "100", portionWeight: "17" },
                        "2023-8-16 12:11:26": { portionTime: "1", accuracy: "100", portionWeight: "18" },
                        "2023-8-16 12:11:05": { portionTime: "1", accuracy: "100", portionWeight: "17" },
                    },
                },
            };

            if (demo) {
                // Set the Upper Summary Card Components
                let accuracy = h.getDay.dailySummary.accuracy.toFixed(0) + "%";
                let inventoryWeight = h.getDay.dailySummary.inventoryConsumed + "g";
                let timeSaved = h.getDay.dailySummary.minutesSaved.toFixed(1) + "s";
                setCardSummaryItems([h.getDay.dailySummary.portionsCompleted, accuracy, inventoryWeight, timeSaved]);
                // Create the lower 3 Plots using the Real-Time property
                console.log(h.getDay.realTime);

                generateLowerRealTimeGraphs(h.getDay.realTime);
            } else {
                if (hour.getDay) {
                    console.log("The value of Hour.GetDay is", hour.getDay);

                    // Set the Upper Summary Card Components
                    let accuracy = hour.getDay.dailySummary.accuracy.toFixed(0) + "%";
                    let inventoryWeight = hour.getDay.dailySummary.inventoryConsumed + "g";
                    let timeSaved = hour.getDay.dailySummary.minutesSaved.toFixed(1) + "s";
                    setCardSummaryItems([hour.getDay.dailySummary.portionsCompleted, accuracy, inventoryWeight, timeSaved]);
                    // Create the lower 3 Plots using the Real-Time property
                    console.log(hour.getDay.realTime);

                    generateLowerRealTimeGraphs(JSON.parse(hour.getDay.realTime));
                } else {
                    // There is no hourly response so we need to create one
                    setCardSummaryItems(["0", "NA", "0", "NA"]);
                    setRealTimeWeightData([]);
                    setRealTimeAccuracy([]);
                    setRealTimePortionTime([]);
                    return;
                }
            }
        } catch (error) {
            console.error("Error retrieving Hour:", error);
        }
    };

    /*!
       @description:Use effect that fecthes the data whenever new data is added to PE table
       @params:
       @return:
       @Comments
       @Coders: Mohan
    */
    useEffect(() => {
        getHourlyMetaRecords();
        const subscription = API.graphql(graphqlOperation(onNewPortionEvent)).subscribe({
            next: (data) => {
                const newSensorReading = data.value.data.onNewSensorReading;
                // Handle the new sensor reading, update your state, etc.
                getHourlyMetaRecords();
                console.log("New sensor reading:", newSensorReading);
            },
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [selectedIndex]);

    return (
        <DashboardLayout>
            <DropDownMenus options={options} selectedIndexRef={selectedIndexRef} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} updateIngredient={updateIngredient} />
            {!isMobileDevice && (
                <div>
                    <MDBox py={3}>
                        <Grid container spacing={1} display="flex" justifyContent="center">
                            <Grid item xs={12} md={6} lg={3}>
                                <ComplexStatisticsCard
                                    color="dark"
                                    icon={<PanToolIcon />}
                                    title="Completed Portions"
                                    count={cardSummaryItems[0]}
                                    percentage={{
                                        color: "success",
                                        // amount: "+24%",
                                        // label: "than yesterday",
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </MDBox>
                    <MDBox py={3}>
                        <Grid container spacing={3} display="flex" justifyContent="center">
                            <Grid item xs={12} md={6} lg={3}>
                                <MDBox mb={1.5}>
                                    <ComplexStatisticsCard
                                        color="info"
                                        icon={<ScaleRoundedIcon />}
                                        title="Total Consumed Inventory"
                                        count={unitOfMass == "g" ? cardSummaryItems[2] : (parseInt(cardSummaryItems[2]) / 28.35).toFixed(2).toString() + "oz"}
                                        percentage={{
                                            color: "success",
                                            // amount: "+10%",
                                            // label: "Stay Tuned for Past Analytics",
                                        }}
                                    />
                                </MDBox>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <MDBox mb={1.5}>
                                    <ComplexStatisticsCard
                                        color="success"
                                        icon={<AccessTimeFilledRoundedIcon />}
                                        title="Total Portioning Time"
                                        count={cardSummaryItems[3]}
                                        percentage={{
                                            color: "success",
                                            // amount: "+10%",
                                            // label: "than yesterday",
                                        }}
                                    />
                                </MDBox>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <MDBox mb={1.5}>
                                    <ComplexStatisticsCard
                                        color="warning"
                                        icon={<PrecisionManufacturingRoundedIcon />}
                                        title="Average Performance Level"
                                        count={cardSummaryItems[1]}
                                        percentage={{
                                            color: "success",
                                            // amount: "+3%",
                                            // label: "than yesterdays",
                                        }}
                                    />
                                </MDBox>
                            </Grid>
                        </Grid>
                        <MDBox mt={4.5}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6} lg={4}>
                                    <MDBox mb={3}>
                                        <PortionAccuracyLineChart color="info" title="Variation of Portioning Weight" key={realTimeAccuracy} chart={realTimeWeightData} />
                                    </MDBox>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <MDBox mb={3}>
                                        <ReportsLineChartComponent color="success" title="Variation of Portioning Time" chart={realTimePortionTime} />
                                    </MDBox>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <MDBox mb={3}>
                                        <ReportsLineChartComponent color="warning" title="Portioning Performance Levels" chart={realTimeAccuracy} />
                                    </MDBox>
                                </Grid>
                            </Grid>
                        </MDBox>
                    </MDBox>
                </div>
            )}
            {isMobileDevice && (
                <div>
                    <MDBox py={3}>
                        <Grid container spacing={1} direction="column" justifyContent="center">
                            <Grid item xs={12} md={6} lg={3}>
                                <ComplexStatisticsCard
                                    color="dark"
                                    icon={<PanToolIcon />}
                                    title="Completed Portions"
                                    count={cardSummaryItems[0]}
                                    percentage={{
                                        color: "success",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <MobileComplexStatisticsCard
                                    color="info"
                                    icon={<ScaleRoundedIcon />}
                                    title="Total Consumed Inventory"
                                    count={unitOfMass == "g" ? cardSummaryItems[2] : (parseInt(cardSummaryItems[2]) / 28.35).toFixed(2).toString() + "oz"}
                                    percentage={{
                                        color: "success",
                                    }}
                                    realTimeData={realTimeWeightData}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <MobileComplexStatisticsCard
                                    color="success"
                                    icon={<AccessTimeFilledRoundedIcon />}
                                    title="Total Portioning Time"
                                    count={cardSummaryItems[3]}
                                    percentage={{
                                        color: "success",
                                    }}
                                    realTimeData={realTimePortionTime}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <MobileComplexStatisticsCard
                                    color="warning"
                                    icon={<PrecisionManufacturingRoundedIcon />}
                                    title="Average Performance Level"
                                    count={cardSummaryItems[1]}
                                    percentage={{
                                        color: "success",
                                    }}
                                    realTimeData={realTimeAccuracy}
                                />
                            </Grid>
                        </Grid>
                    </MDBox>
                </div>
            )}
            <Footer />
        </DashboardLayout>
    );
};

DashboardContainer.propTypes = {
    iotThingNames: PropTypes.object,
    unitOfMass: PropTypes.string,
    displayIngredientIndex: PropTypes.string,
    timeZone: PropTypes.string,
};

export default DashboardContainer;
