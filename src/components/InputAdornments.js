import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

export default function InputAdornments({
    label,
    unitOfMassCode,
    correctPortionWeight,
    setCorrectWeight,
    submitCorrectPortionParams,
}) {
    // Handle the change of the correct portion weight
    const handleChange = (e) => {
        setCorrectWeight(e.target.value);
    };

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <div>
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-weight"
                        style={{
                            backgroundColor: "beige",
                        }}
                        value={correctPortionWeight}
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                                {unitOfMassCode}
                            </InputAdornment>
                        }
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            "aria-label": "weight",
                        }}
                        onBlur={() => submitCorrectPortionParams()}
                    />
                    <FormHelperText id="outlined-weight-helper-text">
                        {label}
                    </FormHelperText>
                </FormControl>
            </div>
        </Box>
    );
}
