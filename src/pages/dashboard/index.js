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
import ComplexStatisticsCard from "../../components/Cards/StatisticsCards/ComplexStatisticsCard";
import DropDownIngredientMenu from "../../components/DropDownIngredientMenu";

// AWS Imports
import { getDay } from "../../graphql/queries";
import { updateRestaurant } from "../../graphql/mutations";
import { onNewPortionEvent } from "../../graphql/subscriptions";
import { API, Auth, graphqlOperation } from "aws-amplify";

// User Components
import PortionPrecisionChart from "./components/PortionPrecisionChart";
import InventoryWeightChart from "./components/PortionTimeLineChart";
import PortionAccuracyDoughnutChart from "./components/PortionAccuracyDoughnutChart";
import MobileComplexStatisticsCard from "./components/MobileComplexStatisticsCard";

// External Libraries
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
   @description: Helper function to return the data that's hard coded for demo
   @params:
   @return:
   @Comments
   @Coders: Dalmatian;)
*/
const getDemoData = () => {
    return {
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
};

/*!
   @description: Helper function ton create an object to store the portion event data.
   @params:
   @return:
   @Comments
   @Coders: Mohan
*/
const createReportLineChartObject = () => {
    return {
        precisionGraph: {
            labels: [],
            portionEvent: { label: "Portion Weight", data: [], yAxisLabel: "Grams" },
            correctWeight: { label: "Correct Weight", data: [], yAxisLabel: "Grams" },
            upperLimit: { label: "Upper Limit", data: [], yAxisLabel: "Grams" },
            lowerLimit: { label: "Lower Limit", data: [], yAxisLabel: "Grams" },
            pointBackgroundColorAR: [],
        },
        inventoryGraph: {
            labels: [],
            datasets: { label: "Portion Time", data: [], yAxisLabel: "Seconds" },
            pointBackgroundColorAr: [],
        },
    };
};

/*!
   @description: Helper function ton create an object to store the portion event data.
   @params:
   @return:
   @Comments
   @Coders: Mohan
*/
const createReportBarChartObject = () => {
    return {
        labels: [],
        datasets: { label: "Inventory Weight", data: [], yAxisLabel: "Weight" },
        pointBackgroundColorAr: [],
    };
};

/*!
   @description: Helper function to create Doughnut chart
   @params:
   @return:
   @Comments
   @Coders: Mohan
*/
const createDoughnutChartObject = (doughnutChartData) => {
    return {
        labels: ["Under serving", "Perfect", "Over Serving"],
        data: doughnutChartData,
        backgroundColors: ["#0693e3", "rgba(83, 212, 88, 1)", "rgba(236,65,1,1)"],
    };
};

/*!
   @description: Main Dashboard container that displays portion event information to user. 
   @params:
   @return:
   @Comments
   @Coders: GangaLi
*/
const DashboardContainer = ({ iotThingNames, unitOfMass, displayIngredientIndex, timeZone, clientDemo }) => {
    // Main Component State
    const portionCompleteTitle = "Portions Completed";
    const portionPrecisionTitle = "Precision Levels";
    const portionTimeTitle = "Average Completion Time";
    const inventoryConsumedTitle = "Inventory Consumed";
    const [isMobileDevice, setIsMobileDevice] = useState(clientDemo);

    // Main Card Components
    const [cardSummaryItems, setCardSummaryItems] = useState([]);
    const [realTimePrecisionGraph, setRealTimePrecisionGraph] = useState([]);
    const [realTimeAccuracyGraph, setRealTimeAccuracyGraph] = useState([]);
    const [doughnutChartData, setDoughnutChartData] = useState([]);

    // Chart Related Variables
    const [realTimeInventoryGraph, setRealTimeInventoryGraph] = useState([]);
    const { precisionGraph, inventoryGraph } = createReportLineChartObject();
    const accuracyGraph = createReportBarChartObject(); // TODO: Adapt it to Pie
    const doughnutGraph = createDoughnutChartObject(doughnutChartData);

    // Drop-Down Menu State
    const options = Object.values(iotThingNames);
    const selectedIndexRef = useRef(displayIngredientIndex);
    const [selectedIndex, setSelectedIndex] = useState(displayIngredientIndex);
    const keys = Object.keys(iotThingNames);

    /*!
        @description:
        @params:
        @return:
        @Comments
        @Coders: TheBestCoderInAmerica
    */
    const generatePrecisionChartResponsive = (mobileViewFlag) => {
        return <PortionPrecisionChart color="info" title="Precision of Portioning" chart={realTimePrecisionGraph} mobileViewFlag={mobileViewFlag} />;
    };

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
            const inputData = { restaurant_id: user.username, displayIngredient: index };
            const response = await API.graphql({
                query: updateRestaurant,
                variables: { input: inputData },
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
        // Variable definition
        let [tempWeightAR, correctWeightAR, upperLimitAR, lowerLimitAR, tempAccuracyAR, tempTimeAR, pointBackgroundColorAR] = [[], [], [], [], [], [], []];
        let oldTempKeys = Object.keys(realTime).sort((a, b) => new Date(a) - new Date(b)); //Sort the data by time

        let tempKeys = oldTempKeys.slice(-7); //We are slicing the array so that only 7 data points get displayed on the graphs

        // Generate Data Arrays
        for (let i = 0; i < tempKeys.length; i++) {
            // TODO: tempKeys should contain this information for each portion event
            const correctWeight = parseInt(realTime[tempKeys[i]].correctWeight);
            const upperLimit = parseInt(realTime[tempKeys[i]].upperErrorLimit);
            const lowerLimit = parseInt(realTime[tempKeys[i]].lowerErrorLimit);
            // Portion Weight Accuracy
            upperLimitAR.push(correctWeight + upperLimit);
            correctWeightAR.push(correctWeight);
            lowerLimitAR.push(correctWeight - lowerLimit);
            // Handle Acci Refill Events
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
        }

        // Precision Chart made up of 3 lines
        precisionGraph.labels = tempKeys;
        precisionGraph.portionEvent.data = tempWeightAR;
        precisionGraph.correctWeight.data = correctWeightAR;
        precisionGraph.upperLimit.data = upperLimitAR;
        precisionGraph.lowerLimit.data = lowerLimitAR;
        precisionGraph.pointBackgroundColorAR = pointBackgroundColorAR;

        // Accuracy Chart (Pie or Bar)
        accuracyGraph.labels = tempKeys;
        accuracyGraph.datasets.data = tempAccuracyAR;
        accuracyGraph.pointBackgroundColorAr = pointBackgroundColorAR;

        // Inventory Weight Chart made up of One Dataset
        inventoryGraph.labels = tempKeys;
        inventoryGraph.datasets.data = tempTimeAR;
        inventoryGraph.pointBackgroundColorAr = pointBackgroundColorAR;

        if (unitOfMass == "g") {
            precisionGraph.portionEvent.yAxisLabel = "Grams";
            // inventoryGraph.datasets.yAxisLabel = "Grams";
        } else {
            precisionGraph.portionEvent.yAxisLabel = "Ounces";
            // inventoryGraph.datasets.yAxisLabel = "Ounces";
        }
        inventoryGraph.datasets.yAxisLabel = "Seconds";

        // Update the graphs
        setRealTimePrecisionGraph(precisionGraph);
        setRealTimeInventoryGraph(inventoryGraph);
        setRealTimeAccuracyGraph(accuracyGraph);
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

            // Query GQL to pull hourly data
            const response = await API.graphql({
                query: getDay,
                variables: { dayOfYear_iotNameThing: tempDate.dayOfYear().toString() + "_" + keys[selectedIndexRef.current] }, // Provide the ID as a variable
            });

            let hour = response.data;
            let demoData = getDemoData();

            // If Demo, then display hard-coded data
            if (clientDemo) {
                // Set the Upper Summary Card Components
                let accuracy = demoData.getDay.dailySummary.accuracy.toFixed(0) + "%";
                let inventoryWeight = demoData.getDay.dailySummary.inventoryConsumed + "g";
                let timeSaved = demoData.getDay.dailySummary.averageTime.toFixed(1) + "s";
                setCardSummaryItems([demoData.getDay.dailySummary.portionsCompleted, accuracy, inventoryWeight, timeSaved]);
                generateLowerRealTimeGraphs(demoData.getDay.realTime);
            } else {
                if (hour.getDay) {
                    // Set the Upper Summary Card Components
                    let accuracy = hour.getDay.dailySummary.accuracy.toFixed(0) + "%";
                    let inventoryWeight = hour.getDay.dailySummary.inventoryConsumed + "g";
                    let timeSaved = hour.getDay.dailySummary.averageTime.toFixed(1) + "s";
                    setCardSummaryItems([hour.getDay.dailySummary.portionsCompleted, accuracy, inventoryWeight, timeSaved]);

                    // Add Percentages
                    // Add Percentages
                    const underPercent = parseInt((hour.getDay.dailySummary.underServed / hour.getDay.dailySummary.portionsCompleted) * 100);
                    const perfectPercent = parseInt((hour.getDay.dailySummary.perfect / hour.getDay.dailySummary.portionsCompleted) * 100);
                    const overPercent = parseInt((hour.getDay.dailySummary.overServed / hour.getDay.dailySummary.portionsCompleted) * 100);
                    setDoughnutChartData([underPercent, perfectPercent, overPercent]);
                    // setDoughnutChartData([hour.getDay.dailySummary.underServed, hour.getDay.dailySummary.perfect, hour.getDay.dailySummary.overServed]);
                    generateLowerRealTimeGraphs(JSON.parse(hour.getDay.realTime));
                } else {
                    // There is no hourly response so add placeholders
                    setCardSummaryItems(["0", "NA", "0", "NA"]);
                    setRealTimePrecisionGraph([]);
                    setRealTimeAccuracyGraph([]);
                    setRealTimeInventoryGraph([]);
                    return;
                }
            }
        } catch (error) {
            console.error("Error fetching from GQL or Generating Charts... ", error);
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
            },
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [selectedIndex]);

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

    return (
        <DashboardLayout>
            <DropDownIngredientMenu options={options} selectedIndexRef={selectedIndexRef} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} titleForPage={"Daily InVentory Report"} />
            {!isMobileDevice && (
                <div>
                    <MDBox py={3}>
                        <Grid container spacing={1} display="flex" justifyContent="center">
                            <Grid item xs={12} md={6} lg={3}>
                                <ComplexStatisticsCard
                                    color="dark"
                                    icon={<PanToolIcon />}
                                    title={portionCompleteTitle}
                                    count={cardSummaryItems[0]}
                                    percentage={{
                                        color: "success",
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </MDBox>
                    <MDBox py={2}>
                        <Grid container spacing={3} display="flex" justifyContent="center">
                            <Grid item xs={12} md={6} lg={3}>
                                <MDBox mb={1.5}>
                                    <ComplexStatisticsCard
                                        color="info"
                                        icon={<PrecisionManufacturingRoundedIcon />}
                                        title={portionPrecisionTitle}
                                        count={cardSummaryItems[1]}
                                        percentage={{
                                            color: "success",
                                            // amount: "+3%",
                                            // label: "than yesterdays",
                                        }}
                                    />
                                </MDBox>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <MDBox mb={1.5}>
                                    <ComplexStatisticsCard
                                        color="warning"
                                        icon={<ScaleRoundedIcon />}
                                        title={inventoryConsumedTitle}
                                        count={unitOfMass == "g" ? cardSummaryItems[2] : (parseInt(cardSummaryItems[2]) / 28.35).toFixed(2).toString() + "oz"}
                                        percentage={{
                                            color: "success",
                                        }}
                                    />
                                </MDBox>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <MDBox mb={1.5}>
                                    <ComplexStatisticsCard
                                        color="success"
                                        icon={<AccessTimeFilledRoundedIcon />}
                                        title={portionTimeTitle}
                                        count={cardSummaryItems[3]}
                                        percentage={{
                                            color: "success",
                                        }}
                                    />
                                </MDBox>
                            </Grid>
                        </Grid>
                        <MDBox mt={4.75}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6} lg={4}>
                                    <MDBox mb={3}>{generatePrecisionChartResponsive(false)}</MDBox>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <MDBox mb={3}>
                                        <PortionAccuracyDoughnutChart icon={{ color: "success" }} title="Accuracy of Portioning" chartData={doughnutGraph} />
                                    </MDBox>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <MDBox mb={3}>
                                        <InventoryWeightChart color="success" title="Portion Completion Times" chart={realTimeInventoryGraph} />
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
                                    title={portionCompleteTitle}
                                    count={cardSummaryItems[0]}
                                    percentage={{
                                        color: "success",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <MobileComplexStatisticsCard
                                    color="info"
                                    icon={<PrecisionManufacturingRoundedIcon />}
                                    title={portionPrecisionTitle}
                                    count={cardSummaryItems[1]}
                                    percentage={{
                                        color: "success",
                                    }}
                                    generateChart={() => generatePrecisionChartResponsive(true)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <MobileComplexStatisticsCard
                                    color="success"
                                    icon={<AccessTimeFilledRoundedIcon />}
                                    title={portionTimeTitle}
                                    count={cardSummaryItems[3]}
                                    percentage={{
                                        color: "success",
                                    }}
                                    realTimeData={realTimeAccuracyGraph}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <MobileComplexStatisticsCard
                                    color="warning"
                                    icon={<PrecisionManufacturingRoundedIcon />}
                                    title={inventoryConsumedTitle}
                                    count={cardSummaryItems[1]}
                                    percentage={{
                                        color: "success",
                                    }}
                                    realTimeData={realTimeAccuracyGraph}
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
    displayIngredientIndex: PropTypes.number,
    timeZone: PropTypes.string,
    clientDemo: PropTypes.bool,
};

export default DashboardContainer;
