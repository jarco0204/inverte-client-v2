import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Typechecking props for the InputAdornments
InputAdornments.propTypes = {
    label: PropTypes.string,
    unitOfMassCode: PropTypes.string,
    valuePlaceholder: PropTypes.string,
    setCorrectWeight: PropTypes.func,
    submitCorrectPortionParams: PropTypes.func,
    width: PropTypes.string,
    style: PropTypes.object,
};

export default function InputAdornments({ label, unitOfMassCode, valuePlaceholder, setCorrectWeight, submitCorrectPortionParams, width, style = {} }) {
    // Handle the change of the correct portion weight
    const handleChange = (e) => {
        setCorrectWeight(e.target.value);
    };

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", ...style }}>
            <>
                <FormControl sx={{ m: 1, width: width }} variant="outlined">
                    <FormHelperText id="outlined-weight-helper-text">{label}</FormHelperText>
                    <OutlinedInput
                        id="outlined-adornment-weight"
                        style={{
                            backgroundColor: "beige",
                        }}
                        value={valuePlaceholder}
                        onChange={handleChange}
                        endAdornment={<InputAdornment position="end">{unitOfMassCode}</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            "aria-label": "weight",
                        }}
                        onBlur={() => submitCorrectPortionParams()}
                    />
                </FormControl>
            </>
        </Box>
    );
}
