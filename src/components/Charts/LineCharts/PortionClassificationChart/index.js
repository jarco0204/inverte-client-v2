import { useMemo } from "react";
// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Line } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "../../../MDBox";
import MDTypography from "../../../MDTypography";

// ReportsBarChart configurations
import PortionClassificationChartConfig from "./Config";

/*!
   @description:
   @params:
   @return:
   @Comments
   @Coders: FlawlessVictorY
*/
const PortionClassificationChart = ({ color, title, chart }) => {
    const { data, options } = PortionClassificationChartConfig(chart.labels || [], chart.datasets || {});

    return (
        <Card sx={{ height: "100%" }}>
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
                </MDBox>
            </MDBox>
        </Card>
    );
};
// Setting default values for the props of ReportsBarChart
PortionClassificationChart.defaultProps = {
    color: "dark",
    description: "",
};

// Typechecking props for the ReportsBarChart
PortionClassificationChart.propTypes = {
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    title: PropTypes.string.isRequired,
    // description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    // date: PropTypes.string.isRequired,
    chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default PortionClassificationChart;
