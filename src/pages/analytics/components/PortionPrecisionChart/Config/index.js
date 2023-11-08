import "chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm";
/*!
   @description:
   @params:
   @return:
   @Comments
   @Coders: MikelJordania
*/
const PortionPrecisionLineChartConfig = (labels, datasets, pointColorsAR, datasets1, datasets2, datasets3) => {
    return {
        data: {
            labels,
            datasets: [
                {
                    label: datasets.label,
                    tension: 0.1,
                    pointRadius: 0,
                    pointBorderColor: "transparent",
                    pointBackgroundColor: pointColorsAR,
                    borderColor: "rgba(255, 255, 255, .8)",
                    borderWidth: 4,
                    spanGaps: true, // Remove gaps in the chart,
                    backgroundColor: "transparent",
                    fill: true,
                    data: datasets.data,
                    maxBarThickness: 6,
                },
            ],
        },
        options: {
            animation: true,
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
                    suggestedMin: -10, // Set the minimum value to 0
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
                    type: "time", // This is required if you have non-numeric x-axis data
                    time: {
                        unit: "day", // Set the time unit to 'day'
                        displayFormats: {
                            day: "MM-DD", // Format for displaying days as month and day
                        },
                    },
                    beginAtZero: false,
                    offset: true,
                    maxPadding: 0.1, // Adjust as needed
                    minPadding: 0.1, // Adjust as needed
                    grid: {
                        drawBorder: true,
                        display: true,
                        drawOnChartArea: true,
                        drawTicks: true,
                        borderDash: [10, 5],
                        color: "rgba(255, 0, 0, .2)",
                        lineWidth: 2,
                    },
                    ticks: {
                        display: true,
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

export default PortionPrecisionLineChartConfig;
