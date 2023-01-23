import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

// AWS imports
import { Auth, API } from "aws-amplify";
import awsConfig from "../aws-exports";

//User Imports
import SignIn from "../components/SignIn";

import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated } from "../redux/authSelector";
import { setAuthentication } from "../redux/Auth";

Auth.configure(awsConfig);

function SignInContainer({
    username = console.log,
    setUsername = console.log,
    setScalesData = console.log,
    setSubTopic = console.log,
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(undefined);

    const navigate = useNavigate();

    const authorized = useSelector(isAuthenticated);
    const noPermissionError = `Your account ${authorized} doees not have permission to use this app. Try signing in with another account.`;
    const dispatch = useDispatch();

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

    /* 
    Sign In functionality using AWS amplify
    */
    async function signing() {
        try {
            const user = await Auth.signIn(email, password);
            // State dependent Fields
            setUsername(user.username);
            // setAuthorized(true);
            console.log(user);

            // Welcome the user
            dispatch(setAuthentication(true));
            getEssentialInfoAPI(user.username);

            navigate("/scales");
        } catch (error) {
            console.log("error signing in", error);
            setError("Wrong credentials");
            return null;
        }
    }

    /*
        Function to retrieve essential info from API
    */

    async function getEssentialInfoAPI(username) {
        const myAPI = "inverteAmplifyRESTapiV1";
        const path = "/restaurants/";
        console.log("Calling API from SignIn");
        let finalAPIRoute = path + username;
        console.log("My API route is ", finalAPIRoute);
        await API.get(myAPI, finalAPIRoute)
            .then((response) => {
                console.log(
                    "Message correctly received from API V2",
                    JSON.stringify(response),
                );
                // let scalesData = response["scaleData"]["Item"];

                // // Create Combined Dataset to generate ScaleCard Components
                // let tempAr = [];
                // for (let i = 0; i < scalesData["mqttPubTopic"].length; i++) {
                //     tempAr.push([scalesData["mqttPubTopic"][i]]);
                // }
                // let subTopic = scalesData["mqttSubTopic"];
                // // Set state
                // setScalesData(tempAr);
                // setSubTopic(subTopic);
            })
            .catch((error) => {
                console.log("Failed to retrieve from API", error);
            });

        console.log("API Call Completes");
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
