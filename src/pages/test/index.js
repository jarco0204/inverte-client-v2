import React, { lazy, useEffect, useState } from "react";
import dayjs from "dayjs";
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../components/Navbars/DashboardNavbar";
import Footer from "../../components/Footer";
import MDBox from "../../components/MDBox";
import { CircularProgress } from "@mui/material";
import subtopic from "./data/TestData";

const importView = () =>
    lazy(() =>
        import(`./components/Row`).catch(() => {
            import(`./components/NullView`);
        })
    );

function TestDashboard({ rows_to_display = 3, number_of_plots = 3, rowToShow }) {
    const [requestedDate, setRequestedDate] = useState(dayjs());
    // const [requestedEndDate, setRequestedEndDate] = useState(requestedDate);

    const [rows, setRows] = useState([]);
    const extract_data_v2 = (response) => response.data.children.map((response) => response);
    // const unique_keys = []

    const re_refined_data = () =>
        Array.from(
            {
                length: rows_to_display,
            },
            (_, i) => {
                return i == 0 ? subtopic.data.children.splice(0, 2) : subtopic.data.children.splice(0, number_of_plots);
            }
        );
    const garbage = re_refined_data();
    const modified_subtopic = async (query) => ({
        data: {
            children: [...garbage],
        },
    });
    useEffect(() => {
        async function loadRows() {
            const rowToShow = await modified_subtopic("rows data").then(extract_data_v2);
            // console.log('row',rowToShow)
            let unique_keys = [];
            const componentPromises = rowToShow.map(async (data) => {
                let new_unique_key = Math.floor(Math.random() * 100);
                while (unique_keys.includes(new_unique_key)) {
                    new_unique_key = Math.floor(Math.random() * 100);
                }
                unique_keys.push(new_unique_key);
                const Row = await importView();
                return <Row data={data} key={new_unique_key} requestedDate={requestedDate} number_of_plots={number_of_plots} />;
            });
            Promise.all(componentPromises).then(setRows);
        }
        loadRows();
    }, [rowToShow]);
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mt={4.5}>
                <React.Suspense fallback={<CircularProgress />}>
                    <MDBox mt={4.5}>
                        <div className="container">{rows}</div>
                    </MDBox>
                </React.Suspense>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default TestDashboard;
