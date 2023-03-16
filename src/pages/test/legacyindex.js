import React, { lazy, useEffect, useState } from 'react';

import Grid from "@mui/material/Grid";
import dayjs, { Dayjs } from "dayjs";
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import MDBox from "../../components/MDBox";
import DashboardNavbar from "../../components/Navbars/DashboardNavbar";
import Footer from "../../components/Footer";


const plotAr = (start, stop, step) => Array.from({
    length: (stop - start) / step + 1 }, (_,i) => `Plot${start + i * step}`)

const test_array = plotAr(1,7,1)

const importView = subplot => 
    lazy(() =>
        import(`./components/${subplot}`).catch(() =>{ 
            console.log('hey')
            import(`./components/NullView`)
        })
    );

const subtopic = async query => ({
    data: {
        children: [
            {
                data: {
                    name: 'Plot1',
                    labels: ["M", "T", "W", "TR", "F", "S", "S"],
                    datasets: { label: "Mobile apps", data: [500, 800, 1200, 1500, 2500, 2400, 1250, 230, 500] },
                }
            },
            {
                data: {
                    name: 'Plot2',
                    labels: ["M", "T", "W", "TR", "F", "S", "S"],
                    datasets: { label: "Device apps", data: [500, 800, 1200, 1500, 2500, 2400, 1250, 230, 500] },
                }
            },
            {
                data: {
                    name: 'Plot3',
                    labels: ["M", "T", "W", "TR", "F", "S", "S"],
                    datasets: { label: "Test apps", data: [500, 800, 1200, 1500, 2500, 2400, 1250, 230, 500] },
                }
            },
            {
                data: {
                    name: 'Plot4',
                    labels: ["M", "T", "W", "TR", "F", "S", "S"],
                    datasets: { label: "Test apps", data: [500, 800, 1200, 1500, 2500, 2400, 1250, 230, 500] },
                }
            },
            {
                data: {
                    name: 'Plot5',
                    labels: ["M", "T", "W", "TR", "F", "S", "S"],
                    datasets: { label: "Test apps", data: [500, 800, 1200, 1500, 2500, 2400, 1250, 230, 500] },
                }
            },
            {
                data: {
                    name: 'Plot6',
                    labels: ["M", "T", "W", "TR", "F", "S", "S"],
                    datasets: { label: "Test apps", data: [500, 800, 1200, 1500, 2500, 2400, 1250, 230, 500] },
                }
            },
            {
                data: {
                    name: 'Plot7',
                    labels: ["M", "T", "W", "TR", "F", "S", "S"],
                    datasets: { label: "Test apps", data: [500, 800, 1200, 1500, 2500, 2400, 1250, 230, 500] },
                }
            },
        ]
    }
})


function TestDashboard({plotToShow}) {
    const [requestedDate, setRequestedDate] = useState(dayjs());
    const [requestedEndDate, setRequestedEndDate] = useState(requestedDate);


    const [views, setViews] = useState([])

    const extract_data = response => response.data.children.map(({data}) => data);
    useEffect(() => {
        async function loadViews() {
            const plotToShow = await subtopic('data plots').then(extract_data)
            // console.log(await subtopic.data.children)
            console.log(plotToShow)
            let unique_keys = []
            const componentPromises = plotToShow.map(async data => {
                let new_unique_key = Math.floor(Math.random()*100)
                while (unique_keys.includes(new_unique_key)){
                    new_unique_key = Math.floor(Math.random()*100)
                }
                unique_keys.push(new_unique_key)
                const View = await importView(data.name);
                return <View {...data} key={new_unique_key} requestedDate={requestedDate}/>;
            })
            console.log(componentPromises)
            Promise.all(componentPromises).then(setViews)
        }
        loadViews()
    }, [plotToShow]);
    return (
            <DashboardLayout>
                <DashboardNavbar />
                <MDBox mt={4.5}>
                    <Grid container spacing={3}>
                        <React.Suspense fallback="Loading ...">
                            <div className='container'>{views}</div>
                        </React.Suspense>
                    </Grid>
                        {/*<Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={4}>
                                <MDBox mb={3}>
                                    <ReportsBarChart
                                        color="primary"
                                        title="Under Serving Portions"
                                        description="Describing"
                                        date={requestedDate.toString()}
                                        chart={{
                                            labels: ["M", "T", "W", "TR", "F", "S", "S"],
                                            datasets: { label: "Mobile apps", data: [500, 800, 1200, 1500, 2500, 2400, 1250, 230, 500] },
                                        }}
                                    />
                                </MDBox>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <MDBox mb={3}>
                                    <ReportsBarChart
                                        color="info"
                                        title="Accurate Portions"
                                        description="Describing"
                                        date={requestedDate.toString()}
                                        chart={{
                                            labels: ["M", "T", "W", "TR", "F", "S", "S"],
                                            datasets: { label: "Mobile apps", data: [500, 800, 1200, 1500, 2500, 2400, 1250, 230, 500] },
                                        }}
                                    />
                                </MDBox>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <MDBox mb={3}>
                                    <ReportsBarChart
                                        color="warning"
                                        title="Over serving Portions"
                                        description="Describing"
                                        date={requestedDate.toString()}
                                        chart={{
                                            labels: ["M", "T", "W", "TR", "F", "S", "S"],
                                            datasets: { label: "Mobile apps", data: [500, 800, 1200, 1500, 2500, 2400, 1250, 230, 500] },
                                        }}
                                    />
                                </MDBox>
                            </Grid>
                        </Grid> */}
                </MDBox>
                <Footer />
            </DashboardLayout>
    );
}

export default TestDashboard;
