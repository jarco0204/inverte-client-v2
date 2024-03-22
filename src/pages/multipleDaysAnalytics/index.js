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
import MultipleDatePicker from "../../components/RangePicker";
import DropDownIngredientMenu from "../../components/DropDownIngredientMenu";
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import ComplexStatisticsCard from "../../components/Cards/StatisticsCards/ComplexStatisticsCard";

// AWS Imports
import { API, Auth } from "aws-amplify";

// User Components
import PortionAccuracyDoughnutChart from "./components/PortionAccuracyDoughnutChart";

// External Libraries
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useSelector } from "react-redux";
import timezone from "dayjs/plugin/timezone";
import toObject from "dayjs/plugin/toObject.js";
import dayOfYear from "dayjs/plugin/dayOfYear.js";
import VerticalBarChart from "../../components/Charts/BarCharts/VerticalBarChart/index";
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
        labels: ["Under Serving", "Over Serving", "Perfect"],
        datasets: { label: "Percent (%)", data: [] },
        pointBackgroundColorAR: ["#0693e3", "rgba(236,65,1,1)", "rgba(83, 212, 88, 1)"],
    };
};

/*!
   @description: Main Dashboard container that displays portion event information to user. 
   @params:
   @return:
   @Comments
   @Coders: GangaLi
*/
const MultipleDaysAnalyticsContainer = () => {
    // Main Component State: Cards & Graphs
    let iotNameThing = [];
    let options = [];
    for (let i = 0; i < useSelector((state) => state.meta.scale.items).length; i++) {
        iotNameThing.push(useSelector((state) => state.meta.scale.items[i].scaleName));
        options.push(useSelector((state) => state.meta.scale.items[i].ingredient));
    }
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
    const [cardSummaryItems, setCardSummaryItems] = useState(["0", "NA", "0", "NA"]);
    const [isMobileDevice, setIsMobileDevice] = useState(false);
    const [realTimeAccuracyGraph, setRealTimeAccuracyGraph] = useState([]);
    const [realTimePrecisionGraph, setRealTimePrecisionGraph] = useState([]);
    const [realTimeInventoryGraph, setRealTimeInventoryGraph] = useState([]);
    const [barChartData, setBarChartData] = useState([]);
    const [displayData, setDisplayData] = useState([]);

    // Chart Related Variables
    const accuracyGraph = createDoughnutChartObject();
    const { precisionGraph, inventoryGraph } = createReportLineChartObject();

    // Drop-Down Menu State
    const selectedIndexRef = { current: displayIngredientIndex.toString() };
    const selectedIndex = displayIngredientIndex;

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
    @Coders:
    */
    const generateBarChartResponsive = (mobileViewFlag, unitOfMass) => {
        return <VerticalBarChart chart={barChartData} color="light" title="Daily metrics" mobileViewFlag={mobileViewFlag} unitOfMass={unitOfMass} />;
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
       @Coders: Rohan-16
    */
    const getMultipleDayMetaRecords = async () => {
        let dashboardGraph = {},
            cardData = [],
            barChartData,
            doughnutData;
        try {
            // Query GQL to pull hourly data
            // If data is before Jan 2024, pull from another table

            const user = await Auth.currentAuthenticatedUser();
            try {
                const AMPLIFY_API = process.env.REACT_APP_AMPLIFY_API_NAME;
                const path = "/multipleDays/";
                const finalAPIRoute = path + user.username;
                let newEndDate = new Date(date[1]);
                newEndDate.setDate(newEndDate.getDate() + 1);
                console.log("The day of year for start date is:", newEndDate);
                await API.get(AMPLIFY_API, finalAPIRoute, {
                    queryStringParameters: {
                        startDate: new Date(date[0]).toISOString().split("T")[0],
                        endDate: new Date(newEndDate).toISOString().split("T")[0],
                        iotName: iotNameThing[selectedIndexRef.current],
                    },
                }).then((response) => {
                    console.log("The meta that we pull from analytics: ", response); //Debug statement
                    barChartData = response[4];
                    doughnutData = [response[5], response[6], response[7]];
                    cardData = [response[0], response[1], response[2], response[3]];
                    setCardSummaryItems(cardData);
                    setBarChartData(barChartData);
                    generateLowerRealTimeGraphs(dashboardGraph, doughnutData);
                    if (response.item.Item == undefined) {
                        throw new Error("No Response from API");
                    }
                });
            } catch (err) {
                console.log(err);
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
        getMultipleDayMetaRecords();
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
    return (
        <DashboardLayout>
            {/* TODO: ADD Style such that title gets centered with media query (textAlign) */}
            <DropDownIngredientMenu options={options} titleForPage={"Past Period Inventory Report"} />
            <MultipleDatePicker titleForPage={""} date={date} setDate={setDate} />

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
                            <Grid item xs={12} md={6} lg={8}>
                                <div style={{ width: "100%", height: "60%" }}>{generateBarChartResponsive(false, unitOfMass)}</div>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                                <Tooltip title="Serving Tendency of Portions" placement="bottom">
                                    <div style={{ width: "100%", height: "100%" }}>{generateDoughnutChartResponsive(false)}</div>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </MDBox>
                </MDBox>
                <Footer />
            </div>
        </DashboardLayout>
    );
};

MultipleDaysAnalyticsContainer.propTypes = {
    iotThingNames: PropTypes.object,
    unitOfMass: PropTypes.string,
    displayIngredientIndex: PropTypes.number,
    timeZone: PropTypes.string,
    clientDemo: PropTypes.bool,
};

export default MultipleDaysAnalyticsContainer;
