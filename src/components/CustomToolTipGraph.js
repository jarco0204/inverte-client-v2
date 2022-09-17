import React from "react";
import { format } from "date-fns";

const style = {
    padding: 6,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
};

const CustomToolTipGraph = (props) => {
    const { active, payload } = props;
    if (active) {
        const currData = payload && payload.length ? payload[0].payload : null;
        return (
            <div className="area-chart-tooltip" style={style}>
                <p>
                    {currData
                        ? format(
                              new Date(currData.timestamp),
                              "yy-MM-dd / hh:mm:ss",
                          )
                        : " -- "}
                </p>
                <p>
                    {"Weight : "}
                    <em>{currData ? currData.inventoryWeight : " -- "}</em>
                </p>
                <p>
                    {"Name : "}
                    <em>{currData ? currData.inventoryName : " -- "}</em>
                </p>
            </div>
        );
    }

    return null;
};

export default CustomToolTipGraph;
