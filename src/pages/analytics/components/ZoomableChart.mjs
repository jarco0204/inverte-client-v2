import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-moment";
// External Libraries
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear.js";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import toObject from "dayjs/plugin/toObject.js";
dayjs.extend(dayOfYear);
dayjs.extend(toObject);
dayjs.extend(utc);
dayjs.extend(timezone);
Chart.register(zoomPlugin);

let data = null;
let hidden = false;
const chartConfig = {
    type: "line",
    data: {
        labels: [],
        datasets: [
            {
                label: "Inventory Weight",
                data: [],
                backgroundColor: ["#42424a"],
                borderColor: ["#42424a"],
                spanGaps: false,
                borderWidth: 1,
                hidden: hidden,
            },
            {
                label: "Correct Weight",
                data: [],
                backgroundColor: ["#00CC00"],
                borderColor: ["#00CC00"],
                spanGaps: false,
                borderWidth: 1,
                hidden: !hidden,
            },
            {
                label: "First Grab",
                data: [],
                backgroundColor: ["	#FF0000"],
                borderColor: ["	#FF0000"],
                spanGaps: false,
                borderWidth: 1,
                hidden: !hidden,
            },
            {
                label: "Final Weight",
                data: [],
                backgroundColor: ["	#0000CC"],
                borderColor: ["#0000CC"],
                spanGaps: false,
                borderWidth: 1,
                hidden: !hidden,
            },
        ],
    },
    options: {
        responsive: true,
        // maintainAspectRatio: false,

        elements: {
            point: {
                radius: 2.5,
            },
        },
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "hour",
                    displayFormats: {
                        hour: "HH:mm",
                    },
                },

                offset: false,
                grid: {
                    display: false,
                    drawBorder: true,
                    drawOnChartArea: false,
                    drawTicks: false,
                },
                font: {
                    size: 8,
                },
            },
            x1: {
                type: "time",
                time: {
                    unit: "day",
                    displayFormats: {
                        hour: "DD",
                    },
                },
            },
            y: {},
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
    data = dataSet.dataSet;

    let xArr = [];
    let weightArr = [],
        cWArr = [],
        fGArr = [],
        fWArr = [];

    if (dataSet.dataSet != null) {
        console.log("The dataSets is", Object.keys(data)[1]);
        chartConfig.options.scales.x.min = parseInt(Object.keys(data)[1]);
        chartConfig.options.scales.x.max = parseInt(Object.keys(data)[data.length - 1]);
    }
    if (dataSet.dataSet != null) {
        for (let i = 0; i < Object.keys(data).length; i++) {
            xArr.push(parseInt(Object.keys(data)[i]));
            weightArr.push(Object.values(data)[i].inventoryWeight);
            cWArr.push(Object.values(data)[i].correctWeight);
            fGArr.push(Object.values(data)[i].firstGrab);
            fWArr.push(Object.values(data)[i].portionWeight);
        }

        console.log("The chartConfig is", chartConfig.data.labels);
        console.log("The chartConfigs is", chartConfig.data.datasets);
        chartConfig.data.labels = xArr;
        chartConfig.data.datasets[0].data = weightArr;
        chartConfig.data.datasets[1].data = cWArr;
        chartConfig.data.datasets[2].data = fGArr;
        chartConfig.data.datasets[3].data = fWArr;
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
