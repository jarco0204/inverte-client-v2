import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
// import FormHelperText from "@mui/material/FormHelperText";

const EditableCardNameParam = (props) => {
    // Handle the change of the correct portion weight
    const handleChange = (e) => {
        props.setNameIngredient(e.target.value);
    };
    return (
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <div>
                <FormControl sx={{ width: "10ch" }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-weight"
                        style={{
                            backgroundColor: "grey",
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
                    {/* <FormHelperText id="outlined-weight-helper-text">{props.scaleType}</FormHelperText> */}
                </FormControl>
            </div>
        </Box>
    );
};

export default EditableCardNameParam;
