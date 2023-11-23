// React Imports
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

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
import { Tooltip } from "@mui/material";

// AWS Imports
import { hoursByDayOfYear_iotNameThing } from "../../graphql/queries";

import { onNewPortionEvent } from "../../graphql/subscriptions";
import { API, graphqlOperation } from "aws-amplify";

// User Components
import PortionPrecisionChart from "./components/PortionPrecisionChart";
import PortionTimeLineChart from "./components/PortionTimeLineChart";
import PortionAccuracyDoughnutChart from "./components/PortionAccuracyDoughnutChart";
import MobileComplexStatisticsCard from "./components/MobileComplexStatisticsCard";

// External Libraries
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear.js";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import toObject from "dayjs/plugin/toObject.js";
import { useSelector } from "react-redux";
import { setSelectedIndex } from "../../redux/metaSlice";
// import { ListItemIcon } from "@mui/material";
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
//Custom query to get only the necessary data from table so that we don't pull the big realTime object each time
const getDashboard = /* GraphQL */ `
    query GetDay($dayOfYear_iotNameThing: ID!) {
        getDay(dayOfYear_iotNameThing: $dayOfYear_iotNameThing) {
            dayOfYear_iotNameThing
            dailySummary {
                averageTime
                portionsCompleted
                accuracy
                inventoryConsumed
                overServed
                underServed
                perfect
                day {
                    dayOfYear_iotNameThing
                    weekOfYear_iotNameThing
                    realTime
                    dashboardGraph
                    scaleActions
                    createdAt
                    updatedAt
                    weekDayWeekOfYear_iotNameThing
                    __typename
                }
                __typename
            }
            dashboardGraph
        }
    }
`;

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
   @description: Helper function to create Doughnut chart
   @params:
   @return:
   @Comments
   @Coders: Mohan
*/
const createDoughnutChartObject = () => {
    return {
        labels: ["Under Serving", "Perfect", "Over Serving"],
        datasets: { label: "Percent (%)", data: [] },
        pointBackgroundColorAR: ["#0693e3", "rgba(83, 212, 88, 1)", "rgba(236,65,1,1)"],
    };
};

/*!
   @description: Main Dashboard container that displays portion event information to user. 
   @params:
   @return:
   @Comments
   @Coders: GangaLi
*/
const DashboardContainer = () => {
    // Main Component State: Cards & Graphs
    const iotThingNames = useSelector((state) => state.meta.iotThingNames);
    const unitOfMass = useSelector((state) => state.meta.unitOfMass);
    const displayIngredientIndex = useSelector((state) => state.meta.displayIngredient);
    const timeZone = useSelector((state) => state.meta.timeZone);
    const clientDemo = useSelector((state) => state.meta.demo);
    const tempDate = dayjs().tz(timeZone); // Local time of Client
    const hourOfDay = tempDate.hour();

    const portionPrecisionTitle = "Precision Levels";
    const portionCompleteTitle = "Portions Completed";
    const portionTimeTitle = "Average Completion Time";
    const inventoryConsumedTitle = "Inventory Consumed";

    const [isMobileDevice, setIsMobileDevice] = useState(false);
    const [cardSummaryItems, setCardSummaryItems] = useState([]);
    const [realTimePrecisionGraph, setRealTimePrecisionGraph] = useState([]);
    const [realTimeAccuracyGraph, setRealTimeAccuracyGraph] = useState([]);
    const [realTimeInventoryGraph, setRealTimeInventoryGraph] = useState([]);

    // Chart Related Variables
    const { precisionGraph, inventoryGraph } = createReportLineChartObject();
    const accuracyGraph = createDoughnutChartObject();

    // Drop-Down Menu State
    const options = Object.values(iotThingNames);
    const selectedIndexRef = { current: displayIngredientIndex.toString() };
    const selectedIndex = displayIngredientIndex;
    const keys = Object.keys(iotThingNames);

    //Data from last week
    const [portionsCompletedLastWeek, setPortionsCompletedLastWeek] = useState(null);
    const [inventoryConsumedLastWeek, setInventoryConsumedLastWeek] = useState(0);
    const [completionTimeLastWeek, setCompletionTimeLastWeek] = useState(0);
    const [precisionLastWeek, setPrecisionLastWeek] = useState(0);

    //Difference in portion completed
    const [differencePortionsCompleted, setDifferencePortionsCompleted] = useState(0);
    const [differenceCompletionTime, setDifferenceCompletionTime] = useState(0);
    const [differencePrecision, setDifferencePrecision] = useState(0);
    const [differenceInventory, setDifferenceInventory] = useState(0);

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
       @description:
       @params:
       @return:
       @Comments
       @Coders: Underkaner
    */
    const generateDoughnutChartResponsive = (mobileViewFlag) => {
        return <PortionAccuracyDoughnutChart title="Accuracy of Portioning" chart={realTimeAccuracyGraph} mobileViewFlag={mobileViewFlag} />;
    };

    /*!
       @description:
       @params:
       @return:
       @Comments
       @Coders: SashaGris
    */
    const generateTimeLineChartResponsive = (mobileViewFlag) => {
        return <PortionTimeLineChart color="success" title="Portion Completion Times" chart={realTimeInventoryGraph} mobileViewFlag={mobileViewFlag} />;
    };

    /*!
       @description:
       @params:
       @return:
       @Comments
       @Coders: BillyCaine
    */
    const generateLowerRealTimeGraphs = (realTime, accuracyPercentagesAR) => {
        // Variable definition
        let [tempWeightAR, correctWeightAR, upperLimitAR, lowerLimitAR, tempTimeAR, pointBackgroundColorAR] = [[], [], [], [], [], []];
        let keys = Object.keys(realTime).sort((a, b) => a - b); //Sorting the keys in ascending order

        for (let i = 0; i < keys.length; i++) {
            const correctWeight = parseInt(realTime[keys[i]].correctWeight);
            const upperLimit = parseInt(realTime[keys[i]].upperErrorLimit);
            const lowerLimit = parseInt(realTime[keys[i]].lowerErrorLimit);
            upperLimitAR.push(correctWeight + upperLimit);
            lowerLimitAR.push(correctWeight - lowerLimit);
            correctWeightAR.push(correctWeight);
            // Handle Acci Refill Events
            if (realTime[keys[i]].portionWeight < 0) {
                if (unitOfMass == "g") {
                    tempWeightAR.push(realTime[keys[i]].portionWeight);
                } else {
                    tempWeightAR.push((realTime[keys[i]].portionWeight / 28.35).toFixed(2));
                }
                pointBackgroundColorAR.push("rgba(55, 55, 55, .8)");
            } else {
                if (unitOfMass == "g") {
                    tempWeightAR.push(realTime[keys[i]].portionWeight);
                } else {
                    tempWeightAR.push((realTime[keys[i]].portionWeight / 28.35).toFixed(2));
                }
                pointBackgroundColorAR.push("rgba(255, 255, 255, .8)");
            }

            // Push Data points to arrays
            tempTimeAR.push(parseFloat(realTime[keys[i]].portionTime).toFixed(1));

            // Convert from Unix Timestamp to Local Time
            keys[i] = dayjs
                .unix(keys[i] / 1000)
                .tz(timeZone)
                .format("MM-DD HH:mm");
        }
        // Precision Chart made up of 3 lines
        precisionGraph.labels = keys;
        precisionGraph.portionEvent.data = tempWeightAR;
        precisionGraph.correctWeight.data = correctWeightAR;
        precisionGraph.upperLimit.data = upperLimitAR;
        precisionGraph.lowerLimit.data = lowerLimitAR;
        precisionGraph.pointBackgroundColorAR = pointBackgroundColorAR;

        // Accuracy Chart (Doughnut)
        accuracyGraph.datasets.data = accuracyPercentagesAR;

        // Inventory Weight Chart made up of One Dataset
        inventoryGraph.labels = keys;
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
    const getDailyMetaRecords = async () => {
        try {
            let tempDate = dayjs().tz(timeZone); // Local time of Client
            // Query GQL to pull hourly data
            const response = await API.graphql({
                query: getDashboard,
                variables: { dayOfYear_iotNameThing: tempDate.dayOfYear().toString() + "_" + keys[selectedIndexRef.current] }, // Provide the ID as a variable
            });

            let day = response.data;
            let demoData = getDemoData();
            let demo = false;
            // If Demo, then display hard-coded data
            if (demo) {
                // Set the Upper Summary Card Components
                setCardSummaryItems([
                    demoData.getDay.dailySummary.portionsCompleted,
                    demoData.getDay.dailySummary.accuracy.toFixed(0) + "%",
                    demoData.getDay.dailySummary.inventoryConsumed + "g",
                    demoData.getDay.dailySummary.averageTime.toFixed(1) + "s",
                ]);
                generateLowerRealTimeGraphs(demoData.getDay.realTime, [44, 36, 20]);
            } else {
                if (day.getDay) {
                    // Set the Upper Summary Card Components
                    let accuracy = day.getDay.dailySummary.accuracy.toFixed(0) + "%";
                    let inventoryWeight = day.getDay.dailySummary.inventoryConsumed + "g";
                    let timeSaved = day.getDay.dailySummary.averageTime.toFixed(1) + "s";
                    setCardSummaryItems([day.getDay.dailySummary.portionsCompleted, accuracy, inventoryWeight, timeSaved]);

                    // Add Percentages
                    let underPercent = Math.round((day.getDay.dailySummary.underServed / day.getDay.dailySummary.portionsCompleted) * 100);
                    let perfectPercent = Math.round((day.getDay.dailySummary.perfect / day.getDay.dailySummary.portionsCompleted) * 100);
                    let overPercent = Math.round((day.getDay.dailySummary.overServed / day.getDay.dailySummary.portionsCompleted) * 100);
                    const totalPercent = underPercent + overPercent + perfectPercent;
                    if (totalPercent != 100) {
                        if (100 - totalPercent == 1) {
                            perfectPercent++;
                        } else if (100 - totalPercent == 2) {
                            underPercent++;
                            overPercent++;
                        } else if (100 - totalPercent == 3) {
                            underPercent++;
                            overPercent++;
                            perfectPercent++;
                        }
                    }
                    generateLowerRealTimeGraphs(JSON.parse(day.getDay.dashboardGraph), [underPercent, perfectPercent, overPercent]);
                    setDifferencePortionsCompleted(day.getDay.dailySummary.portionsCompleted - portionsCompletedLastWeek);
                    setDifferencePrecision(day.getDay.dailySummary.accuracy - precisionLastWeek);
                    setDifferenceInventory(day.getDay.dailySummary.inventoryConsumed - inventoryConsumedLastWeek);
                    setDifferenceCompletionTime(day.getDay.dailySummary.averageTime - completionTimeLastWeek);
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
       @description:Get hourly records from last week
       @params:
       @return:
       @Comments
       @Coders:Rohan-16
    */

    useEffect(() => {
        const getHourlyMetaRecords = async () => {
            const response = await API.graphql({
                query: hoursByDayOfYear_iotNameThing,
                variables: {
                    dayOfYear_iotNameThing: (tempDate.dayOfYear() - 7).toString() + "_" + keys[selectedIndexRef.current],
                }, // Provide the ID as a variable
            });
            const data = response.data.hoursByDayOfYear_iotNameThing.items;
            let tempPortionCompleted = 0;
            let tempPrecision = 0;
            let tempInventory = 0;
            let tempCompletion = 0;
            for (let i = 0; i < data.length; i++) {
                const hour = data[i].dayOfYear_hourOfDay_iotNameThing.split("_");
                if (parseInt(hour[1]) <= hourOfDay) {
                    tempPortionCompleted += data[i].hourlySummary.portionsCompleted;
                    tempPrecision += data[i].hourlySummary.accuracy;
                    tempInventory += data[i].hourlySummary.inventoryConsumed;
                    tempCompletion += data[i].hourlySummary.averageTime;
                }
            }
            setPortionsCompletedLastWeek(tempPortionCompleted);
            setPrecisionLastWeek(tempPrecision / data.length);
            setInventoryConsumedLastWeek(tempInventory);
            setCompletionTimeLastWeek(tempCompletion / data.length);

            //console.log("The number of portions completed last week is", portionsCompletedLastWeek);
        };
        getHourlyMetaRecords();
    }, [hourOfDay]);
    /*!
       @description:Use effect that fecthes the data whenever new data is added to PE table
       @params:
       @return:
       @Comments
       @Coders: Mohan
    */
    useEffect(() => {
        getDailyMetaRecords();
        const subscription = API.graphql(graphqlOperation(onNewPortionEvent)).subscribe({
            next: (data) => {
                const newSensorReading = data.value.data.onNewSensorReading;
                // Handle the new sensor reading, update your state, etc.
                getDailyMetaRecords();
            },
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [selectedIndex, portionsCompletedLastWeek]);
    useEffect(() => {
        const handleResize = () => {
            setIsMobileDevice(window.innerWidth < 1200);
        };

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);

        // Initial check on component mount
        handleResize();

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [portionsCompletedLastWeek]);

    // UseEffect to change layout for mobile devices
    // useEffect(() => {
    //     const handleResize = () => {
    //         setIsMobileDevice(window.innerWidth < 1100);
    //     };
    //     window.addEventListener("resize", handleResize);

    //     handleResize();

    //     return () => {
    //         window.removeEventListener("resize", handleResize);
    //     };
    // }, []);

    const convertGsToOz = (val) => {
        return (parseInt(val) / 28.35).toFixed(2).toString();
    };
    return (
        <DashboardLayout>
            {/* TODO: ADD Style such that title gets centered with media query (textAlign) */}
            <DropDownIngredientMenu options={options} titleForPage={"Real-Time Report"} />

            {!isMobileDevice && (
                <div style={{ height: "85vh" }}>
                    <MDBox py={3}>
                        <Grid container spacing={1} display="flex" justifyContent="center">
                            <Tooltip title="Portions Completed for Today" placement="bottom">
                                <Grid item xs={12} md={6} lg={3}>
                                    <ComplexStatisticsCard color="dark" title={portionCompleteTitle} icon={<PanToolIcon />} count={cardSummaryItems[0]} />
                                </Grid>
                            </Tooltip>
                        </Grid>
                    </MDBox>

                    <MDBox py={2}>
                        <Grid container spacing={3} display="flex" justifyContent="center">
                            <Tooltip title="Average Portioning Precision for Today" placement="bottom">
                                <Grid item xs={12} md={6} lg={3}>
                                    <MDBox mb={1.5}>
                                        <ComplexStatisticsCard
                                            color="info"
                                            icon={<PrecisionManufacturingRoundedIcon />}
                                            title={portionPrecisionTitle}
                                            count={cardSummaryItems[1]}
                                            percentage={{
                                                color: "success",
                                                amount: differencePrecision >= 0 ? "+" + differencePrecision.toFixed(0) + "%" : differencePrecision.toFixed(0) + "%",
                                                label: "than last week",
                                            }}
                                        />
                                    </MDBox>
                                </Grid>
                            </Tooltip>
                            <Tooltip title="Total Consumed Inventory for Today" placement="bottom">
                                <Grid item xs={12} md={6} lg={3}>
                                    <MDBox mb={1.5}>
                                        <ComplexStatisticsCard
                                            color="warning"
                                            icon={<ScaleRoundedIcon />}
                                            title={inventoryConsumedTitle}
                                            count={unitOfMass == "g" ? cardSummaryItems[2] : (parseInt(cardSummaryItems[2]) / 28.35).toFixed(2).toString() + "oz"}
                                            percentage={{
                                                color: "success",
                                                amount: differenceInventory >= 0 ? "+" + differenceInventory + "g" : differenceInventory + "g",
                                                label: "than last week",
                                            }}
                                        />
                                    </MDBox>
                                </Grid>
                            </Tooltip>
                            <Tooltip title="Average Time Taken to Complete Portions " placement="bottom">
                                <Grid item xs={12} md={6} lg={3}>
                                    <MDBox mb={1.5}>
                                        <ComplexStatisticsCard
                                            color="success"
                                            icon={<AccessTimeFilledRoundedIcon />}
                                            title={portionTimeTitle}
                                            count={cardSummaryItems[3]}
                                            percentage={{
                                                color: "success",
                                                amount: differenceCompletionTime >= 0 ? "+" + differenceCompletionTime.toFixed(1) + "s" : differenceCompletionTime.toFixed(1) + "s",
                                                label: "than last week",
                                            }}
                                        />
                                    </MDBox>
                                </Grid>
                            </Tooltip>
                        </Grid>
                        <MDBox mt={4.75}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6} lg={4}>
                                    <Tooltip title="Precision of Portioning for the Last 7 Events" placement="bottom">
                                        <MDBox mb={3}>{generatePrecisionChartResponsive(false)}</MDBox>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <Tooltip title="Serving Tendency of Portions" placement="bottom">
                                        <MDBox mb={3}>{generateDoughnutChartResponsive(false)}</MDBox>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <Tooltip title="Completion Time for the Last 7 Events" placement="bottom">
                                        <MDBox mb={3}>{generateTimeLineChartResponsive(false)}</MDBox>
                                    </Tooltip>
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
                                <ComplexStatisticsCard color="dark" icon={<PanToolIcon />} title={portionCompleteTitle} count={cardSummaryItems[0]} />
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <MobileComplexStatisticsCard
                                    color="info"
                                    icon={<PrecisionManufacturingRoundedIcon />}
                                    title={portionPrecisionTitle}
                                    count={cardSummaryItems[1]}
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
                                        amount: differenceCompletionTime >= 0 ? "+" + differenceCompletionTime.toFixed(1) + "s" : differenceCompletionTime.toFixed(1) + "s",
                                        label: "than last week",
                                    }}
                                    generateChart={() => generateTimeLineChartResponsive(true)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <MobileComplexStatisticsCard
                                    color="warning"
                                    icon={<PrecisionManufacturingRoundedIcon />}
                                    title={inventoryConsumedTitle}
                                    count={cardSummaryItems[2]}
                                    percentage={{
                                        color: "success",
                                        amount: differenceInventory >= 0 ? "+" + differenceInventory + "g" : differenceInventory + "g",
                                        label: "than last week",
                                    }}
                                    generateChart={() => generateDoughnutChartResponsive(true)}
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
