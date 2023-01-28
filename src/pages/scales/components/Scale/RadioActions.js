import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RowRadioButtonsGroup({ label1, label2, title }) {
    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">{title}</FormLabel>
            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                <FormControlLabel value={label1} control={<Radio />} label={label1} />
                <FormControlLabel value={label2} control={<Radio />} label={label2} />
            </RadioGroup>
        </FormControl>
    );
}
