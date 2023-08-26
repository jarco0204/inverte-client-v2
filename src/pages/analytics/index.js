// Main Libraries
import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

// MaterialUI
import Grid from "@mui/material/Grid";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemIcon } from "@mui/material";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

// UI Libraries
import moment from "moment";
import { DatePicker, Col, Row, Statistic, Typography } from "antd";

// Backend
import { API, Auth } from "aws-amplify";

// User Components
import ZoomableChart from "./data/ZoomableChart.mjs";
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import Footer from "../../components/Footer";
import MDBox from "../../components/MDBox";
import DropDownMenus from "../../components/DropdownButton";

/*
@description: This component creates the rows that display the plots
@params: rows_to_display: specifies how many rows of plots you want to display
        number_of_plots: specifies how many plots per row you want to display
        rowToShow: the data being passed for the component display the plots
@return:
        A nested components of rows

@Comments
    The utility of refined_data is to separate the incoming data into rows_to_display Arrays
    of number_of_plots Plots. E.g: rows_to_display = 3, number_of_plots=3 and data.length==7 then:
    refined_data will create an array of 3 arrays that will be of length 2,3 and 2 respectively.
    The first row will always only have 2 plots for emphasis of that data.

@Coders: Crishan
*/
const AnalyticsDashboard = ({ iotThingNames, displayIngredient, rows_to_display = 3, number_of_plots = 3, rowToShow }) => {
    // Component State
    const [totalInventory, setTotalInventory] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [totalPortions, setTotalPortions] = useState(0);
    const [totalMinutes, setTotalMinutes] = useState(0);
    const [chartWeight, setChartWeight] = useState([]);
    const [chartAccuracy, setChartAccuracy] = useState([]);
    const [chartPortionTime, setChartPortionTime] = useState([]);
    const [analyticsData, setAnalyticsData] = useState(null);
    const [selectedDates, setSelectedDates] = useState([]);
    const { RangePicker } = DatePicker;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { Title, Paragraph } = Typography;
    const options = Object.values(iotThingNames);
    const devices = Object.keys(iotThingNames);
    const [selectedIndex, setSelectedIndex] = useState(displayIngredient);
    const selectedIndexRef = useRef(displayIngredient);
    const isInitialRender = useRef(true);

    // Functions to handle child component
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleRangeChange = (dates) => {
        setSelectedDates(dates);
    };
    const handleOpenChange = (open) => {
        console.log("Open is:", open);
        if (!open && selectedDates != null) {
            const updatedDates = [moment(selectedDates[0]).startOf("day").set("minute", 0), moment(selectedDates[1]).startOf("day").set("minute", 0)];
            setSelectedDates(updatedDates);
            getDataEvents(updatedDates[0], updatedDates[1]);
        }
    };
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        selectedIndexRef.current = index;
        setAnchorEl(null);
    };
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    //UseEffect that sets everything to default when we load page
    useEffect(() => {
        setAnalyticsData(null);
        setTotalInventory(0);
        setAccuracy(0.0);
        setTotalPortions(0);
        setTotalMinutes(0);
        setSelectedDates(null);
        setChartWeight([]);
        setChartAccuracy([]);
        setChartPortionTime([]);
    }, [selectedIndex]);

    //Use effect is triggered when we get data from backend
    useEffect(() => {
        if (analyticsData != null) {
            setTotalInventory(analyticsData[0]);
            setAccuracy(analyticsData[1]);
            setTotalPortions(analyticsData[3]);
            setTotalMinutes(analyticsData[2]);
            setChartWeight(analyticsData[4]);
            setChartAccuracy(analyticsData[5]);
            setChartPortionTime(analyticsData[6]);
            console.log("Total inventory", totalInventory);
            console.log("Weight array is:", chartWeight);
        }
    }, [analyticsData, chartAccuracy]);

    //Use effect is triggered when we change index
    useEffect(() => {
        if (!isInitialRender.current) {
            setAnalyticsData(null);
            setTotalInventory(0);
            setAccuracy(0);
            setTotalPortions(0);
            setTotalMinutes(0);
            setSelectedDates([]);
            setChartWeight([]);
        } else {
            isInitialRender.current = false;
        }
    }, [selectedIndex]);

    /*!
       @description:GQL query that gets the data from hour table based on the filter provided
       @params:
       @return:
       @Comments
       @Coders:pfk123
    */
    const getDataEvents = async (newDate, endDate) => {
        const dynamoStartDate = new Date(newDate._i.$d);
        const dynamoEndDate = new Date(endDate._i.$d);
        const user = await Auth.currentAuthenticatedUser();
        console.log("Retrieving analytics for this Device...", devices[selectedIndex]); // Debug Statement

        // Handle API Call
        try {
            const queryStartDate = JSON.stringify(dynamoStartDate);
            const queryEndDate = JSON.stringify(dynamoEndDate);
            const AMPLIFY_API = process.env.REACT_APP_AMPLIFY_API_NAME;
            const path = "/metaRecords/analytics/get/";
            const finalAPIRoute = path + user.username; //TODO: Cases where userSession is empty

            //Make API Call
            await API.get(AMPLIFY_API, finalAPIRoute, {
                queryStringParameters: { startDate: queryStartDate, endDate: queryEndDate, scale: devices[selectedIndex] },
            }).then((response) => {
                console.log("This is the response Meta Object from the GQL API...", response); //Debug statement
                if (response.portionEvents[0] != 0) {
                    setAnalyticsData(response.portionEvents);
                }
                // Error Handling
                if (response.item.Item == undefined) {
                    throw new Error("No Response from API");
                }
            });
        } catch (err) {
            console.log("Error while making GQL API call for analytics...", err);
        }
    };
    //Display analytics page
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DashboardLayout>
                <MDBox mt={1}>
                    <DropDownMenus options={options} selectedIndexRef={selectedIndexRef} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} updateIngredient={"Cheese"} />
                    <Grid container justifyContent="center" position="relative">
                        <div style={{ margin: "auto ", marginTop: "4px", width: "fit-content", border: "1px solid #49a3f1 ", borderRadius: "5px", padding: "5px", marginLeft: "0px" }}>
                            <List component="nav" aria-label="Device settings">
                                <ListItem
                                    button
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
                    </Grid>
                    <RangePicker
                        showTime={{
                            format: "HH",
                            defaultValue: [moment("00:00", "HH:mm"), moment("23:00", "HH:mm")], // Default time range
                        }}
                        onChange={handleRangeChange}
                        onOpenChange={handleOpenChange}
                    />
                    <MDBox mt={3} mb={3}>
                        <div>
                            <Typography>
                                <Title>Summary</Title>
                                <Paragraph>
                                    Your total Inventory consumed for this time period was {totalInventory}g with an accuracy of {accuracy.toFixed(0)}%.This is because you took {totalPortions}{" "}
                                    portions in {totalMinutes.toFixed(0)} seconds.
                                </Paragraph>
                            </Typography>
                            <Row gutter={16}>
                                <Col span={5}>
                                    <Statistic title="Total Inventory" value={totalInventory} />
                                </Col>
                                <Col span={5}>
                                    <Statistic title="Average Accuracy" value={accuracy} precision={0} />
                                </Col>
                                <Col span={5}>
                                    <Statistic title="Seconds Taken" value={totalMinutes.toFixed(0)} />
                                </Col>
                                <Col span={5}>
                                    <Statistic title="Total Portions" value={totalPortions} />
                                </Col>
                            </Row>
                        </div>
                    </MDBox>
                    <MDBox mb={1} mt={1}>
                        <ZoomableChart dataSet={totalInventory == 0 ? null : analyticsData} />
                    </MDBox>
                </MDBox>
                <Footer />
            </DashboardLayout>
        </LocalizationProvider>
    );
};

AnalyticsDashboard.propTypes = {
    rows_to_display: PropTypes.number,
    number_of_plots: PropTypes.number,
    rowToShow: PropTypes.array,
};

export default AnalyticsDashboard;
