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
        labels: data.labels,
        datasets: [
            {
                label: "Precision",
                backgroundColor: "#1a73e8",
                borderColor: "#1a73e8",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(75,192,192,0.4)",
                hoverBorderColor: "rgba(75,192,192,1)",
                data: data.precision,
            },
            {
                label: "Accuracy",
                backgroundColor: "#2aeb11",
                borderColor: "#2aeb11",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: data.inventoryConsumed,
            },
            {
                label: "Number of portions",
                backgroundColor: "rgba(0,0,0,1)",
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,206,86,0.4)",
                hoverBorderColor: "rgba(255,206,86,1)",
                data: data.portionsCompleted,
            },
            {
                label: "Inventory",
                backgroundColor: "#808080",
                borderColor: "##808080",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,206,86,0.4)",
                hoverBorderColor: "rgba(255,206,86,1)",
                data: data.inventoryConsumed,
            },
        ],
    };
};

export default barChartConfigs;
