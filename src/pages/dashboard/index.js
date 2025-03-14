// Main Imports
import dayjs from "dayjs";
import PropTypes from "prop-types";
import utc from "dayjs/plugin/utc";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import timezone from "dayjs/plugin/timezone";
import toObject from "dayjs/plugin/toObject.js";
import dayOfYear from "dayjs/plugin/dayOfYear.js";

// MUI material components
import Grid from "@mui/material/Grid";
import { Tooltip } from "@mui/material";
import PanToolIcon from "@mui/icons-material/PanTool";
import ScaleRoundedIcon from "@mui/icons-material/ScaleRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import PrecisionManufacturingRoundedIcon from "@mui/icons-material/PrecisionManufacturingRounded";

// General Dashboard Components
import MDBox from "../../components/MDBox";
import Footer from "../../components/Footer";
import DropDownIngredientMenu from "../../components/DropDownIngredientMenu";
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import ComplexStatisticsCard from "../../components/Cards/StatisticsCards/ComplexStatisticsCard";

// User Components
import MobileViewComponent from "./components/MobileViewComponent";
import PortionTimeLineChart from "./components/PortionTimeLineChart";
import PortionPrecisionChart from "./components/PortionPrecisionChart";
import LivePortionWeightComponent from "./components/LivePortionWeightComponent";
import PortionAccuracyDoughnutChart from "./components/PortionAccuracyDoughnutChart";

// AWS Imports
import { API, graphqlOperation } from "aws-amplify";
import { onNewPortionEvent } from "../../graphql/subscriptions";
import { hoursByYear_dayOfYear_iotNameThing_ingredientName } from "../../graphql/queries";

//Queries
import { getDay } from "../../graphql/queries";

// DayJS Configuration
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
// const getDemoData = () => {
//     return {
//         getDay: {
//             dayOfYear_iotNameThing: "228_P0-10-v1",
//             weekOfYear_iotNameThing: "33_P0-10-v1_w",
//             dailySummary: {
//                 accuracy: 93.28,
//                 inventoryConsumed: 1932,
//                 minutesSaved: 971,
//                 portionsCompleted: 73,
//             },
//             realTime: {
//                 "2023-8-16 10:41:48": { portionTime: "5.5", accuracy: "74", portionWeight: "23" },
//                 "2023-8-16 10:47:54": { portionTime: "5", accuracy: "88", portionWeight: "19" },
//                 "2023-8-16 11:00:34": { portionTime: "7.9", accuracy: "82", portionWeight: "22" },
//                 "2023-8-16 10:55:00": { portionTime: "1", accuracy: "100", portionWeight: "20" },
//                 "2023-8-16 10:58:17": { portionTime: "1", accuracy: "100", portionWeight: "20" },
//                 "2023-8-16 9:43:32": { portionTime: "1", accuracy: "82", portionWeight: "22" },
//                 "2023-8-16 10:13:15": { portionTime: "1", accuracy: "100", portionWeight: "17" },
//                 "2023-8-16 12:11:26": { portionTime: "1", accuracy: "100", portionWeight: "18" },
//                 "2023-8-16 12:11:05": { portionTime: "1", accuracy: "100", portionWeight: "17" },
//             },
//         },
//     };
// };

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
    let iotNameThing = [];
    let options = [];
    console.log(
        "The selected index is",
        useSelector((state) => state.meta)
    );
    for (let i = 0; i < useSelector((state) => state.meta.scale.items).length; i++) {
        iotNameThing.push(useSelector((state) => state.meta.scale.items[i].scaleName));
        options.push(useSelector((state) => state.meta.scale.items[i].ingredient));
    }
    const unitOfMass = useSelector((state) => state.meta.unitOfMass);
    const displayIngredientIndex = useSelector((state) => state.meta.displayIngredient);
    const timeZone = useSelector((state) => state.meta.timeZone);
    const clientRestaurantLocationNum = useSelector((state) => state.meta.restaurantLocationNum);
    const clientRestaurantName = useSelector((state) => state.meta.scale.items[displayIngredientIndex].restaurantName);

    const tempDate = dayjs().tz(timeZone); // Local time of Client
    const hourOfDay = tempDate.hour();

    const [isMobileDevice, setIsMobileDevice] = useState(false);
    const [cardSummaryItems, setCardSummaryItems] = useState(["0", "NA", "0", "NA", [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], "0", [0, 0, 0]]);
    const [realTimePrecisionGraph, setRealTimePrecisionGraph] = useState([]);
    const [realTimeAccuracyGraph, setRealTimeAccuracyGraph] = useState([]);
    const [realTimeInventoryGraph, setRealTimeInventoryGraph] = useState([]);

    // Chart Related Variables
    const { precisionGraph, inventoryGraph } = createReportLineChartObject();
    const accuracyGraph = createDoughnutChartObject();

    // Drop-Down Menu State
    const selectedIndexRef = { current: displayIngredientIndex.toString() };
    const selectedIndex = displayIngredientIndex;
    //const keys = Object.keys(iotThingNames);

    //Data from last week
    const [portionsCompletedLastWeek, setPortionsCompletedLastWeek] = useState(null);
    const [inventoryConsumedLastWeek, setInventoryConsumedLastWeek] = useState(0);
    const [completionTimeLastWeek, setCompletionTimeLastWeek] = useState(0);
    const [precisionLastWeek, setPrecisionLastWeek] = useState(0);

    //Difference in portion completed
    // const [differencePortionsCompleted, setDifferencePortionsCompleted] = useState(0);
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
        return <PortionTimeLineChart color="warning" title="Portion Completion Times" chart={realTimeInventoryGraph} mobileViewFlag={mobileViewFlag} />;
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
            if (unitOfMass == "g") {
                upperLimitAR.push(correctWeight + upperLimit);
                lowerLimitAR.push(correctWeight - lowerLimit);
                correctWeightAR.push(correctWeight);
            } else {
                upperLimitAR.push(((correctWeight + upperLimit) / 28.35).toFixed(2));
                lowerLimitAR.push(((correctWeight - lowerLimit) / 28.35).toFixed(2));
                correctWeightAR.push((correctWeight / 28.35).toFixed(2));
            }

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
        console.log("The iot is", iotNameThing[selectedIndexRef.current]);
        try {
            //  Query GQL to pull hourly data by using local time
            let tempDate = dayjs().tz(timeZone);
            const response = await API.graphql({
                query: getDay,
                variables: {
                    year_dayOfYear_iotNameThing_ingredientName:
                        tempDate.year() + "_" + tempDate.dayOfYear().toString() + "_" + iotNameThing[selectedIndexRef.current] + "_" + options[selectedIndexRef.current],
                }, // Provide the ID as a variable
            });
            // let demoData = getDemoData();
            // let demo = false;
            // Demo, then display hard-coded data
            // if (demo) {
            //     // Set the Upper Summary Card Components
            //     setCardSummaryItems([
            //         demoData.getDay.dailySummary.portionsCompleted,
            //         demoData.getDay.dailySummary.accuracy.toFixed(0) + "%",
            //         demoData.getDay.dailySummary.inventoryConsumed + "g",
            //         demoData.getDay.dailySummary.averageTime.toFixed(1) + "s",
            //     ]);
            //     generateLowerRealTimeGraphs(demoData.getDay.realTime, [44, 36, 20]);
            // } else {

            const day = response.data;
            if (day.getDay) {
                console.log("The daily data is ", day.getDay);
                if (day.getDay.dailySummary.portionsCompleted != 0) {
                    // Set the Upper Summary Card Components
                    let precision = Math.abs(day.getDay.dailySummary.precision.toFixed(0)) + "%";
                    let inventoryWeight = day.getDay.dailySummary.inventoryConsumed + "g";
                    let timeSaved = day.getDay.dailySummary.averageTime.toFixed(1) + "s";
                    let mistakes = day.getDay.dailySummary.mistake;
                    let precisionP1 = Math.abs(day.getDay.portionSize1.precision.toFixed(0)) + "%";
                    let inventoryConsumedP1 = day.getDay.portionSize1.inventoryConsumed + "g";
                    let portionsCompletedP1 = day.getDay.portionSize1.portionsCompleted;
                    let timeSavedP1 = day.getDay.portionSize1.averageTime.toFixed(1) + "s";
                    let mistakesP1 = day.getDay.portionSize1.mistake;
                    let precisionP2 = Math.abs(day.getDay.portionSize2.precision.toFixed(0)) + "%";
                    let mistakesP2 = day.getDay.portionSize2.mistake;
                    let inventoryConsumedP2 = day.getDay.portionSize2.inventoryConsumed + "g";
                    let portionsCompletedP2 = day.getDay.portionSize2.portionsCompleted;
                    let timeSavedP2 = day.getDay.portionSize2.averageTime.toFixed(1) + "s";
                    let precisionP3 = Math.abs(day.getDay.portionSize3.precision.toFixed(0)) + "%";
                    let inventoryConsumedP3 = day.getDay.portionSize3.inventoryConsumed + "g";
                    let portionsCompletedP3 = day.getDay.portionSize3.portionsCompleted;
                    let mistakesP3 = day.getDay.portionSize3.mistake;
                    let timeSavedP3 = day.getDay.portionSize3.averageTime.toFixed(1) + "s";
                    setCardSummaryItems([
                        day.getDay.dailySummary.portionsCompleted,
                        precision,
                        inventoryWeight,
                        timeSaved,
                        [portionsCompletedP1, portionsCompletedP2, portionsCompletedP3],
                        [precisionP1, precisionP2, precisionP3],
                        [inventoryConsumedP1, inventoryConsumedP2, inventoryConsumedP3],
                        [timeSavedP1, timeSavedP2, timeSavedP3],
                        mistakes,
                        [mistakesP1, mistakesP2, mistakesP3],
                    ]);
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
                    setDifferencePrecision(Math.abs(day.getDay.dailySummary.precision) - precisionLastWeek);
                    if (unitOfMass == "g") {
                        setDifferenceInventory(day.getDay.dailySummary.inventoryConsumed - inventoryConsumedLastWeek);
                    } else {
                        setDifferenceInventory(((day.getDay.dailySummary.inventoryConsumed - inventoryConsumedLastWeek) / 28.35).toFixed(2));
                    }
                    setDifferenceCompletionTime(day.getDay.dailySummary.averageTime - completionTimeLastWeek);
                }
            } else {
                // There is no hourly response so add placeholders
                setRealTimePrecisionGraph([]);
                setRealTimeAccuracyGraph([]);
                setRealTimeInventoryGraph([]);
                setDifferenceCompletionTime(0);
                setDifferenceInventory(0);
                setDifferencePrecision(0);
                return;
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
                query: hoursByYear_dayOfYear_iotNameThing_ingredientName,
                variables: {
                    year_dayOfYear_iotNameThing_ingredientName: (tempDate.dayOfYear() - 7).toString() + "_" + iotNameThing[selectedIndexRef.current],
                }, // Provide the ID as a variable
            });
            const data = response.data.hoursByYear_dayOfYear_iotNameThing_ingredientName.items;
            let tempPortionCompleted = 0;
            let tempPrecision = 0;
            let tempInventory = 0;
            let tempCompletion = 0;
            let validHourCounter = 0;
            for (let i = 0; i < data.length; i++) {
                const hour = data[i].dayOfYear_hourOfDay_iotNameThing.split("_");
                if (parseInt(hour[1]) <= hourOfDay) {
                    tempPortionCompleted += data[i].hourlySummary.portionsCompleted;
                    tempPrecision += data[i].hourlySummary.precision;
                    tempInventory += data[i].hourlySummary.inventoryConsumed;
                    tempCompletion += data[i].hourlySummary.averageTime;
                    validHourCounter++;
                }
            }
            setPortionsCompletedLastWeek(tempPortionCompleted);
            if (tempPrecision != 0) {
                setPrecisionLastWeek(tempPrecision / validHourCounter);
            }
            setInventoryConsumedLastWeek(tempInventory);
            if (tempCompletion != 0) {
                setCompletionTimeLastWeek(tempCompletion / validHourCounter);
            }
            //console.log("The number of portions completed last week is", portionsCompletedLastWeek);
        };
        getHourlyMetaRecords();
    }, [hourOfDay, displayIngredientIndex]);

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

    /*!
       @description:
       @params:
       @return:
       @Comments
       @Coders: Mohan
    */
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

    /*!
       @description:
       @params:
       @return:
       @Comments: 
       @Coders: Mohan
    */
    const convertGsToOz = (val) => {
        return (parseInt(val) / 28.35).toFixed(2).toString();
    };

    /*!
       @description: Concise data structures to hold titles and elements for Mobile Component
       @params:
       @return:
       @Comments
       @Coders: BiggiePac
    */
    const dashboardTitles = {
        portionsComplete: "Portions Completed",
        portionsPrecision: "Precision Levels",
        portionsTime: "Average Completion Time",
        inventoryConsumed: "Inventory Consumed",
        mistakesTitle: "Mistakes",
    };
    const dataForMObileView = {
        cardSummaryItems: cardSummaryItems,
        differencePrecision: differencePrecision,
        differenceCompletionTime: differenceCompletionTime,
        differenceInventory: differenceInventory,
    };

    // Return Main Dashboard Container
    return (
        <DashboardLayout>
            <DropDownIngredientMenu options={options} titleForPage={"Today's Report"} />

            {isMobileDevice ? (
                <MobileViewComponent
                    generatePrecisionChartResponsive={generatePrecisionChartResponsive}
                    generateTimeLineChartResponsive={generateTimeLineChartResponsive}
                    generateDoughnutChartResponsive={generateDoughnutChartResponsive}
                    dashboardTitles={dashboardTitles}
                    dataForMObileView={dataForMObileView}
                />
            ) : (
                <>
                    <MDBox py={3}>
                        <Grid container spacing={1} display="flex" justifyContent="center">
                            <Tooltip title="Portions Completed for Today" placement="bottom">
                                <Grid item xs={12} md={6} lg={3}>
                                    <ComplexStatisticsCard
                                        color="dark"
                                        title={dashboardTitles.portionsComplete}
                                        icon={<PanToolIcon />}
                                        count={cardSummaryItems[0]}
                                        percentage={{
                                            color: "success",
                                            portionSize1: cardSummaryItems[4][0],
                                            portionSize2: cardSummaryItems[4][1],
                                            portionSize3: cardSummaryItems[4][2],
                                            food1: "Add-on: ",
                                            food2: "Nachos:",
                                        }}
                                    />
                                </Grid>
                            </Tooltip>
                            <Tooltip title="Mistakes for the day" placement="bottom">
                                <Grid item xs={12} md={6} lg={3}>
                                    <ComplexStatisticsCard
                                        color="dark"
                                        title={dashboardTitles.mistakesTitle}
                                        icon={<PanToolIcon />}
                                        count={cardSummaryItems[8]}
                                        percentage={{
                                            color: "success",
                                            portionSize1: cardSummaryItems[9][0],
                                            portionSize2: cardSummaryItems[9][1],
                                            portionSize3: cardSummaryItems[9][2],
                                            food1: "Add-on: ",
                                            food2: "Nachos:",
                                        }}
                                    />
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
                                            title={dashboardTitles.portionsPrecision}
                                            count={cardSummaryItems[1]}
                                            percentage={{
                                                color: "success",
                                                portionSize1: cardSummaryItems[5][0],
                                                portionSize2: cardSummaryItems[5][1],
                                                portionSize3: cardSummaryItems[5][2],
                                                food1: "Add-on: ",
                                                food2: "Nachos:",
                                            }}
                                        />
                                    </MDBox>
                                </Grid>
                            </Tooltip>
                            <Tooltip title="Total Consumed Inventory for Today" placement="bottom">
                                <Grid item xs={12} md={6} lg={3}>
                                    <MDBox mb={1.5}>
                                        <ComplexStatisticsCard
                                            color="success"
                                            icon={<ScaleRoundedIcon />}
                                            title={dashboardTitles.inventoryConsumed}
                                            count={unitOfMass == "g" ? cardSummaryItems[2] : parseFloat(convertGsToOz(cardSummaryItems[2])) + "oz"}
                                            percentage={{
                                                color: "success",
                                                portionSize1: unitOfMass == "g" ? cardSummaryItems[6][0] : parseFloat(convertGsToOz(cardSummaryItems[6][0])) + "oz",
                                                portionSize2: unitOfMass == "g" ? cardSummaryItems[6][1] : parseFloat(convertGsToOz(cardSummaryItems[6][1])) + "oz",
                                                portionSize3: unitOfMass == "g" ? cardSummaryItems[6][2] : parseFloat(convertGsToOz(cardSummaryItems[6][2])) + "oz",
                                                food1: "Add-on: ",
                                                food2: "Nachos:",
                                            }}
                                        />
                                    </MDBox>
                                </Grid>
                            </Tooltip>
                            <Tooltip title="Average Time Taken to Complete Portions " placement="bottom">
                                <Grid item xs={12} md={6} lg={3}>
                                    <MDBox mb={1.5}>
                                        <ComplexStatisticsCard
                                            color="warning"
                                            icon={<AccessTimeFilledRoundedIcon />}
                                            title={dashboardTitles.portionsTime}
                                            count={cardSummaryItems[3]}
                                            percentage={{
                                                color: "success",
                                                portionSize1: cardSummaryItems[7][0],
                                                portionSize2: cardSummaryItems[7][1],
                                                portionSize3: cardSummaryItems[7][2],
                                                food1: "Add-on: ",
                                                food2: "Nachos:",
                                            }}
                                        />
                                    </MDBox>
                                </Grid>
                            </Tooltip>
                        </Grid>
                        <MDBox mt={3.5}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6} lg={4}>
                                    <Tooltip title="Final Portion Weight After Inverte Guidance" placement="bottom">
                                        <MDBox mb={3}>{generatePrecisionChartResponsive(false)}</MDBox>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <Tooltip title="Tendency of Portioning Based on the First Grab" placement="bottom">
                                        <MDBox mb={3}>{generateDoughnutChartResponsive(false)}</MDBox>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <Tooltip title="Completion Time for the Last 7 Portions" placement="bottom">
                                        <MDBox mb={3}>{generateTimeLineChartResponsive(false)}</MDBox>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </MDBox>
                    </MDBox>
                </>
            )}
            <LivePortionWeightComponent iotNameThing={iotNameThing[selectedIndexRef.current]} timeZone={timeZone} unitOfMass={unitOfMass} />
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
