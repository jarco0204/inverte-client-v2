import React, { useState } from "react";
import SignIn from "../components/SignIn";
import { Auth } from "aws-amplify";

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
            console.log(user.username);

            // State dependent Fields
            setUsername(user.username);
            setAuthorized(true);

            // Welcome the user
            navigate("/home");
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
        <>
            <SignIn
                handleLogIn={handleLogIn}
                email={email}
                password={password}
                error={authorized ? noPermissionError : error}
                fetching={fetching}
                setEmail={setEmail}
                setPassword={setPassword}
            />
        </>
    );
}

export default SignInContainer;
