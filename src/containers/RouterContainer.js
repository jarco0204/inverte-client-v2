import { useState } from "react";
import { Route, Routes } from "react-router-dom";

// User-made containers
import SignInContainer from "./SignInContainer";

import RealTimeContainer from "./RealTimeContainer";
import ScalesContainer from "./ScalesContainers";
import AnalyticsContainer from "./AnalyticsContainer";

import Navbar from "../components/NavBar";
import RecipesContainer from "./RecipesContainer";


import { useSelector } from "react-redux";
import { isAuthenticated } from "../redux/authSelector"

import SideContainer from "./SideContainer";

function RouterContainer() {
    // This is the primary state of the App
    const [username, setUsername] = useState("");
    const authorized = useSelector(isAuthenticated)
    const [scalesData, setScalesData] = useState([]);
    const [subTopic, setSubTopic] = useState("");

    return (
        <>
            <SideContainer authorized={authorized} />
            {!authorized && (
                <Routes>
                    <Route
                        path="*"
                        element={
                            <SignInContainer
                                authorized={authorized}
                                username={username}
                                setUsername={setUsername}
                                setScalesData={setScalesData}
                                setSubTopic={setSubTopic}
                            />
                        }
                    />
                </Routes>
            )}

            {authorized && (
                <Routes>
                    <Route
                        path="*"
                        element={
                            <Navbar username={username}>
                                <ScalesContainer
                                    auth={authorized}
                                    username={username}
                                    scalesData={scalesData}
                                />
                            </Navbar>
                        }
                    />
                    <Route
                        path="/scales"
                        element={
                            <Navbar username={username}>
                                <ScalesContainer
                                    username={username}
                                    scalesData={scalesData}
                                />
                            </Navbar>
                        }
                    />
                    <Route
                        path="/recipes"
                        element={
                            <Navbar username={username}>
                                <RecipesContainer auth={authorized} />
                            </Navbar>
                        }
                    />
                    <Route
                        path="/analytics"
                        element={
                            <Navbar username={username}>
                                <AnalyticsContainer auth={authorized} />
                            </Navbar>
                        }
                    />
                    <Route
                        path="/real-time"
                        element={
                            <Navbar username={username}>
                                <RealTimeContainer
                                    auth={authorized}
                                    subTopic={subTopic}
                                />
                            </Navbar>
                        }
                    />
                </Routes>
            )}
        </>
    );
}

export default RouterContainer;
