import { useState } from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

export default function InputAdornments() {
    const [values, setValues] = useState({
        amount: "",
        password: "",
        weight: "",
        weightRange: "",
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <div>
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-weight"
                        value={values.weight}
                        onChange={handleChange("weight")}
                        endAdornment={
                            <InputAdornment position="end">g</InputAdornment>
                        }
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            "aria-label": "weight",
                        }}
                    />
                    <FormHelperText id="outlined-weight-helper-text">
                        Weight
                    </FormHelperText>
                </FormControl>
            </div>
        </Box>
    );
}
