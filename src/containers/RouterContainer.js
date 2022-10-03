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

function RouterContainer({
    username = console.log,
    setUsername = console.log,
}) {

    const authorized = useSelector(isAuthenticated)
    return (
        <>
            {!authorized && (
                <Routes>
                    <Route
                        path="*"
                        element={
                            <SignInContainer
                                authorized={authorized}
                                username={username}
                                setUsername={setUsername}
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
