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
*/
function RealTimeContainer(props) {
    // console.log("users is authorized: ", props.auth);

    const [data, setData] = useState([]);

    // Do you need this inside UseEffect?
    /*
        This is format to send data from cloud to app
        {
    "timestamp": 6,
    "inventoryWeight": 20
        }
    */
    PubSub.subscribe("johan/1/P0$8").subscribe({
        next: (dataCloud) => {
            console.log("Message received", dataCloud);
            // Change Unix Timesetamp to Local Time
            let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
            d.setUTCMilliseconds(dataCloud.value.timestamp);
            // console.log(d);
            let graphEle = {
                inventoryWeight: dataCloud.value.inventoryWeight,
                timestamp: d,
                inventoryName: dataCloud.value.inventoryName,
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
