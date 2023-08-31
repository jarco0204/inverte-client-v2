/*!
   @description:
   @params:
   @return:
   @Comments
   @Coders: Cocu11uela
*/
const PortionAccuracyBarChartConfig = (labels, datasets) => {
    return {
        data: {
            labels,
            datasets: [
                {
                    label: datasets.label,
                    tension: 0.4,
                    borderWidth: 0,
                    borderRadius: 2,
                    borderSkipped: false,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    data: datasets.data,
                    maxBarThickness: 9,
                },
            ],
        },
        options: {
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
                        suggestedMin: 0,
                        suggestedMax: 100,
                        beginAtZero: true,
                        padding: 10,
                        font: {
                            size: 14,
                            weight: 300,
                            family: "arial",
                            style: "normal",
                            lineHeight: 2,
                        },
                        color: "#fff",
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
                        drawOnChartArea: false,
                        drawTicks: false,
                        borderDash: [10, 10],
                        color: "rgba(255, 255, 255, .2)",
                    },
                    ticks: {
                        display: false,
                        color: "#f8f9fa",
                        padding: 10,
                        font: {
                            size: 14,
                            weight: 300,
                            family: "arial",
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

export default PortionAccuracyBarChartConfig;
