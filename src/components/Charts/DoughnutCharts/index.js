import React from "react";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MDBox from "../../MDBox";
import MDTypography from "../../MDTypography";

/*!
   @description: Chart component to hold doughnut chart
   @params:
   @return:
   @Comments
   @Coders: HumbleDior
*/
const DoughnutChartComponent = ({ icon, title, description, chartData }) => {
    const { labels, data, backgroundColors } = chartData;

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    const renderChart = (
        <Card sx={{ height: "100%" }}>
            <MDBox padding="1rem" bgColor="transparent">
                <MDBox borderRadius="lg" py={2} pr={0.5} mt={-5} height="14rem" bgColor="transparent">
                    <Doughnut data={{ labels, datasets: [{ data, backgroundColor: backgroundColors }] }} options={chartOptions} />
                </MDBox>
                <MDBox pt={3} pb={1} px={1}>
                    <MDTypography variant="h6" textTransform="capitalize">
                        {title}
                    </MDTypography>
                </MDBox>
            </MDBox>
        </Card>
    );

    return title || description ? <>{renderChart}</> : renderChart;
};

DoughnutChartComponent.defaultProps = {
    icon: { color: "info", component: "" },
    title: "",
    description: "",
    height: "19.125rem",
};

DoughnutChartComponent.propTypes = {
    icon: PropTypes.shape({
        color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "light", "dark"]),
        component: PropTypes.node,
    }),
    title: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    chartData: PropTypes.shape({
        labels: PropTypes.arrayOf(PropTypes.string).isRequired,
        data: PropTypes.arrayOf(PropTypes.number).isRequired,
        backgroundColors: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

export default DoughnutChartComponent;
