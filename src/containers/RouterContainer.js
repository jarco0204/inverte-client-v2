import React, { useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

// User-made containers
import SignInContainer from "./SignInContainer";
import HomeContainer from "./HomeContainer";
// Shared Components at the Router Level
import MenuAppBar from "../components/Nav";

function RouterContainer({
    authorized = console.log,
    setAuthorized = console.log,
}) {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const [openSideBar, setOpenSideBar] = useState(false);

    return (
        <>
            <MenuAppBar auth={authorized} setOpenSideBar={setOpenSideBar} />
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
                        element={
                            <HomeContainer
                                auth={authorized}
                                openSideBar={openSideBar}
                            />
                        }
                    />
                    <Route path="/scales" />
                    <Route path="/analytics" />
                </Routes>
            )}
        </>
    );
}

export default RouterContainer;
