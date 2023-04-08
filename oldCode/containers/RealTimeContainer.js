import { useState } from "react";

import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

import CustomToolTipGraph from "../components/CustomToolTipGraph";
/*
    @Input: Authorized state
    @Output: Graph UI Web Socket

    @Coder: El Puma

        Sample Schema
        {
            "deviceID": 189561373198832,
            "timestamp": 1667221600343,
            "readingID": 14,
            "temperature": 256,
            "humidity": 302,
            "airPressure": 1008,
            "ingredientName": "Cheese",
            "correctPortionWeight": 10,
            "portionWeight": 0,
            "upperLimit": 1,
            "lowerLimit": 1,
            "inventoryWeight": 59,
            "portionStatus": "Idle"
        }
*/
function RealTimeContainer({ auth = console.log, subTopic = console.log }) {
    // console.log("users is authorized: ", props.auth);

    const [data, setData] = useState([]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "100px",
                textAlign: "center",
            }}
        >
            <h3 style={{ top: "0px", left: "10px" }}>Real-Time Inventory Usage</h3>
            <br />
            <ResponsiveContainer width={300} height={310}>
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
