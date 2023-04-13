import React, { useState } from "react";

// External UI Components
import { Button, Checkbox, Container, FormControlLabel, TextField, Typography, ThemeProvider, IconButton, Toolbar } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";

// AWS imports
import { Auth } from "aws-amplify";

import logo from "../../assets/img/inverte_green_logo.png";

const theme = createTheme({
    palette: {
        primary: {
            main: "#02182E",
        },
        secondary: {
            main: "#e3dac9",
        },
        accent: {
            main: "#6AC259",
        },
    },
});

// eslint-disable-next-line
function SignInContainer({ setAuthenticated = console.log }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    // const [fetching, setFetching] = useState(false);

    /*
        Event handler for when user clicks on Log-in
        
        TODO: Improve criteria for validating email and password
    */
    async function handleLogIn() {
        // console.log(event);
        if (email === "") {
            setError("Enter your email");
        } else if (password === "") {
            setError("Enter your password");
        } else {
            // setFetching(true);
            console.log(email);
            console.log(password);

            try {
                await Auth.signIn(email, password);
                setAuthenticated(true);
                // Auth.currentCredentials().then((info) => {
                //     const cognitoIdentityId = info.identityId;
                //     console.log(cognitoIdentityId);
                // });
            } catch (error) {
                console.log("error signing in", error);
                setError("Wrong credentials");
                return null;
            }
        }
    }

    /*
        Function to retrieve essential info from API
    */
    // async function getEssentialInfoAPI(username) {
    // }

    return (
        <ThemeProvider theme={theme}>
            <AppBar color="primary">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <IconButton color="inherit" aria-label="open drawer" edge="start" sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
                            <img src={logo} alt="logo" style={{ maxWidth: "100px" }} />
                            <Typography
                                variant="h4"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    display: { xs: "none", md: "flex" },
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                INVERTE
                            </Typography>
                        </IconButton>

                        <IconButton color="inherit" aria-label="open drawer" edge="start" sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
                            <img src={logo} alt="logo" style={{ maxWidth: "75px" }} />
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    display: { xs: "flex", md: "none" },
                                    flexGrow: 2,
                                    fontWeight: 900,
                                    letterSpacing: ".3rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                INVERTE
                            </Typography>
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container sx={{ padding: 10 }} disableGutters={true}>
                <div
                    style={{
                        paddingTop: "50px",
                        margin: "auto",
                        maxWidth: "300px",
                    }}
                >
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
                            label="Email"
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
                        <FormControlLabel control={<Checkbox value="remember" />} label="Remember me" />
                        <Button color="primary" fullWidth id="sign-in-button" variant="contained" onClick={handleLogIn}>
                            Sign In
                        </Button>
                    </form>
                </div>
            </Container>
        </ThemeProvider>
    );
}

export default SignInContainer;
