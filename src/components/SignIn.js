import React from "react";
import {
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    styled,
    TextField,
    Typography,
} from "@mui/material";

function SignIn({
    handleLogIn = console.log,
    email,
    setEmail = console.log,
    password,
    setPassword = console.log,
    error,
    fetching,
}) {
    return (
        <Container maxWidth="xs" sx={{ padding: 140 }}>
            <div style={{ paddingTop: "50px" }}>
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
                        color="primary"
                        fullWidth
                        id="sign-in-button"
                        variant="contained"
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
