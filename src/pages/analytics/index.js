// React Imports
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// MUI material components
import Grid from "@mui/material/Grid";
import PanToolIcon from "@mui/icons-material/PanTool";
import ScaleRoundedIcon from "@mui/icons-material/ScaleRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import PrecisionManufacturingRoundedIcon from "@mui/icons-material/PrecisionManufacturingRounded";

// Material Dashboard
import { Tooltip } from "@mui/material";
import MDBox from "../../components/MDBox";
import Footer from "../../components/Footer";
import BasicDatePicker from "../../components/DatePicker";
import DropDownIngredientMenu from "../../components/DropDownIngredientMenu";
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import ZoomableChart from "./components/ZoomableChart.mjs";
import Dropdown from "./components/Dropdown";
import ComplexStatisticsCard from "../../components/Cards/StatisticsCards/ComplexStatisticsCard";

// AWS Imports
import { API, graphqlOperation } from "aws-amplify";
import { getDay, getPortionEvent, listDays, listPortionEvents } from "../../graphql/queries";

// User Components
import PortionTimeLineChart from "./components/PortionTimeLineChart";
import PortionPrecisionChart from "./components/PortionPrecisionChart";
import PortionAccuracyDoughnutChart from "./components/PortionAccuracyDoughnutChart";
import MobileComplexStatisticsCard from "./components/MobileComplexStatisticsCard";

// External Libraries
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useSelector } from "react-redux";
import timezone from "dayjs/plugin/timezone";
import toObject from "dayjs/plugin/toObject.js";
import dayOfYear from "dayjs/plugin/dayOfYear.js";
// import { setSelectedIndex } from "../../redux/metaSlice";
// import { difference, sum } from "d3-array";
// import { ListItemIcon } from "@mui/material";

// DayJS Configuration
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
        precisionGraph: {
            labels: [],
            portionEvent: { label: "Inventory Weight", data: [], yAxisLabel: "Grams" },
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
const AnalyticsContainer = () => {
    // Main Component State: Cards & Graphs
    const clientDemo = useSelector((state) => state.meta.demo);
    const timeZone = useSelector((state) => state.meta.timeZone);
    const unitOfMass = useSelector((state) => state.meta.unitOfMass);
    const iotThingNames = useSelector((state) => state.meta.iotThingNames);
    const displayIngredientIndex = useSelector((state) => state.meta.displayIngredient);

    const portionPrecisionTitle = "Precision Levels";
    const portionCompleteTitle = "Portions Completed";
    const portionTimeTitle = "Average Completion Time";
    const inventoryConsumedTitle = "Inventory Consumed";

    const [date, setDate] = useState(dayjs(""));
    const [cardSummaryItems, setCardSummaryItems] = useState([]);
    const [isMobileDevice, setIsMobileDevice] = useState(false);
    const [realTimeAccuracyGraph, setRealTimeAccuracyGraph] = useState([]);
    const [realTimePrecisionGraph, setRealTimePrecisionGraph] = useState([]);
    const [realTimeInventoryGraph, setRealTimeInventoryGraph] = useState([]);
    const [dashboardGraph, setDashboardGraph] = useState([]);
    const [displayData, setDisplayData] = useState([]);

    // Chart Related Variables
    const accuracyGraph = createDoughnutChartObject();
    const { precisionGraph, inventoryGraph } = createReportLineChartObject();

    // Drop-Down Menu State
    const options = Object.values(iotThingNames);
    const selectedIndexRef = { current: displayIngredientIndex.toString() };
    const selectedIndex = displayIngredientIndex;
    const keys = Object.keys(iotThingNames);

    /*!
        @description:
        @params:
        @return:
        @Comments
        @Coders: TheBestCoderInAmerica
    */
    const generatePrecisionChartResponsive = (mobileViewFlag) => {
        return <PortionPrecisionChart color="info" title="Inventory Usage" chart={realTimePrecisionGraph} mobileViewFlag={mobileViewFlag} />;
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
        let xAxis = keys;
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
                    tempWeightAR.push(realTime[keys[i]].inventoryWeight);
                } else {
                    tempWeightAR.push((realTime[keys[i]].inventoryWeight / 28.35).toFixed(2));
                }
                pointBackgroundColorAR.push("rgba(255, 255, 255, .8)");
            }

            // Push Data points to arrays
            tempTimeAR.push(parseFloat(realTime[keys[i]].portionTime).toFixed(1));

            // Convert from Unix Timestamp to Local Time
            keys[i] = dayjs
                .unix(keys[i] / 1000)
                .tz(timeZone)
                .format("YYYY-MM-DD HH:mm");
        }

        // Precision Chart made up of 3 lines
        precisionGraph.labels = keys;
        precisionGraph.portionEvent.data = tempWeightAR;
        //precisionGraph.correctWeight.data = correctWeightAR;
        //precisionGraph.upperLimit.data = upperLimitAR;
        //precisionGraph.lowerLimit.data = lowerLimitAR;
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
       @description:Getting the last key of an object and adding millisecond  to create an event with inventory weight of zero
       @params:
       @return:
       @Comments
       @Coders:Rohan
    */
    const getNewKey = (portionEvents) => {
        const sortedKeys = Object.keys(portionEvents)
            .map(Number)
            .sort((a, b) => a - b);
        let newKey = parseInt(sortedKeys[sortedKeys.length - 1]) + 200000;
        let keyBefore = parseInt(sortedKeys[0]) - 200000;
        return [keyBefore.toString(), newKey.toString()];
    };

    /*!
       @description:
       @params:
       @return:
       @Comments
       @Coders: Jungler333
    */
    const getHourlyMetaRecords = async () => {
        let precision = 0,
            inventoryConsumed = 0,
            timeSaved = 0,
            portionsCompleted = 0,
            underPercent = 0,
            overPercent = 0,
            perfectPercent = 0,
            dashboardGraph = {},
            scaleActions = {},
            response;
        try {
            // Query GQL to pull hourly data
            console.log("waaa", dayjs(date.$d).dayOfYear());
            // if (date[0].dayOfYear() == date[1].dayOfYear()) {
            response = await API.graphql({
                query: getDay,
                //variables: { dayOfYear_iotNameThing: daysOfYear_iotNameThing[0] }, // Provide the ID as a variable
                variables: {
                    dayOfYear_iotNameThing: dayjs(date.$d).dayOfYear() + "_" + keys[selectedIndexRef.current],
                },
            });
            console.log("Response is:", response);
            if (response.data.getDay) {
                console.log("response: ", response);
                precision = response.data.getDay.dailySummary.precision;
                inventoryConsumed = response.data.getDay.dailySummary.inventoryConsumed;
                timeSaved = response.data.getDay.dailySummary.averageTime;
                portionsCompleted = response.data.getDay.dailySummary.portionsCompleted;
                underPercent = Math.round((response.data.getDay.dailySummary.underServed / portionsCompleted) * 100);
                perfectPercent = Math.round((response.data.getDay.dailySummary.perfect / portionsCompleted) * 100);
                overPercent = Math.round((response.data.getDay.dailySummary.overServed / portionsCompleted) * 100);
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
                dashboardGraph = JSON.parse(response.data.getDay.allPortionEvents);
                scaleActions = JSON.parse(response.data.getDay.scaleActions);
                let action = Object.values(scaleActions);
                let time = Object.keys(scaleActions);
                // for (let i = 0; i < action.length; i++) {
                //     if (action[i].eventType == "StartAction") {
                //         dashboardGraph[time[i]] = { inventoryWeight: action[i].inventoryWeight };
                //     }
                //     if (action[i].eventType == "disconnected") {
                //         dashboardGraph[time[i]] = { inventoryWeight: action[i].inventoryWeight };
                //     }
                // }
                const sortedKeys = Object.keys(dashboardGraph).sort((a, b) => parseInt(a) - parseInt(b));
                const sortedObject = {};
                sortedKeys.forEach((key) => {
                    sortedObject[key] = dashboardGraph[key];
                });
                dashboardGraph = sortedObject;
                setDashboardGraph(dashboardGraph);
                console.log("The Dashboard graph is:", dashboardGraph);
            }
            // } else {
            //     response = await API.graphql({
            //         query: listDays,
            //         variables: {
            //             filter: {
            //                 createdAt: {
            //                     between: [date[0].format("YYYY-MM-DD"), date[1].format("YYYY-MM-DD")],
            //                 },
            //                 dayOfYear_iotNameThing: { contains: keys[selectedIndexRef.current] },
            //             },
            //         },
            //     });
            //     if (response.data.listDays) {
            //         console.log("response: ", response);
            //         let data = response.data.listDays.items;
            //         for (let i = 0; i < data.length; i++) {
            //             accuracy += data[i].dailySummary.accuracy;
            //             portionsCompleted += data[i].dailySummary.portionsCompleted;
            //             inventoryConsumed += data[i].dailySummary.inventoryConsumed;
            //             timeSaved += data[i].dailySummary.averageTime;
            //             perfectPercent += parseInt((data[i].dailySummary.perfect / data[i].dailySummary.portionsCompleted) * 100);
            //             underPercent += parseInt((data[i].dailySummary.underServed / data[i].dailySummary.portionsCompleted) * 100);
            //             overPercent += parseInt((data[i].dailySummary.overServed / data[i].dailySummary.portionsCompleted) * 100);
            //             scaleActions = JSON.parse(data[i].scaleActions);
            //             let action = Object.values(scaleActions);
            //             let time = Object.keys(scaleActions);
            //             // for (let k = 0; k < action.length; k++) {
            //             //     if (action[k].eventType == "StartAction") {
            //             //         dashboardGraph[time[k]] = { inventoryWeight: action[k].inventoryWeight };
            //             //     }
            //             //     if (action[k].eventType == "disconnected") {
            //             //         dashboardGraph[time[k]] = { inventoryWeight: action[k].inventoryWeight };
            //             //     }
            //             // }
            //             dashboardGraph = { ...dashboardGraph, ...JSON.parse(data[i].allPortionEvents) };
            //         }
            //         const sortedKeys = Object.keys(dashboardGraph).sort((a, b) => parseInt(a) - parseInt(b));
            //         const sortedObject = {};
            //         sortedKeys.forEach((key) => {
            //             sortedObject[key] = dashboardGraph[key];
            //         });
            //         dashboardGraph = sortedObject;
            //         setDashboardGraph(dashboardGraph);
            //         setDashboardGraph(dashboardGraph);

            //         perfectPercent = perfectPercent / data.length;
            //         underPercent = underPercent / data.length;
            //         overPercent = overPercent / data.length;
            //         timeSaved = timeSaved / data.length;
            //         accuracy = accuracy / data.length;
            //     }
            // }

            let demo = false;
            console.log("The scale actions are:", Object.values(scaleActions));

            // If Demo, then display hard-coded data

            if (response.data.getDay || response.data.listDays) {
                // Set the Upper Summary Card Components
                precision = precision.toFixed(0) + "%";
                inventoryConsumed = inventoryConsumed + "g";
                timeSaved = timeSaved.toFixed(1) + "s";
                setCardSummaryItems([portionsCompleted, precision, inventoryConsumed, timeSaved]);

                // Add Percentages
                underPercent = parseInt(underPercent);
                perfectPercent = parseInt(perfectPercent);
                overPercent = parseInt(overPercent);
                generateLowerRealTimeGraphs(dashboardGraph, [underPercent, perfectPercent, overPercent]);
            } else {
                // There is no hourly response so add placeholders
                setCardSummaryItems(["0", "NA", "0", "NA"]);
                setRealTimePrecisionGraph([]);
                setRealTimeAccuracyGraph([]);
                setRealTimeInventoryGraph([]);
                return;
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
    }, [date, displayData]);
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
    }, []);

    const convertGsToOz = (val) => {
        return (parseInt(val) / 28.35).toFixed(2).toString();
    };
    console.log("the display data is:", displayData);
    return (
        <DashboardLayout>
            {/* TODO: ADD Style such that title gets centered with media query (textAlign) */}
            <DropDownIngredientMenu options={options} titleForPage={"Past Inventory Report"} />
            <BasicDatePicker titleForPage={""} date={date} setDate={setDate} />

            {!isMobileDevice && (
                <div style={{ height: "85vh" }}>
                    <MDBox py={3}>
                        <Grid container spacing={1} display="flex" justifyContent="center">
                            <Tooltip title="Portions Completed for Today" placement="bottom">
                                <Grid item xs={12} md={6} lg={3}>
                                    <ComplexStatisticsCard
                                        color="dark"
                                        title={portionCompleteTitle}
                                        icon={<PanToolIcon />}
                                        count={cardSummaryItems[0]}
                                        percentage={{
                                            color: "success",
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
                                            }}
                                        />
                                    </MDBox>
                                </Grid>
                            </Tooltip>
                        </Grid>
                        <MDBox mt={4.75}>
                            <Grid container spacing={3} justifyContent={"center"}>
                                <Grid item xs={12} md={4} lg={6}>
                                    <Tooltip title="Inventory Usage" placement="bottom">
                                        <div style={{ width: "100%", height: "100%" }}>
                                            <ZoomableChart dataSet={dashboardGraph == 0 ? null : dashboardGraph} />
                                        </div>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4}>
                                    <Tooltip title="Serving Tendency of Portions" placement="bottom">
                                        <div style={{ width: "100%", height: "100%" }}>{generateDoughnutChartResponsive(false)}</div> {/* Adjust the height and width as needed */}
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

AnalyticsContainer.propTypes = {
    iotThingNames: PropTypes.object,
    unitOfMass: PropTypes.string,
    displayIngredientIndex: PropTypes.number,
    timeZone: PropTypes.string,
    clientDemo: PropTypes.bool,
};

export default AnalyticsContainer;
