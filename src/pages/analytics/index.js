import React, { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../components/Navbars/DashboardNavbar";
import Footer from "../../components/Footer";
import MDBox from "../../components/MDBox";
import subtopic from "./data/TestData";
import Grid from "@mui/material/Grid";
import Row from "./components/Row";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemIcon } from "@mui/material";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { API, Auth, PubSub } from "aws-amplify";
import moment from "moment";
// const importView = () =>
//     lazy(() =>
//         import(`./components/Row`).catch(() => {
//             import(`./components/NullView`);
//         })
//     );

function AnalyticsDashboard({ iotThingNames, displayIngredient, rows_to_display = 3, number_of_plots = 3, rowToShow }) {
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
    */
    const [requestedDate, setRequestedDate] = useState(null);
    const [requestedEndDate, setRequestedEndDate] = useState(null);
    const [selectedDates, setSelectedDates] = useState([]);
    const handleRangeChange = (dates) => {
        setSelectedDates(dates);
    };
    const handleOpenChange = (open) => {
        if (!open && selectedDates.length > 0) {
            const updatedDates = [moment(selectedDates[0]).startOf("day").set("minute", 0), moment(selectedDates[1]).startOf("day").set("minute", 0)];
            setSelectedDates(updatedDates);
            getDataEvents(updatedDates[0], updatedDates[1]);
        }
    };
    const { RangePicker } = DatePicker;
    const [anchorEl, setAnchorEl] = useState(null);
    const [rows, setRows] = useState([]);
    const extract_data = (response) => response.data.children.map((response) => response);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const options = Object.values(iotThingNames);
    const [selectedIndex, setSelectedIndex] = useState(displayIngredient);
    const selectedIndexRef = useRef(displayIngredient);
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        selectedIndexRef.current = index;
        setAnchorEl(null);
        //updateIngredient(index);
    };
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };
    // const unique_keys = []

    const refined_data = () =>
        Array.from(
            {
                length: rows_to_display,
            },
            (_, i) => {
                return i == 0 ? subtopic.data.children.splice(0, 2) : subtopic.data.children.splice(0, number_of_plots);
            }
        );
    const midle_man = refined_data();
    const modified_subtopic = async () => ({
        data: {
            children: [...midle_man],
        },
    });
    useEffect(() => {
        async function loadRows() {
            const rowToShow = await modified_subtopic("rows data").then(extract_data);
            let unique_keys = [];
            const componentPromises = rowToShow.map(async (data) => {
                let new_unique_key = Math.floor(Math.random() * 100);
                while (unique_keys.includes(new_unique_key)) {
                    new_unique_key = Math.floor(Math.random() * 100);
                }
                unique_keys.push(new_unique_key);
                // const Row = await importView();
                return <Row data={data} key={new_unique_key} requestedDate={requestedDate} />;
            });
            Promise.all(componentPromises).then(setRows);
        }
        loadRows();
    }, [rowToShow]);

    //Get the events using the API call
    const getDataEvents = async (newDate, endDate) => {
        const user = await Auth.currentAuthenticatedUser();
        try {
            const AMPLIFY_API = process.env.REACT_APP_AMPLIFY_API_NAME;
            const path = "/analytics/";
            const finalAPIRoute = path + user.username; //TODO: Cases where userSession is empty

            await API.get(AMPLIFY_API, finalAPIRoute, {
                queryStringParameters: { date: newDate._i.$d.toString(), endDate: endDate._i.$d.toString(), iotName: Object.keys(iotThingNames)[selectedIndex] },
            }).then((response) => {
                console.log("The meta that we pull from analytics: ", response); //Debug statement
                if (response.item.Item == undefined) {
                    throw new Error("No Response from API");
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DashboardLayout>
                <DashboardNavbar />
                <MDBox mt={4.5}>
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
                        }}
                        onChange={handleRangeChange}
                        onOpenChange={handleOpenChange}
                    />

                    <MDBox mt={6} mb={3}>
                        {/* <Grid container spacing={number_of_plots} direction="column" justifyContent="space-between">
                            {rows}
                        </Grid> */}
                    </MDBox>
                </MDBox>
                <Footer />
            </DashboardLayout>
        </LocalizationProvider>
    );
}

AnalyticsDashboard.propTypes = {
    rows_to_display: PropTypes.number,
    number_of_plots: PropTypes.number,
    rowToShow: PropTypes.array,
};

export default AnalyticsDashboard;
