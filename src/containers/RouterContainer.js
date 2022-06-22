import { Route, Routes } from "react-router-dom";

// User-made containers
import SignInContainer from "./SignInContainer";

// import HomeContainer from "./HomeContainer";
import ScalesContainer from "./ScalesContainers";
import AnalyticsContainer from "./AnalyticsContainer";

import Navbar from "../components/NavBar";
import RecipesContainer from "./RecipesContainer";

function RouterContainer({
    authorized = console.log,
    setAuthorized = console.log,
    username = console.log,
    setUsername = console.log,
}) {
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
                                    auth={authorized}
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
                </Routes>
            )}
        </>
    );
}

export default RouterContainer;
