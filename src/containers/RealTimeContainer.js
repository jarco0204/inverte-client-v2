import { useEffect, useState } from "react";
import { Line, LineChart, XAxis, YAxis, Tooltip } from "recharts";

/*
    @Input: Authorized state
    @Output: Graph UI Web Socket

    @Coder: El Puma
*/
function RealTimeContainer(props) {
    // console.log("users is authorized: ", props.auth);

    const [data, setData] = useState([]);

    // 1. listen for a cpu event and update the state
    // useEffect(() => {
    //     socket.on("cpu", (cpuPercent) => {
    //         setData((currentData) => [...currentData, cpuPercent]);
    //     });
    // }, []);

    return (
        <div>
            <h1 style={{ position: "relative", top: "20px", left: "100px" }}>
                Real Time Inventory Usage
            </h1>
            <LineChart width={500} height={300} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Line dataKey="value" />
            </LineChart>
        </div>
    );
}
export default RealTimeContainer;
