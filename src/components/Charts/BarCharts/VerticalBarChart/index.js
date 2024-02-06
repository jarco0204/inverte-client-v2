import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Bar } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "../../../MDBox";
import MDTypography from "../../../MDTypography";

// VerticalBarChart configurations
import barChartConfigs from "./configs/index";

// Material Dashboard 2 React base styles
import colors from "../../../../assets/theme/base/colors";

function VerticalBarChart({ icon, title, description, height, chart, color, unitOfMass }) {
    console.log("The dataset for bar chart is:", chart);

    const data = barChartConfigs(chart);
    if (unitOfMass == "oz" && data.datasets[3].data) {
        data.datasets[3].data = data.datasets[3].data.map((element) => (element / 28.35).toFixed(2));
    }

    const renderChart = (
        <MDBox py={2} pr={2} pl={icon.component ? 1 : 2}>
            {title || description ? (
                <MDBox display="flex" px={description ? 1 : 0} pt={description ? 1 : 0} height="25%">
                    {icon.component && (
                        <MDBox
                            width="4rem"
                            height="4rem"
                            bgColor={icon.color || "info"}
                            variant="gradient"
                            coloredShadow={icon.color || "info"}
                            borderRadius="xl"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            color="white"
                            mt={-5}
                            mr={2}
                        >
                            <Icon fontSize="medium">{icon.component}</Icon>
                        </MDBox>
                    )}
                </MDBox>
            ) : null}
            {useMemo(
                () => (
                    <MDBox variant="gradient" bgColor={color} borderRadius="lg" coloredShadow={color} width="100%" height="20rem">
                        <Bar data={data} />
                    </MDBox>
                ),
                [chart, height]
            )}
            <MDBox mt={icon.component ? -2 : 0}>
                {title && <MDTypography variant="h6">{title}</MDTypography>}
                <MDBox mb={2}>
                    <MDTypography component="div" variant="button" color="text">
                        {description}
                    </MDTypography>
                </MDBox>
            </MDBox>
        </MDBox>
    );

    return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of VerticalBarChart
VerticalBarChart.defaultProps = {
    icon: { color: "info", component: "" },
    title: "",
    description: "",
    height: "19.125rem",
};

// Typechecking props for the VerticalBarChart
VerticalBarChart.propTypes = {
    icon: PropTypes.shape({
        color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "light", "dark"]),
        component: PropTypes.node,
    }),
    title: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    chart: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default VerticalBarChart;
