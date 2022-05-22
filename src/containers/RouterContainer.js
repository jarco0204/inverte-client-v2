import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import OptionsContainer from "./OptionsContainer";
import SignInContainer from "./SignInContainer";

function RouterContainer({
    authorized = console.log,
    setAuthorized = console.log,
}) {
    const [username, setUsername] = useState("");
    return (
        <>
            {!authorized && (
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <SignInContainer
                                authorized={authorized}
                                setAuthorized={setAuthorized}
                                username={username}
                                setUsername={setUsername}
                            />
                        }
                    />
                    <Route exact path="/home" />
                    {/* <NavbarComponent /> */}
                    {/* <SidebarComponent curLocation={curLocation} /> */}
                    {/* <HomePage /> */}
                    <Route path="/opts" element={<OptionsContainer />} />
                </Routes>
            )}
            {authorized && (
                <Routes>
                    <Route path="/scales" />
                    {/* <NavbarComponent /> */}
                    {/* <SidebarComponent curLocation={curLocation} /> */}
                    {/* <ScalesPage /> */}
                    <Route path="/analytics" />
                    {/* <NavbarComponent /> */}
                    {/* <SidebarComponent curLocation={curLocation} /> */}
                    {/* <AnalyticsPage /> */}
                    <Route path="/" element={<Navigate replace to="/" />} />
                    <Route path="/opts" element={<OptionsContainer />} />
                </Routes>
            )}
        </>
    );
}

export default RouterContainer;
