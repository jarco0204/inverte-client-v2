import React, { useState } from "react";
// AWS imports
import { Auth } from "aws-amplify";
import awsConfig from "../aws-exports";

//User Imports
import SignIn from "../components/SignIn";
import Box from "@mui/material/Box";

Auth.configure(awsConfig);

function SignInContainer({
    authorized = console.log,
    setAuthorized = console.log,
    username = console.log,
    setUsername = console.log,
    navigate = console.log,
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(undefined);

    const noPermissionError = `Your account ${authorized} doees not have permission to use this app. Try signing in with another account.`;

    /* 
    Sign In functionality using AWS amplify
    */
    async function signing() {
        try {
            const user = await Auth.signIn(email, password);

            // State dependent Fields
            setUsername(user.username);
            setAuthorized(true);

            // Welcome the user
            navigate(user.username + "/home");
        } catch (error) {
            console.log("error signing in", error);
            setError("Wrong credentials");
        }
    }
    /*
        Event handler for when user clicks on Log-in
    */
    function handleLogIn(event) {
        console.log(event);
        if (email === "") {
            setError("Enter your email");
        } else if (password === "") {
            setError("Enter your password");
        } else {
            setError(undefined);
            setFetching(true);
            console.log(email);
            console.log(password);
            signing();
        }
    }

    return (
        <Box>
            <SignIn
                handleLogIn={handleLogIn}
                email={email}
                password={password}
                error={authorized ? noPermissionError : error}
                fetching={fetching}
                setEmail={setEmail}
                setPassword={setPassword}
            />
        </Box>
    );
}

export default SignInContainer;
