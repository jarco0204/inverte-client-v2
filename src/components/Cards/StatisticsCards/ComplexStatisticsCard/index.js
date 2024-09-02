// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";

function ComplexStatisticsCard({ color, title, count, percentage, icon }) {
    return (
        <Card>
            <MDBox display="flex" justifyContent="space-between" pt={1} px={2} height="75px">
                <MDBox
                    variant="gradient"
                    bgColor={color}
                    color={color === "light" ? "dark" : "white"}
                    coloredShadow={color}
                    borderRadius="xl"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="4rem"
                    height="4rem"
                    mt={-3}
                >
                    <Icon fontSize="medium" color="inherit">
                        {icon}
                    </Icon>
                </MDBox>
                <MDBox textAlign="right" lineHeight={1.25}>
                    <MDTypography variant="button" fontWeight="light" color="text">
                        {title}
                    </MDTypography>
                    <MDTypography variant="h4">{count}</MDTypography>
                </MDBox>
            </MDBox>
            {/* <Divider /> */}
            <MDBox pb={2} px={2}>
                <MDTypography
                    component="p"
                    variant="button"
                    color="text"
                    display="flex"
                    justifyContent="space-between" // Spreads items between left, center, and right
                    alignItems="center" // Vertically centers the items
                    width="100%" // Optional: Ensures the box takes full width
                >
                    {/* Left Typography */}
                    <MDTypography
                        component="span"
                        variant="button"
                        fontWeight="bold"
                        color={percentage.color}
                        style={{ flex: 1, textAlign: "left" }} // Aligns text to the left
                    >
                        {percentage.food1} {percentage.portionSize1}&nbsp;
                    </MDTypography>

                    {/* Center Typography */}
                    <MDTypography
                        component="span"
                        variant="button"
                        fontWeight="bold"
                        color={percentage.color}
                        style={{ flex: 1, textAlign: "center" }} // Aligns text to the center
                    >
                        {percentage.food2}&nbsp; {percentage.portionSize2}&nbsp;
                    </MDTypography>

                    {/* Right Typography */}
                    <MDTypography
                        component="span"
                        variant="button"
                        fontWeight="bold"
                        color={percentage.color}
                        style={{ flex: 1, textAlign: "right" }} // Aligns text to the right
                    >
                        {percentage.label}&nbsp;
                        {percentage.portionSize3 > 0 ? percentage.portionSize3 : ""}&nbsp;
                    </MDTypography>
                </MDTypography>
            </MDBox>
        </Card>
    );
}

// Setting default values for the props of ComplexStatisticsCard
ComplexStatisticsCard.defaultProps = {
    color: "info",
    percentage: {
        color: "success",
        text: "",
        label: "",
    },
};

// Typechecking props for the ComplexStatisticsCard
ComplexStatisticsCard.propTypes = {
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "light", "dark"]),
    title: PropTypes.string.isRequired,
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    percentage: PropTypes.shape({
        color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark", "white", "red"]),
        portionSize1: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        portionSize2: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        portionSize3: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
    }),
    icon: PropTypes.node.isRequired,
};

export default ComplexStatisticsCard;
