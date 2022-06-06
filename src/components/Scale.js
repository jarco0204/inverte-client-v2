import { Button, Grid, TextField } from "@mui/material";

function Scale() {
    return (
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
        </Grid>
    );
}
export default Scale;
