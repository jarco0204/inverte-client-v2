import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

// AWS imports
import { Auth } from "aws-amplify";
import awsConfig from "../aws-exports";

//User Imports
import SignIn from "../components/SignIn";

import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated } from "../redux/authSelector";
import { setAuthetication } from "../redux/Auth";

Auth.configure(awsConfig);

function SignInContainer({
    username = console.log,
    setUsername = console.log,
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(undefined);

    const navigate = useNavigate();

    const authorized = useSelector(isAuthenticated)
    const noPermissionError = `Your account ${authorized} doees not have permission to use this app. Try signing in with another account.`;
    const dispatch = useDispatch()
    /* 
    Sign In functionality using AWS amplify
    */
    async function signing() {
        try {
            const user = await Auth.signIn(email, password);
            // State dependent Fields
            setUsername(user.username);
            console.log(user)
            // dispatch(setUserInfo(userInfo))
            // dispatch(setAuthetication(true))
            // console.log('huh')
            // Welcome the user
            // navigate("/scales");
            return user
            // navigate("test/home");
        } catch (error) {
            console.log("error signing in", error);
            setError("Wrong credentials");
            return null
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
            const userInf = signing();
            if (userInf === null){
                console.log('ups')
            } else {
                dispatch(setAuthetication(true))
                console.log('huuumm')
                navigate("/scales");

            }
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
