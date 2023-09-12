// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useState } from "react";
import ReportsLineChartV2 from "../MobileReportsLineChart";

const MobileComplexStatisticsCard = ({ color, title, count, icon, generateChart }) => {
    // Component State
    const [isOpen, setIsOpen] = useState(false);

    // Behaviour Functions
    const handleClick = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div>
            <Card onClick={handleClick}>
                <MDBox display="flex" justifyContent="space-between" pt={1} px={2} height="75px">
                    <MDBox
                        variant="gradient"
                        bgColor={color}
                        color={color === "light" ? "dark" : "white"}
                        coloredShadow={color}
                        borderRadius="xl"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="4rem"
                        height="4rem"
                        mt={-3}
                    >
                        <Icon fontSize="medium" color="inherit">
                            {icon}
                        </Icon>
                    </MDBox>
                    <MDBox textAlign="right" lineHeight={1.25}>
                        <MDTypography variant="button" fontWeight="light" color="text">
                            {title}
                        </MDTypography>
                        <MDTypography variant="h4">{count}</MDTypography>
                    </MDBox>
                </MDBox>
                <Divider />
                {isOpen && (
                    <MDBox pb={1} px={3}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={4}>
                                <MDBox mb={3}>{generateChart()}</MDBox>
                            </Grid>
                        </Grid>
                        <MDBox display="flex" justifyContent="right" py={0.1}>
                            <KeyboardArrowUp />
                        </MDBox>
                    </MDBox>
                )}
                {!isOpen && (
                    <MDBox display="flex" justifyContent="right" py={0.1}>
                        <KeyboardArrowDown />
                    </MDBox>
                )}
            </Card>
        </div>
    );
};

// Setting default values for the props of ComplexStatisticsCard
MobileComplexStatisticsCard.defaultProps = {
    color: "info",
    percentage: {
        color: "success",
        text: "",
        label: "",
    },
};

// Typechecking props for the ComplexStatisticsCard
MobileComplexStatisticsCard.propTypes = {
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "light", "dark"]),
    title: PropTypes.string.isRequired,
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    percentage: PropTypes.shape({
        color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark", "white"]),
        amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
    }),
    icon: PropTypes.node.isRequired,
};

export default MobileComplexStatisticsCard;
