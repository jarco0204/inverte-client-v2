import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Line } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";

// ReportsLineChart configurations
import configs from "../../../../components/Charts/LineCharts/ReportsLineChart/configs";

function ReportsLineChartV2({ color, title, description, chart }) {
    const { data, options } = configs(chart.labels || [], chart.datasets || {}, chart.pointBackgroundColorAr || []);
    // console.log("Your data is:", data);
    //let slicedData = data.slice(0, 6);
    return (
        <Card >
            <MDBox padding="0.5rem" >
                <MDTypography variant="h6" textTransform="capitalize">
                    {title}
                </MDTypography>
                <MDBox pt={2} pb={1} px={1}>
                    <MDTypography component="div" variant="button" color="text" fontWeight="light">
                        {description}
                    </MDTypography>
                    {/* <Divider /> */}
                    {/* <MDBox display="flex" alignItems="center">
                        <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
                            <Icon>
                                <AccessTimeRoundedIcon />
                            </Icon>
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="light">
                            {date}
                        </MDTypography>
                    </MDBox> */}
                </MDBox>
                {useMemo(
                    () => (
                        <MDBox variant="gradient" bgColor={color} borderRadius="lg" coloredShadow={color} py={2} pr={0.5} /*mt={-5}*/ height="14rem">
                            <Line data={data} options={options} />
                        </MDBox>
                    ),
                    [chart, color, data]
                )}
            </MDBox>
        </Card>
    );
}

// Setting default values for the props of ReportsLineChart
ReportsLineChartV2.defaultProps = {
    color: "dark",
    description: "",
};

// Typechecking props for the ReportsLineChart
ReportsLineChartV2.propTypes = {
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    title: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    // date: PropTypes.string.isRequired,
    // chart: PropTypes.objectOf(PropTypes.oneOfType(PropTypes.array)).isRequired,
    chart: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default ReportsLineChartV2;
