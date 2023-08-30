/*!
   @description:
   @params:
   @return:
   @Comments
   @Coders: MikelJordania
*/
const PortionAccuracyLineChartConfig = (labels, datasets, pointColorsAR, datasets1, datasets2, datasets3) => {
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
                {
                    label: datasets2.label,
                    tension: 0.25,
                    pointRadius: 2,
                    // pointBorderColor: "red",
                    pointBackgroundColor: "rgba(255, 1, 1, .8)",
                    // pointBackgroundColor: pointColorsAR,
                    borderColor: "rgba(255, 1, 1, .8)",
                    borderWidth: 4,
                    backgroundColor: "transparent",
                    fill: false,
                    data: datasets2.data,
                    maxBarThickness: 6,
                },
                {
                    label: datasets1.label,
                    tension: 0.25,
                    pointRadius: 2,
                    // pointBorderColor: "green",
                    pointBackgroundColor: "rgba(1, 255, 1, .8)",
                    borderColor: "rgba(1, 255, 1, .8)",
                    borderWidth: 4,
                    backgroundColor: "transparent",
                    fill: false,
                    data: datasets1.data,
                    maxBarThickness: 6,
                },
                {
                    label: datasets3.label,
                    tension: 0.25,
                    pointRadius: 2,
                    pointBackgroundColor: "rgba(1, 1, 255, .8)",
                    borderColor: "rgba(1, 1, 255, .8)",
                    borderWidth: 4,
                    backgroundColor: "transparent",
                    fill: false,
                    data: datasets3.data,
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

export default PortionAccuracyLineChartConfig;
