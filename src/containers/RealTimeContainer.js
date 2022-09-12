import { useEffect, useState } from "react";

import { PubSub } from "aws-amplify";

import {
    Line,
    LineChart,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

import CustomToolTipGraph from "../components/CustomToolTipGraph";
/*
    @Input: Authorized state
    @Output: Graph UI Web Socket

    @Coder: El Puma

     //
        Sample Schema
        {
            "deviceID": 189561373270212,
            "timestamp": 1662990223819,
            "readingID": 88,
            "temperature": 206,
            "humidity": 521,
            "airPressure": 991,
            "loadCellStateStr": "steady",
            "ingredientName": "Cheese",
            "correctPortionWeight": 10,
            "portionWeight": 3,
            "inventoryWeight": 1
        }
    //
*/
function RealTimeContainer(props) {
    // console.log("users is authorized: ", props.auth);

    const [data, setData] = useState([]);

    // Learned that next() function repeats based on the number of messages in queue
    // Will using UseEffect solve this issue?
    // Note that Subscribe param needs to be dynamic; this information is already called
    // from API in ScaleContainer => copy it or move it to parent component
    PubSub.subscribe("johan/1").subscribe({
        next: (dataCloud) => {
            console.log("Message received", dataCloud);
            // Change Unix Timesetamp to Local Time
            let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
            d.setUTCMilliseconds(dataCloud.value.timestamp);
            // console.log(d);
            let graphEle = {
                inventoryWeight: dataCloud.value.inventoryWeight,
                timestamp: d,
                inventoryName: dataCloud.value.ingredientName,
            };
            const updatedDataAr = [...data, graphEle];
            setData(updatedDataAr);
        },
        error: (error) => console.error(error),
        complete: () => console.log("Web Socket Done"),
    });

    return (
        <div>
            <h1 style={{ position: "relative", top: "20px", left: "100px" }}>
                Real-Time Inventory Usage
            </h1>
            <br />
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <XAxis
                        dataKey="timestamp"
                        hasTick
                        label={{
                            value: "Time",
                            angle: 0,
                        }}
                    />
                    <YAxis
                        label={{
                            value: "Weight",
                            angle: 270,
                            textAnchor: "middle",
                            dx: -20,
                        }}
                        tickMargin={3}
                    />
                    <Line dataKey="inventoryWeight" />
                    <Tooltip content={<CustomToolTipGraph />} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
export default RealTimeContainer;
