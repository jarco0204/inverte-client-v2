import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import MDTypography from "../../../../components/MDTypography";

export default function RadioActions() {
    return (
        <div style={{ display: "flex", gap: "20px", margin: "20px 0", marginLeft: "40px" }}>
            <FormControl>
                <MDTypography fontWeight="bold" fontSize="14px">
                    Unit
                </MDTypography>

                <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" defaultValue="oz">
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
