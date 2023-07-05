// React Imports
import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

// MUI material components
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
import DropDownMenus from "./components/DropDownMenus";

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";
// eslint-disable-next-line
import Chart from "chart.js/auto";

// Material Dashboard
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import Footer from "../../components/Footer";
import ReportsLineChart from "../../components/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "../../components/Cards/StatisticsCards/ComplexStatisticsCard";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

// Data
import reportsLineChartData from "./data/reportsLineChartData";

// AWS & other libraries
import { API, Auth, PubSub } from "aws-amplify";
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear.js";
import toObject from "dayjs/plugin/toObject.js";
import { ListItemIcon } from "@mui/material";
dayjs.extend(dayOfYear);
dayjs.extend(toObject);

/*!
   @description: Main Dashboard container that displays portion event information to user. 
   @params:
   @return:
   @Comments
   @Coders: GangaLi
*/
const DashboardContainer = ({ iotThingNames, unitOfMass, displayIngredientIndex }) => {
    // Main Component State: Cards & Graphs
    const [cardSummaryItems, setCardSummaryItems] = useState([]);
    const [realTimeWeight, setRealTimeWeight] = useState([]);
    const [realTimeAccuracy, setRealTimeAccuracy] = useState([]);
    const [realTimePortionTime, setRealTimePortionTime] = useState([]);
    const { weightGraph, accuracyGraph, portionTimeGraph } = reportsLineChartData;

    // Drop-Down Menu State
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [selectedIndex, setSelectedIndex] = useState(displayIngredientIndex);
    const options = Object.values(iotThingNames);
    const keys = Object.keys(iotThingNames);
    const selectedIndexRef = useRef(displayIngredientIndex);

    /*!
       @description: 
       @params:
       @return:
       @Comments
       @Coders: Rohan-16
    */
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    /*!
       @description: 
       @params:
       @return:
       @Comments
       @Coders: Rohan-16
    */
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        selectedIndexRef.current = index;
        setAnchorEl(null);
        updateIngredient(index);
    };

    /*!
       @description: 
       @params:
       @return:
       @Comments
       @Coders: Rohan-16
    */
    const handleClose = () => {
        setAnchorEl(null);
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
            const AMPLIFY_API = process.env.REACT_APP_AMPLIFY_API_NAME;
            const path = "/restaurants/updateDisplayIngredientIndex/";
            const finalAPIRoute = path + user.username; //TODO: Cases where userSession is empty

            // Make REST API Call
            await API.get(AMPLIFY_API, finalAPIRoute, { queryStringParameters: { index: index } }).then((response) => {
                if (response.item.Item == undefined) {
                    throw new Error("No Response from API");
                }
            });
        } catch (err) {
            console.log("Error when updating selected ingredient index...", err);
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
        let [tempWeightAr, tempAccuracyAr, tempTimeAr, pointBackgroundColorAr] = [[], [], [], []];
        let oldTempKeys = Object.keys(realTime).sort();
        let tempKeys = oldTempKeys.slice(-7); //We are slicing the array so that only 7 data points get displayed on the graphs

        // Generate Data Arrays
        for (let i = 0; i < tempKeys.length; i++) {
            if (realTime[tempKeys[i]].portionWeight < 0) {
                if (unitOfMass == "g") {
                    tempWeightAr.push(realTime[tempKeys[i]].portionWeight);
                } else {
                    tempWeightAr.push((realTime[tempKeys[i]].portionWeight / 28.35).toFixed(2));
                }
                tempWeightAr;
                pointBackgroundColorAr.push("rgba(55, 55, 55, .8)");
            } else {
                if (unitOfMass == "g") {
                    tempWeightAr.push(realTime[tempKeys[i]].portionWeight);
                } else {
                    tempWeightAr.push((realTime[tempKeys[i]].portionWeight / 28.35).toFixed(2));
                }

                pointBackgroundColorAr.push("rgba(255, 255, 255, .8)");
            }
            // Push Data pointsn to arrays
            tempAccuracyAr.push(realTime[tempKeys[i]].accuracy);
            tempTimeAr.push(realTime[tempKeys[i]].portionTime.toFixed(1));
        }

        // Improve UI by adding labels and colours
        weightGraph.labels = tempKeys;
        weightGraph.datasets.data = tempWeightAr;
        weightGraph.pointBackgroundColorAr = pointBackgroundColorAr;

        accuracyGraph.labels = tempKeys;
        accuracyGraph.datasets.data = tempAccuracyAr;
        accuracyGraph.pointBackgroundColorAr = pointBackgroundColorAr;

        portionTimeGraph.labels = tempKeys;
        portionTimeGraph.datasets.data = tempTimeAr;
        portionTimeGraph.pointBackgroundColorAr = pointBackgroundColorAr;

        // Improve UX by changing unit of mass keyword
        if (unitOfMass == "g") {
            reportsLineChartData.weightGraph.datasets.yAxisLabel = "Grams";
        } else {
            reportsLineChartData.weightGraph.datasets.yAxisLabel = "Ounces";
        }

        // Update the graphs
        setRealTimeWeight(weightGraph);
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
        // Get Daily Hourly Summary
        let pathGET = "/metaRecords/get/";
        const finalAPIGETRoute = pathGET + keys[selectedIndexRef.current];
        try {
            let tempDate = dayjs(); // Local time of Client
            await API.get(process.env.REACT_APP_AMPLIFY_API_NAME, finalAPIGETRoute, {
                queryStringParameters: {
                    dayOfYear: tempDate.dayOfYear().toString(),
                    hourOfDay: tempDate.hour().toString(),
                    iotNameThing: keys[selectedIndexRef.current],
                },
            })
                .then(async (response) => {
                    // Check to see if there is a hourly response
                    if (response.daily) {
                        // Set the Upper Summary Card Components
                        let accuracy = response.daily.hourlySummary.accuracy + "%";
                        let inventoryWeight = response.daily.hourlySummary.inventoryConsumed + "g";
                        let timeSaved = response.daily.hourlySummary.minutesSaved + "s";
                        setCardSummaryItems([response.daily.hourlySummary.portionsCompleted, accuracy, inventoryWeight, timeSaved]);

                        // Create the lower 3 Plots using the Real-Time property
                        generateLowerRealTimeGraphs(response.daily.realTime);
                    } else {
                        // There is no hourly response so we need to create one
                        setCardSummaryItems(["0", "NA", "0", "NA"]);
                        setRealTimeWeight([]);
                        setRealTimeAccuracy([]);
                        setRealTimePortionTime([]);

                        // Create Updated Meta Record Based on Previous Daily Meta
                        let pathCREATE = "/metaRecords/create/";
                        let finalAPIRoute = pathCREATE + keys[selectedIndexRef.current];
                        let tempDate = dayjs().format(); // Local time of Client
                        await API.get(process.env.REACT_APP_AMPLIFY_API_NAME, finalAPIRoute, {
                            queryStringParameters: {
                                tempDate: tempDate,
                            },
                        })
                            .then((response) => {
                                console.log("Success calling Serverless Lambda that creates Meta Hourly Record...", response);
                            })
                            .catch((error) => {
                                console.log("Failed To Create Hourly Meta Record...", error);
                            });
                    }
                })
                .catch((error) => {
                    throw new Error("Failed to retrieve from /metaRecords/get/ Route...", error);
                });
        } catch (err) {
            console.log(err);
        }
    };

    /*!
       @description:Use effect that fecthes the data during scale inventory weight changes
       @params:
       @return:
       @Comments
       @Coders: Mohan
    */
    useEffect(() => {
        getHourlyMetaRecords();
        selectedIndexRef.current = selectedIndex;
        PubSub.subscribe("$aws/things/" + keys[selectedIndexRef.current] + "/shadow/name/timeseries/update/accepted").subscribe({
            next: () => {
                getHourlyMetaRecords();
            },
            error: (error) => console.error("Error with web socket...", error),
            complete: () => console.log("Web Socket Done"),
        });
    }, [selectedIndex]);

    return (
        <DashboardLayout>
            <div style={{ margin: "auto ", marginTop: "15px", width: "fit-content", border: "1px solid #49a3f1 ", borderRadius: "5px", padding: "5px", marginLeft: "0px" }}>
                <List component="nav" aria-label="Device settings">
                    <ListItem
                        id="lock-button"
                        aria-haspopup="listbox"
                        aria-controls="lock-menu"
                        aria-label="when device is locked"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClickListItem}
                        style={{ fontFamily: "Roboto" }}
                    >
                        <ListItemText secondary={selectedIndex === -1 ? "Ingredient" : options[selectedIndex]} />
                        <ListItemIcon style={{ marginRight: "-35px" }}>
                            <ArrowDropDownIcon />
                        </ListItemIcon>
                    </ListItem>
                </List>
                <Menu
                    style={{ display: "inline-block" }}
                    id="lock-menu"
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "lock-button",
                        role: "listbox",
                    }}
                >
                    {options.map((option, index) => (
                        <MenuItem key={option} selected={index === selectedIndexRef.current} onClick={(event) => handleMenuItemClick(event, index)}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
            <DropDownMenus options={options} selectedIndexRef={selectedIndexRef} />
            <MDBox py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard
                                color="dark"
                                icon={<PanToolIcon />}
                                title="Portions Grabbed"
                                count={cardSummaryItems[0]}
                                percentage={{
                                    color: "success",
                                    // amount: "+24%",
                                    // label: "than yesterday",
                                }}
                            />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard
                                color="info"
                                icon={<ScaleRoundedIcon />}
                                title="Inventory Used"
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
                                title="Time Taken"
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
                                title="Performance"
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
                                <ReportsLineChart color="info" title="Portion Weight" key={realTimeAccuracy} chart={realTimeWeight} />
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsLineChart color="success" title="Portioning Time" chart={realTimePortionTime} />
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsLineChart color="warning" title="Performance Levels" chart={realTimeAccuracy} />
                            </MDBox>
                        </Grid>
                    </Grid>
                </MDBox>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
};

DashboardContainer.propTypes = {
    iotThingNames: PropTypes.object,
    unitOfMass: PropTypes.string,
    displayIngredientIndex: PropTypes.string,
};

export default DashboardContainer;
