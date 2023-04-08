import React, { useState } from "react";

// External UI Components
import { Button, Checkbox, Container, FormControlLabel, TextField, Typography, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

// Internal UI Components
import Header from "./components/Header";

// AWS imports
import { Auth } from "aws-amplify";

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
function SignIn({ setAuthenticated = console.log }) {
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
    //     const myAPI = "inverteAmplifyRESTapiV1";
    //     const path = "/restaurants/";
    //     console.log("Calling API from SignIn");
    //     let finalAPIRoute = path + username;
    //     console.log("My API route is ", finalAPIRoute);
    //     await API.get(myAPI, finalAPIRoute)
    //         .then((response) => {
    //             console.log("Message correctly received from API V2", JSON.stringify(response));
    //             // let scalesData = response["scaleData"]["Item"];

    //             // // Create Combined Dataset to generate ScaleCard Components
    //             // let tempAr = [];
    //             // for (let i = 0; i < scalesData["mqttPubTopic"].length; i++) {
    //             //     tempAr.push([scalesData["mqttPubTopic"][i]]);
    //             // }
    //             // let subTopic = scalesData["mqttSubTopic"];
    //             // // Set state
    //             // setScalesData(tempAr);
    //             // setSubTopic(subTopic);
    //         })
    //         .catch((error) => {
    //             console.log("Failed to retrieve from API", error);
    //         });

    //     console.log("API Call Completes");
    // }
    return (
        <ThemeProvider theme={theme}>
            <Header />
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

export default SignIn;
