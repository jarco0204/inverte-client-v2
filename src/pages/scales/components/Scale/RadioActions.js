import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import MDTypography from "../../../../components/MDTypography";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Setting default values for the props of Scale
RadioActions.defaultProps = {
    setUnitOfMassCode: null,
};

// Typechecking props for the Scale
RadioActions.propTypes = {
    setUnitOfMassCode: PropTypes.func,
};

export default function RadioActions({ setUnitOfMassCode }) {
    /*
        Function to handle the change of unit of mass
    */
    const unitOfMassChange = (event) => {
        console.log(event.target.value);
        setUnitOfMassCode();
    };
    return (
        <div style={{ display: "flex", gap: "20px", margin: "20px 0", marginLeft: "40px" }}>
            <FormControl>
                <MDTypography fontWeight="bold" fontSize="14px">
                    Unit
                </MDTypography>

                <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" defaultValue="oz" onChange={unitOfMassChange}>
                    <FormControlLabel value="oz" control={<Radio />} label="oz" />
                    <FormControlLabel value="g" control={<Radio />} label="g" />
                </RadioGroup>
            </FormControl>
            <FormControl>
                <MDTypography fontSize="14px" fontWeight="bold">
                    Mode
                </MDTypography>

                <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" defaultValue="portion">
                    <FormControlLabel value="portion" control={<Radio />} label="portion" checked />
                    <FormControlLabel value="normal" control={<Radio />} label="normal" />
                </RadioGroup>
            </FormControl>
        </div>
    );
}
