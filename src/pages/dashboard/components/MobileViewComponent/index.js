import Grid from "@mui/material/Grid";
import MDBox from "../../../../components/MDBox";
import PanToolIcon from "@mui/icons-material/PanTool";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import PrecisionManufacturingRoundedIcon from "@mui/icons-material/PrecisionManufacturingRounded";

// User Components
import MobileComplexStatisticsCard from "../MobileComplexStatisticsCard";
import ComplexStatisticsCard from "../../../../components/Cards/StatisticsCards/ComplexStatisticsCard";

/*!
   @description:
   @params:
   @return:
   @Comments
   @Coders: PPxInfinity
*/
const MobileViewComponent = ({ generatePrecisionChartResponsive, generateTimeLineChartResponsive, generateDoughnutChartResponsive, dashboardTitles, dataForMObileView }) => {
    return (
        <MDBox py={3}>
            <Grid container spacing={1} direction="column" justifyContent="center">
                <Grid item xs={12} md={6} lg={3}>
                    <ComplexStatisticsCard color="dark" icon={<PanToolIcon />} title={dashboardTitles.portionsComplete} count={dataForMObileView.cardSummaryItems[0]} />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <MobileComplexStatisticsCard
                        color="info"
                        icon={<PrecisionManufacturingRoundedIcon />}
                        title={dashboardTitles.portionsPrecision}
                        count={dataForMObileView.cardSummaryItems[1]}
                        percentage={{
                            color: "success",
                            amount: dataForMObileView.differencePrecision >= 0 ? "+" + dataForMObileView.differencePrecision.toFixed(0) + "%" : dataForMObileView.differencePrecision.toFixed(0) + "%",
                            label: "than last week",
                        }}
                        generateChart={() => generatePrecisionChartResponsive(true)}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <MobileComplexStatisticsCard
                        color="success"
                        icon={<AccessTimeFilledRoundedIcon />}
                        title={dashboardTitles.portionsTime}
                        count={dataForMObileView.cardSummaryItems[3]}
                        percentage={{
                            color: "success",
                            amount:
                                dataForMObileView.differenceCompletionTime >= 0
                                    ? "+" + dataForMObileView.differenceCompletionTime.toFixed(1) + "s"
                                    : dataForMObileView.differenceCompletionTime.toFixed(1) + "s",
                            label: "than last week",
                        }}
                        generateChart={() => generateTimeLineChartResponsive(true)}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <MobileComplexStatisticsCard
                        color="warning"
                        icon={<PrecisionManufacturingRoundedIcon />}
                        title={dashboardTitles.inventoryConsumed}
                        count={dataForMObileView.cardSummaryItems[2]}
                        percentage={{
                            color: "success",
                            amount: dataForMObileView.differenceInventory >= 0 ? "+" + dataForMObileView.differenceInventory + "g" : dataForMObileView.differenceInventory + "g",
                            label: "than last week",
                        }}
                        generateChart={() => generateDoughnutChartResponsive(true)}
                    />
                </Grid>
            </Grid>
        </MDBox>
    );
};

export default MobileViewComponent;
