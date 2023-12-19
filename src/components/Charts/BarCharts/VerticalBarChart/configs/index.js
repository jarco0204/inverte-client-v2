/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React base styles
import typography from "../../../../../assets/theme/base/typography";

const barChartConfigs = (data) => {
    return {
        labels: ["10", "12", "2", "4", "6", "8", "10"],
        datasets: [
            {
                label: "Precision",
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(75,192,192,0.4)",
                hoverBorderColor: "rgba(75,192,192,1)",
                data: [65, 59, 80, 81, 56],
            },
            {
                label: "Accuracy",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: [45, 32, 50, 26, 70],
            },
            {
                label: "Number of portions",
                backgroundColor: "rgba(255,206,86,0.2)",
                borderColor: "rgba(255,206,86,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,206,86,0.4)",
                hoverBorderColor: "rgba(255,206,86,1)",
                data: [30, 45, 22, 63, 40],
            },
            {
                label: "Inventory",
                backgroundColor: "rgba(150,200,86,0.2)",
                borderColor: "rgba(150,200,86,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,206,86,0.4)",
                hoverBorderColor: "rgba(255,206,86,1)",
                data: [30, 45, 22, 63, 40],
            },
        ],
    };
};

export default barChartConfigs;
