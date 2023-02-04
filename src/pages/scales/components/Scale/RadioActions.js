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
    unitOfMassCode: "oz",
    sendDataAWS: null,
};

// Typechecking props for the Scale
RadioActions.propTypes = {
    setUnitOfMassCode: PropTypes.func,
    unitOfMassCode: PropTypes.string,
    sendDataAWS: PropTypes.func,
};

export default function RadioActions({ setUnitOfMassCode, unitOfMassCode, sendDataAWS }) {
    /*
        Function to handle the change of unit of mass
    */
    const unitOfMassChange = () => {
        // console.log(event.target.value);
        if (unitOfMassCode === "oz") {
            setUnitOfMassCode("g");
        } else {
            setUnitOfMassCode("oz");
        }
        sendDataAWS(true, 3, unitOfMassCode);
    };

    /*
        Function to handle a change in the scale mode
    */
    const scaleModeChange = (event) => {
        sendDataAWS(true, 4, event.target.value);
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

                <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" defaultValue="portion" onChange={scaleModeChange}>
                    <FormControlLabel value="portion" control={<Radio />} label="portion" />
                    <FormControlLabel value="normal" control={<Radio />} label="normal" />
                </RadioGroup>
            </FormControl>
        </div>
    );
}
