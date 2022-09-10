import { useEffect, useState } from "react";

import { PubSub } from "aws-amplify";

import { Line, LineChart, XAxis, YAxis, Tooltip } from "recharts";

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
            setData((data) => [...data, dataCloud.value]);
        },
        error: (error) => console.error(error),
        complete: () => console.log("Done"),
    });

    return (
        <div>
            <h1 style={{ position: "relative", top: "20px", left: "100px" }}>
                Real Time Inventory Usage
            </h1>
            <LineChart width={500} height={300} data={data}>
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Line dataKey="inventoryWeight" />
            </LineChart>
        </div>
    );
}
export default RealTimeContainer;
