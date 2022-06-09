import { Button, Grid, TextField } from "@mui/material";
import InputAdornments from "./InputAdornments";

function Scale() {
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Button>0</Button>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="ingredient-name"
                        label="Read Only"
                        defaultValue="CHEESE"
                        InputProps={{
                            readOnly: true,
                        }}
                        // variant='standard'
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" disabled>
                        Correct Portion Weight
                    </Button>
                </Grid>
                <Grid item xs={8}>
                    <InputAdornments />
                </Grid>
                <Grid item xs={5}>
                    Accepted portion offset
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <TextField
                        id="outlined-basic"
                        label="Under"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={1}>
                    <TextField
                        id="outlined-basic"
                        label="Over"
                        variant="outlined"
                    />
                </Grid>
            </Grid>
        </>
    );
}
export default Scale;
