/*!
   @description: Returns object that configures the horizontal bar chart
   @params:
   @return:
   @Comments
   @Coders: MrTaco
*/
const configs = (labels, datasets) => {
    return {
        data: {
            labels,
            datasets: [...datasets],
        },
        options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                y: {
                    grid: {
                        drawBorder: false,
                        display: true,
                        drawOnChartArea: true,
                        drawTicks: false,
                        borderDash: [5, 5],
                        color: "#c1c4ce5c",
                    },
                    ticks: {
                        display: true,
                        padding: 10,
                        color: "#9ca2b7",
                        font: {
                            size: 14,
                            weight: 300,
                            family: "Roboto",
                            style: "normal",
                            lineHeight: 2,
                        },
                    },
                },
                x: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: true,
                        drawTicks: true,
                        color: "#c1c4ce5c",
                    },
                    ticks: {
                        display: true,
                        color: "#9ca2b7",
                        padding: 10,
                        font: {
                            size: 14,
                            weight: 300,
                            family: "Roboto",
                            style: "normal",
                            lineHeight: 2,
                        },
                    },
                },
            },
        },
    };
};
export default configs;
