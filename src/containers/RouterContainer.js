import { useState } from "react";
import { Route, Routes } from "react-router-dom";

// User-made containers
import SignInContainer from "./SignInContainer";

import RealTimeContainer from "./RealTimeContainer";
import ScalesContainer from "./ScalesContainers";
import AnalyticsContainer from "./AnalyticsContainer";

import Navbar from "../components/NavBar";
import RecipesContainer from "./RecipesContainer";

import SideContainer from "./SideContainer";

function RouterContainer() {
    // This is the primary state of the App
    const [username, setUsername] = useState("");
    const [authorized, setAuthorized] = useState(false);
    const [scalesData, setScalesData] = useState([]);

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
                                setAuthorized={setAuthorized}
                                username={username}
                                setUsername={setUsername}
                                setScalesData={setScalesData}
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
                                    auth={authorized}
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
                                <RealTimeContainer auth={authorized} />
                            </Navbar>
                        }
                    />
                </Routes>
            )}
        </>
    );
}

export default RouterContainer;
