import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for MDTypography
import MDTypographyRoot from "./MDTypographyRoot";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "../../context";

// eslint-disable-next-line react/display-name
const MDTypography = forwardRef(({ color, fontWeight, textTransform, verticalAlign, textGradient, opacity, children, fontSize, ...rest }, ref) => {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    return (
        <MDTypographyRoot
            {...rest}
            ref={ref}
            ownerState={{
                color,
                textTransform,
                verticalAlign,
                fontWeight,
                opacity,
                textGradient,
                darkMode,
            }}
            fontSize={fontSize}
        >
            {children}
        </MDTypographyRoot>
    );
});

// Setting default values for the props of MDTypography
MDTypography.defaultProps = {
    color: "dark",
    fontWeight: false,
    textTransform: "none",
    verticalAlign: "unset",
    textGradient: false,
    opacity: 1,
};

// Typechecking props for the MDTypography
MDTypography.propTypes = {
    color: PropTypes.oneOf(["inherit", "primary", "secondary", "info", "success", "warning", "error", "light", "dark", "text", "white"]),
    fontWeight: PropTypes.oneOf([false, "light", "regular", "medium", "bold"]),
    textTransform: PropTypes.oneOf(["none", "capitalize", "uppercase", "lowercase"]),
    verticalAlign: PropTypes.oneOf(["unset", "baseline", "sub", "super", "text-top", "text-bottom", "middle", "top", "bottom"]),
    textGradient: PropTypes.bool,
    children: PropTypes.node,
    opacity: PropTypes.number,
    fontSize: PropTypes.string,
};

export default MDTypography;
