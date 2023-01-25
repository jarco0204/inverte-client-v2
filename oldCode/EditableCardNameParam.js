import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

const EditableCardNameParam = (props) => {
    // Handle the change of the correct portion weight
    const handleChange = (e) => {
        props.setNameIngredient(e.target.value);
    };
    return (
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <div>
                <FormControl sx={{ width: "20ch" }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-weight"
                        style={{
                            backgroundColor: "beige",
                            height: "35px",
                        }}
                        value={props.ingredientName}
                        onChange={handleChange}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            "aria-label": "weight",
                        }}
                        onBlur={() => props.sendDataAWS()}
                    />
                    <FormHelperText id="outlined-weight-helper-text">
                        {props.scaleType}
                    </FormHelperText>
                </FormControl>
            </div>
        </Box>
    );
};

export default EditableCardNameParam;
