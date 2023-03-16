import MDBox from "../../../components/MDBox";
import ReportsBarChart from "../../../components/Charts/BarCharts/ReportsBarChart";
import { Grid } from "@mui/material";

function Plot({
    name,
    color, 
    description, 
    requestedDate, 
    labels,
    datasets,
}) {

    const data = {
        labels: labels,
        datasets: {...datasets}
    }
    return (
        <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
                <ReportsBarChart
                    color={color}
                    title={name}
                    description={description}
                    date={requestedDate.toString()}
                    chart={data}
                />
            </MDBox>
        </Grid>
    )
}


export default Plot;