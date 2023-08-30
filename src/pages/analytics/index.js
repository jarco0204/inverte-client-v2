// Main Libraries
import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

// MaterialUI
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Divider from "@mui/material/Divider";

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
import DropDownIngredientMenu from "../../components/DropDownIngredientMenu";
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
    // State and reference to handle input parameters (ingredient selected & time)
    const { RangePicker } = DatePicker;
    const isInitialRender = useRef(true);
    const selectedIndexRef = useRef(displayIngredient);
    const [selectedIndex, setSelectedIndex] = useState(displayIngredient);

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

    const { Title, Paragraph } = Typography;
    const options = Object.values(iotThingNames);
    const devices = Object.keys(iotThingNames);

    const handleRangeChange = (dates) => {
        setSelectedDates(dates);
    };
    const handleOpenChange = (open) => {
        if (!open && selectedDates != null) {
            const updatedDates = [moment(selectedDates[0]).startOf("day").set("minute", 0), moment(selectedDates[1]).startOf("day").set("minute", 0)];
            setSelectedDates(updatedDates);
            getDataEvents(updatedDates[0], updatedDates[1]);
        }
    };
    // const handleMenuItemClick = (event, index) => {
    //     setSelectedIndex(index);
    //     selectedIndexRef.current = index;
    //     setAnchorEl(null);
    // };
    // const handleClickListItem = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

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
                <MDBox mt={2}>
                    <div style={{ margin: "auto", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: "500px" }}>
                        <DropDownIngredientMenu
                            options={options}
                            selectedIndexRef={selectedIndexRef}
                            selectedIndex={selectedIndex}
                            setSelectedIndex={setSelectedIndex}
                            titleForPage={"Past InVentory Report"}
                        />
                        <RangePicker
                            showTime={{
                                format: "HH",
                                defaultValue: [moment("00:00", "HH:mm"), moment("23:00", "HH:mm")], // Default time range
                            }}
                            onChange={handleRangeChange}
                            onOpenChange={handleOpenChange}
                            bordered={true}
                        />
                    </div>
                    <Divider variant="middle" role="presentation" />
                    {analyticsData == null ? null : (
                        <React.Fragment>
                            <MDBox mt={5} mb={2}>
                                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignContent: "center", justifyContent: "center" }}>
                                    <Typography>
                                        <Title>
                                            Your total Inventory consumed for this time period was {totalInventory}g with an accuracy of {accuracy.toFixed(0)}%.This is because you took {totalPortions}{" "}
                                            portions in {totalMinutes.toFixed(0)} seconds.
                                        </Title>
                                    </Typography>
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <Row gutter={40}>
                                            <Col span={5}>
                                                <Statistic title="Total Inventory" value={totalInventory} />
                                            </Col>
                                            <Col span={5}>
                                                <Statistic title="Precision Levels" value={accuracy} precision={0} />
                                            </Col>
                                            <Col span={5}>
                                                <Statistic title="Seconds Taken" value={totalMinutes.toFixed(0)} />
                                            </Col>
                                            <Col span={5}>
                                                <Statistic title="Total Portions" value={totalPortions} />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </MDBox>
                            <MDBox mb={1} mt={1}>
                                <ZoomableChart dataSet={totalInventory == 0 ? null : analyticsData} />
                            </MDBox>
                        </React.Fragment>
                    )}
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
