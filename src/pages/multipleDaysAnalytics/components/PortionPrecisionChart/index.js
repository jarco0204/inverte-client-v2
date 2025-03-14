// React Imports
import { useMemo, useState } from "react";
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Line } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";

// ReportsLineChart configurations
import PortionPrecisionLineChartConfig from "./Config";

/*!
   @description:
   @params:
   @return:
   @Comments
   @Coders: EscorpionWin$
*/
const PortionPrecisionChart = ({ color, title, description, chart, mobileViewFlag }) => {
    const { data, options } = PortionPrecisionLineChartConfig(
        chart.labels || [],
        chart.portionEvent || {},
        chart.pointBackgroundColorAR || [],
        chart.correctWeight || [],
        chart.upperLimit || [],
        chart.lowerLimit || []
    );

    /*!
        @description: Helper function to simplify component architecture for desktop and mobile
        @params:
        @return:
        @Comments
        @Coders: ManuLAO
    */
    const returnMyChart = () => {
        return (
            <MDBox padding="1rem">
                {useMemo(
                    () => (
                        <MDBox variant="gradient" bgColor={color} borderRadius="lg" coloredShadow={color} py={2} pr={0.5} mt={-5} height="14rem">
                            <Line data={data} options={options} />
                        </MDBox>
                    ),
                    [chart, color, data]
                )}
                <MDBox pt={3} pb={1} px={1}>
                    <MDTypography variant="h6" textTransform="capitalize">
                        {title}
                    </MDTypography>
                    <MDTypography component="div" variant="button" color="text" fontWeight="light">
                        {description}
                    </MDTypography>
                </MDBox>
            </MDBox>
        );
    };
    return mobileViewFlag ? returnMyChart() : <Card sx={{ height: "100%" }}>{returnMyChart()}</Card>;
};

// Setting default values for the props of ReportsLineChart
PortionPrecisionChart.defaultProps = {
    color: "dark",
    description: "",
};

// Typechecking props for the ReportsLineChart
PortionPrecisionChart.propTypes = {
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    title: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    // date: PropTypes.string.isRequired,
    // chart: PropTypes.objectOf(PropTypes.oneOfType(PropTypes.array)).isRequired,
    chart: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    mobileViewFlag: PropTypes.bool.isRequired,
};

export default PortionPrecisionChart;
