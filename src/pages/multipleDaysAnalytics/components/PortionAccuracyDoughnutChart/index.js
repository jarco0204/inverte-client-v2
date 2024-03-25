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
        let perfect = 0;
        if (data.datasets[0].data) {
            perfect = data.datasets[0].data[2];
        }

        return (
            <MDBox>
                <MDBox py={5} mt={-2} height="1%">
                    <Doughnut data={data} options={options} style={{ marginBottom: "1rem" }} />
                    <MDTypography variant="h6" textTransform="capitalize" marginTop="5rem">
                        {title}
                    </MDTypography>
                    <MDTypography variant="button" color="text" marginTop="3rem">
                        The percentage of perfect portions is {perfect}%, indicating {(perfect / 10).toFixed(1)} out of 10 portions are accurate and complete immediately.
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
