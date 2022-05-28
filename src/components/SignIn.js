import React from "react";
import {
    Avatar,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    TextField,
    Typography,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../theme";

const useStyles = makeStyles((theme) => ({
    "@global": {
        body: {
            backgroundColor: theme.palette.background,
        },
    },
    form: {
        backgroundColor: theme.palette.accent,
    },
    button: {
        color: theme.palette.secondary,
    },
}));

function SignIn(
    {
        handleLogIn = console.log,
        RouterLink,
        email,
        setEmail = console.log,
        password,
        setPassword = console.log,
        error,
        fetching,
    } /*: {
    handleLogIn?:Function,
    RouterLink?:mixed,
    email?:string,
    password?:string,
    error?:string,
    fetching?:boolean,
    setEmail?:Function,
    setPasswword?:Function
}*/,
) {
    const classes = useStyles(theme);

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.form}>
                <Avatar />
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                {error && (
                    <Typography component="h1" variant="subtitle1">
                        {error}
                    </Typography>
                )}
                <form className="form" noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoFocus
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={(event) => setPassword(event.target.value)}
                        value={undefined}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" />}
                        label="Remember me"
                    />
                    <Button
                        color="secondary"
                        fullWidth
                        id="sign-in-button"
                        variant="contained"
                        className={classes.button}
                        onClick={handleLogIn}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </Container>
    );
}
export default SignIn;
