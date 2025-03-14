import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for MDInput
import MDInputRoot from "./MDInputRoot";

//TODO Fix this issue
// eslint-disable-next-line react/display-name
const MDInput = forwardRef(({ error, success, disabled, ...rest }, ref) => <MDInputRoot {...rest} ref={ref} ownerState={{ error, success, disabled }} />);

// Setting default values for the props of MDInput
MDInput.defaultProps = {
    error: false,
    success: false,
    disabled: false,
};

// Typechecking props for the MDInput
MDInput.propTypes = {
    error: PropTypes.bool,
    success: PropTypes.bool,
    disabled: PropTypes.bool,
};

export default MDInput;
