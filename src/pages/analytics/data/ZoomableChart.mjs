import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-moment";

Chart.register(zoomPlugin);

let data = null;
const chartConfig = {
    type: "line",
    data: {
        labels: [],
        datasets: [
            {
                label: "Portion Weight",
                data: [],
                backgroundColor: ["#42424a"],
                borderColor: ["#49a3f1"],
                spanGaps: false,
                borderWidth: 1,
            },
            {
                label: "Accuracy",
                data: [],
                backgroundColor: ["#ffa726"],
                borderColor: ["#49a3f1"],
                spanGaps: false,
                borderWidth: 1,
                hidden: true, // Hide this line by default
            },
            {
                label: "Time Taken",
                data: [],
                backgroundColor: ["#66bb6a"],
                borderColor: ["#49a3f1"],
                spanGaps: false,
                borderWidth: 1,
                hidden: true, // Hide this line by default
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                min: new Date(),
                max: new Date(),
                type: "time",
                time: {
                    unit: "minute",
                    displayFormats: {
                        hour: "HH:mm",
                    },
                },
                ticks: {
                    //source: "auto",
                    stepSize: 1, // Display data points every 1 minute
                    autoSkip: true,
                    maxRotation: 0, // Disable label rotation
                },
                offset: false,
                grid: {
                    //display: false,
                    drawBorder: true,
                    drawOnChartArea: false,
                    drawTicks: true,
                },
                font: {
                    size: 8,
                },
            },
            xAxis2: {
                type: "time",
                time: {
                    unit: "day",
                },
            },
            y: {
                ticks: {
                    fontSize: 8,
                    beginAtZero: false,
                    stepSize: 1,
                },
            },
        },
        plugins: {
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: "x",
                    speed: 100,
                },
                pan: {
                    enabled: true,
                    mode: "x",
                    speed: 0.5,
                },
            },
        },
    },
};

const ZoomableChart = (dataSet) => {
    data = dataSet;
    console.log("The dataSets is", dataSet.dataSet);
    let xArr = [];
    let weightArr = [];
    let accuracyArr = [];
    let timeArr = [];
    if (dataSet.dataSet != null) {
        chartConfig.options.scales.x.min = Object.values(dataSet.dataSet[4][0])[0];
        chartConfig.options.scales.x.max = Object.values(dataSet.dataSet[4][0])[dataSet.dataSet[4].length - 1];
    }

    if (dataSet.dataSet != null) {
        for (let i = 0; i < dataSet.dataSet[4].length; i++) {
            xArr.push(Object.values(dataSet.dataSet[4][i])[0]);
            weightArr.push(Object.values(dataSet.dataSet[4][i])[1]);
            accuracyArr.push(Object.values(dataSet.dataSet[5][i])[1]);
            timeArr.push(Object.values(dataSet.dataSet[6][i])[1]);
        }
        console.log("The chartConfig is", chartConfig.data.labels);
        console.log("The chartConfigs is", chartConfig.data.datasets);
        chartConfig.data.labels = xArr;
        chartConfig.data.datasets[0].data = weightArr;
        chartConfig.data.datasets[1].data = accuracyArr;
        chartConfig.data.datasets[2].data = timeArr;
    }

    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        console.log("Rendered");
        if (chartContainer && chartContainer.current) {
            const newChartInstance = new Chart(chartContainer.current, chartConfig);
            setChartInstance(newChartInstance);
            return () => {
                newChartInstance.destroy();
            };
        }
    }, [chartContainer, data]);

    return (
        <div>
            <canvas ref={chartContainer} />
        </div>
    );
};

export default ZoomableChart;
