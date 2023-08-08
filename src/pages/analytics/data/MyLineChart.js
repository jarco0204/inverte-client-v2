import React, { PureComponent, useEffect } from "react";
import { Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea, ResponsiveContainer, ScatterChart } from "recharts";

const initialState = {
    data: [],
    left: "dataMin",
    right: "dataMax",
    refAreaLeft: "",
    refAreaRight: "",
    top: "dataMax+1",
    bottom: "dataMin-1",
    top2: "dataMax+20",
    bottom2: "dataMin-20",
    animation: true,
};

export default class MyLineChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = initialState;

        console.log("Data in props is", props.data);
    }
    componentDidMount = () => {
        console.log("Mounted");
        this.setState({
            data: this.props.data,
        });
    };
    getAxisYDomain = (from, to, ref, offset) => {
        //const refData = this.state.data;
        console.log("The values of from is:", from);
        console.log("The value of to is:", to);
        console.log("The data is:", Object.values(this.state.data));
        for (let i = 0; i < Object.values(this.state.data).length; i++) {
            if (Object.values(this.state.data)[i].x == from) {
                from = i;
            }
            if (Object.values(this.state.data)[i].x == to) {
                to = i;
            }
        }

        const refData = Object.values(this.state.data).slice(from, to);
        console.log("The refData is:", refData);
        let [bottom, top] = [refData[0].y, refData[0].y];
        refData.forEach((d) => {
            if (d.y > top) top = d.y;
            if (d.y < bottom) bottom = d.y;
        });
        console.log("The bottom is", bottom);
        console.log("The top is:", top);
        return [(bottom | 0) - offset, (top | 0) + offset];
    };

    zoom() {
        let { refAreaLeft, refAreaRight } = this.state;
        const { data } = this.state;

        if (refAreaLeft === refAreaRight || refAreaRight === "") {
            this.setState(() => ({
                refAreaLeft: "",
                refAreaRight: "",
            }));
            return;
        }

        // xAxis domain
        if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

        // yAxis domain
        const [bottom, top] = this.getAxisYDomain(refAreaLeft, refAreaRight, "", 15);
        console.log("The value of refAreaLeft is", refAreaLeft);
        this.setState(() => ({
            refAreaLeft: "",
            refAreaRight: "",
            data: data.slice(),
            left: refAreaLeft,
            right: refAreaRight,
            bottom,
            top,
        }));
        console.log("The value of left is", this.state.left);
    }

    zoomOut() {
        const { data } = this.state;

        this.setState(() => ({
            data: data.slice(),
            refAreaLeft: "",
            refAreaRight: "",
            left: "dataMin",
            right: "dataMax",
            top: "dataMax+1",
            bottom: "dataMin",
        }));
    }

    render() {
        const { data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom } = this.state;

        return (
            <div className="highlight-bar-charts" style={{ userSelect: "none", width: "100%" }}>
                <button type="button" className="btn update" onClick={this.zoomOut.bind(this)}>
                    Zoom Out
                </button>

                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        width={800}
                        height={400}
                        data={data}
                        onMouseDown={(e) => this.setState({ refAreaLeft: e.activeLabel })}
                        onMouseMove={(e) => this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel })}
                        // eslint-disable-next-line react/jsx-no-bind
                        onMouseUp={this.zoom.bind(this)}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis allowDataOverflow dataKey="x" domain={[left, right]} type="ordinal" />
                        <YAxis allowDataOverflow domain={[bottom, top]} dataKey="y" type="number" yAxisId="1" />

                        <Tooltip />
                        <Line yAxisId="1" dataKey="y" stroke="#8884d7" animationDuration={300} />

                        {refAreaLeft && refAreaRight ? <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} /> : null}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }
}
