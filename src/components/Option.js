import { Box, Typography } from "@material-ui/core";
import { Assessment, Fastfood, ImportantDevices } from "@material-ui/icons";
import { AppBar, Tab, Tabs } from "@mui/material";
import React from "react";
// import AssessmentIcon from '@material-ui/icons'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function dummyprops(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        "aria-controls": `scrollable-force-tabpanel-${index}`,
    };
}
function Option() {
    return (
        <div className="optionComp">
            <AppBar position="static" color="default">
                <Tabs>
                    <Tab
                        label="Scales"
                        icon={<ImportantDevices />}
                        {...dummyprops(0)}
                    />
                    <Tab
                        label="Recipes"
                        icon={<Fastfood />}
                        {...dummyprops(1)}
                    />
                    <Tab
                        label="Analytics"
                        icon={<Assessment />}
                        {...dummyprops(2)}
                    />
                </Tabs>
            </AppBar>
            <TabPanel index={0}>Item One</TabPanel>
        </div>
    );
}

export default Option;
