import React from "react";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";
import Card from "@mui/material/Card";
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import PortionDoughnutChartConfig from "./Config";

/*!
   @description: Chart component to hold doughnut chart
   @params:
   @return:
   @Comments
   @Coders: HumbleDior
*/
const PortionAccuracyDoughnutChart = ({ title, description, chart, mobileViewFlag }) => {
    const { data, options } = PortionDoughnutChartConfig(chart.labels || [], chart.datasets || [], chart.pointBackgroundColorAR || []);

    /*!
       @description:
       @params:
       @return:
       @Comments
       @Coders: ADNama
    */
    const genateDoughnutChart = () => {
        return (
            <MDBox padding="1rem" bgColor="transparent">
                <MDBox borderRadius="lg" py={1} pr={0.5} mt={-5} height="14rem" bgColor="transparent">
                    <Doughnut data={data} options={options} />
                </MDBox>
                <MDBox pt={3} pb={1} px={1}>
                    <MDTypography variant="h6" textTransform="capitalize">
                        {title}
                    </MDTypography>
                </MDBox>
            </MDBox>
        );
    };

    const renderChart = mobileViewFlag ? genateDoughnutChart() : <Card sx={{ height: "100%" }}>{genateDoughnutChart()}</Card>;

    return title || description ? <>{renderChart}</> : renderChart;
};

PortionAccuracyDoughnutChart.defaultProps = {
    title: "",
    description: "",
};

PortionAccuracyDoughnutChart.propTypes = {
    title: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    chart: PropTypes.object,
    mobileViewFlag: PropTypes.bool.isRequired,
};

export default PortionAccuracyDoughnutChart;
