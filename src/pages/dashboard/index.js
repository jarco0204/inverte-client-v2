import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // prop-types is a library for typechecking of props.

// @mui material components
import Grid from "@mui/material/Grid";
import PanToolIcon from "@mui/icons-material/PanTool";
import PrecisionManufacturingRoundedIcon from "@mui/icons-material/PrecisionManufacturingRounded";
import ScaleRoundedIcon from "@mui/icons-material/ScaleRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";
//eslint-disable-next-line
import Chart from "chart.js/auto";

// Material Dashboard
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../components/Navbars/DashboardNavbar";
import Footer from "../../components/Footer";
import ReportsLineChart from "../../components/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "../../components/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsLineChartData from "./data/reportsLineChartData";

// AWS & other libraries
import { API } from "aws-amplify";
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear.js";
import toObject from "dayjs/plugin/toObject.js";
dayjs.extend(dayOfYear);
dayjs.extend(toObject);

/*
    Main Dashboard container that displays portion event information to user. 

    @params: Array of the IoT Thing Devices associated with RestaurantID
*/
function DashboardContainer({ iotThingNames }) {
    console.log("The things are:", iotThingNames);
    // Component State
    const [cardSummaryItems, setCardSummaryItems] = useState([]);
    const [realTimeWeight, setRealTimeWeight] = useState([]);
    const [realTimeAccuracy, setRealTimeAccuracy] = useState([]);
    const [realTimePortionTime, setRealTimePortionTime] = useState([]);
    //Adding dropdown menu for scales
    const options = iotThingNames;
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    // Line Chart UI element
    const { weightGraph, accuracyGraph, portionTimeGraph } = reportsLineChartData;

    /*
        Hook to Fetch Daily information from Dynamo using Amplify Backend 
    */
    useEffect(() => {
        const getScaleIDAndDailySummary = async () => {
            try {
                let path = "/daily/";
                const finalAPIRoute = path + iotThingNames[selectedIndex];
                // console.log("Your API Route :", finalAPIRoute); // debug statement

                // Get daily-hourly summary
                let tempDate = dayjs(); // Local time of Client
                await API.get(process.env.REACT_APP_AMPLIFY_API_NAME, finalAPIRoute, {
                    queryStringParameters: {
                        dayOfYear: tempDate.dayOfYear().toString(),
                        hourOfDay: tempDate.hour().toString(),
                        iotNameThing: iotThingNames[selectedIndex],
                    },
                })
                    .then(async (response) => {
                        console.log("Your response from Daily Hour API Call: ", response); // Debug Statement
                        if (response.daily) {
                            let accuracy = response.daily.hourlySummary.accuracy + "%";
                            let inventoryWeight;
                            if (response.daily.hourlySummary.inventoryConsumed < 0) {
                                inventoryWeight = "0g";
                            } else {
                                inventoryWeight = response.daily.hourlySummary.inventoryConsumed + "g";
                            }
                            let timeSaved = "+" + response.daily.hourlySummary.minutesSaved;
                            setCardSummaryItems([response.daily.hourlySummary.portionsCompleted, accuracy, inventoryWeight, timeSaved]);

                            // Second part of the algorithm involves setting the data arrays for graphs
                            // console.log("Your returned real-time object: ", response.daily.realTime); // Debug Statement
                            let tempKeys = Object.keys(response.daily.realTime).sort();
                            let [tempWeightAr, tempAccuracyAr, tempTimeAr] = [[], [], []];
                            let pointBackgroundColorAr = [];

                            for (let i = 0; i < tempKeys.length; i++) {
                                if (response.daily.realTime[tempKeys[i]].portionWeight < 0) {
                                    tempWeightAr.push(response.daily.realTime[tempKeys[i]].portionWeight);
                                    pointBackgroundColorAr.push("rgba(55, 55, 55, .8)");
                                } else {
                                    tempWeightAr.push(response.daily.realTime[tempKeys[i]].portionWeight);
                                    pointBackgroundColorAr.push("rgba(255, 255, 255, .8)");
                                }

                                tempAccuracyAr.push(response.daily.realTime[tempKeys[i]].accuracy);
                                tempTimeAr.push(response.daily.realTime[tempKeys[i]].portionTime.toFixed(1));
                            }

                            weightGraph.labels = tempKeys;
                            weightGraph.datasets.data = tempWeightAr;
                            weightGraph.pointBackgroundColorAr = pointBackgroundColorAr;

                            accuracyGraph.labels = tempKeys;
                            accuracyGraph.datasets.data = tempAccuracyAr;
                            accuracyGraph.pointBackgroundColorAr = pointBackgroundColorAr;

                            portionTimeGraph.labels = tempKeys;
                            portionTimeGraph.datasets.data = tempTimeAr;
                            portionTimeGraph.pointBackgroundColorAr = pointBackgroundColorAr;

                            setRealTimeWeight(weightGraph);
                            setRealTimeAccuracy(accuracyGraph);
                            setRealTimePortionTime(portionTimeGraph);
                        } else {
                            //  Scale has been inactive
                            setCardSummaryItems(["0", "NA", "0", "NA"]);

                            // Our Step 3

                            // Update Hourly Meta Record
                            path = "/hourlyMeta/";
                            let finalAPIRoute = path + iotThingNames[selectedIndex];
                            let tempDate = dayjs().format(); // Local time of Client
                            console.log("Your temp date is: ", tempDate);
                            await API.get(process.env.REACT_APP_AMPLIFY_API_NAME, finalAPIRoute, {
                                queryStringParameters: {
                                    tempDate: tempDate,
                                },
                            })
                                .then((response) => {
                                    console.log("Success calling your amplify lambda that will call Serverless Lamda...", response);
                                })
                                .catch((error) => {
                                    console.log("Failed to retrieve from API (hourlyMeta)", error);
                                });
                        }
                    })
                    .catch((error) => {
                        console.log("Failed to retrieve from API (daily)", error);
                    });
            } catch (err) {
                console.log(err);
            }
        };
        getScaleIDAndDailySummary();
    }, []);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <div>
                <List component="nav" aria-label="Device settings" sx={{ bgcolor: "background.paper" }}>
                    <ListItem
                        button
                        id="lock-button"
                        aria-haspopup="listbox"
                        aria-controls="lock-menu"
                        aria-label="when device is locked"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClickListItem}
                    >
                        <ListItemText secondary={options[selectedIndex]} />
                    </ListItem>
                </List>
                <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "lock-button",
                        role: "listbox",
                    }}
                >
                    {options.map((option, index) => (
                        <MenuItem key={option} selected={index === selectedIndex} onClick={(event) => handleMenuItemClick(event, index)}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
            <MDBox py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard
                                color="success"
                                icon={<ScaleRoundedIcon />}
                                title="Inventory Used"
                                count={cardSummaryItems[2]}
                                percentage={{
                                    color: "success",
                                    amount: "+10%",
                                    label: "than yesterday",
                                }}
                            />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard
                                icon={<PrecisionManufacturingRoundedIcon />}
                                title="Accuracy"
                                count={cardSummaryItems[1]}
                                percentage={{
                                    color: "success",
                                    amount: "+3%",
                                    label: "than yesterdays",
                                }}
                            />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard
                                color="primary"
                                icon={<AccessTimeFilledRoundedIcon />}
                                title="Minutes Saved"
                                count={cardSummaryItems[3]}
                                percentage={{
                                    color: "success",
                                    amount: "+10%",
                                    label: "than yesterday",
                                }}
                            />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard
                                color="secondary"
                                icon={<PanToolIcon />}
                                title="Portions Completed"
                                count={cardSummaryItems[0]}
                                percentage={{
                                    color: "success",
                                    amount: "+24%",
                                    label: "than yesterday",
                                }}
                            />
                        </MDBox>
                    </Grid>
                </Grid>
                <MDBox mt={4.5}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsLineChart color="success" title="Portion Weight" chart={realTimeWeight} />
                                {/* <ReportsLineChart color="success" title="Inventory Used" description="" date=""  chart={realTimeWeight} /> Note you can also pass an object {<></> to description} */}
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsLineChart color="info" title="Accuracy Levels" chart={realTimeAccuracy} />
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsLineChart color="secondary" title="Portioning Time" chart={realTimePortionTime} />
                            </MDBox>
                        </Grid>
                    </Grid>
                </MDBox>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

DashboardContainer.propTypes = {
    iotThingNames: PropTypes.array,
};

export default DashboardContainer;
