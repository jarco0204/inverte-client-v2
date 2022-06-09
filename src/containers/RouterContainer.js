import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// User-made containers
import SignInContainer from "./SignInContainer";
import HomeContainer from "./HomeContainer";
import ScalesContainer from "./ScalesContainers";
import AnalyticsContainer from "./AnalyticsContainer";

function RouterContainer({
    authorized = console.log,
    setAuthorized = console.log,
    navigate = console.log,
}) {
    const [username, setUsername] = useState("");

    return (
        <>
            {!authorized && (
                <Routes>
                    <Route
                        path="*"
                        element={
                            <SignInContainer
                                authorized={authorized}
                                setAuthorized={setAuthorized}
                                username={username}
                                setUsername={setUsername}
                                navigate={navigate}
                            />
                        }
                    />
                </Routes>
            )}
            {authorized && (
                <Routes>
                    <Route path="/" element={<Navigate replace to="/home" />} />
                    <Route path="*" element={<Navigate replace to="/home" />} />

                    <Route
                        path="/home"
                        element={<HomeContainer auth={authorized} />}
                    />
                    <Route path="/scales" element={<ScalesContainer />} />
                    <Route path="/analytics" element={<AnalyticsContainer />} />
                    <Route path="/recipes" element={<AnalyticsContainer />} />
                </Routes>
            )}
        </>
    );
}

export default RouterContainer;
