/*!
   @description:
   @params:
   @return:
   @Comments
   @Coders: DaleDonDale
*/
const PortionWeightLineChartConfig = (labels, datasets, pointColorsAR) => {
    return {
        data: {
            labels,
            datasets: [
                {
                    label: datasets.label,
                    tension: 0.25,
                    pointRadius: 8,
                    pointBorderColor: "transparent",
                    pointBackgroundColor: pointColorsAR,
                    borderColor: "rgba(255, 255, 255, .8)",
                    borderWidth: 4,
                    backgroundColor: "transparent",
                    fill: true,
                    data: datasets.data,
                    maxBarThickness: 6,
                },
            ],
        },
        options: {
            animation: false,
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
            },
            interaction: {
                intersect: false,
                mode: "index",
            },
            scales: {
                y: {
                    grid: {
                        drawBorder: false,
                        display: true,
                        drawOnChartArea: true,
                        drawTicks: false,
                        borderDash: [5, 5],
                        color: "rgba(255, 255, 255, .2)",
                    },
                    ticks: {
                        display: true,
                        color: "#f8f9fa",
                        padding: 10,
                        font: {
                            size: 14,
                            weight: 300,
                            family: "Roboto",
                            style: "normal",
                            lineHeight: 2,
                        },
                    },
                    title: {
                        display: true,
                        text: datasets.yAxisLabel,
                        color: "#f8f9fa",
                        padding: 10,
                        font: {
                            size: 16,
                            weight: 300,
                            family: "arial",
                            style: "normal",
                            lineHeight: 0.25,
                        },
                    },
                },
                x: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: true,
                        drawTicks: true,
                        borderDash: [5, 5],
                    },
                    ticks: {
                        display: false,
                        maxTicksLimit: 7,
                        color: "#f8f9fa",
                        padding: 12,
                        font: {
                            size: 14,
                            weight: 300,
                            family: "Roboto",
                            style: "normal",
                            lineHeight: 2,
                        },
                    },
                    title: {
                        display: true,
                        text: "Time of Day",
                        color: "#f8f9fa",
                        padding: 10,
                        font: {
                            size: 16,
                            weight: 300,
                            family: "arial",
                            style: "normal",
                            lineHeight: 0.25,
                        },
                    },
                },
            },
        },
    };
};

export default PortionWeightLineChartConfig;
