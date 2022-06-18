import { Route, Routes } from "react-router-dom";

// User-made containers
import SignInContainer from "./SignInContainer";
import HomeContainer from "./HomeContainer";
import ScalesContainer from "./ScalesContainers";
import AnalyticsContainer from "./AnalyticsContainer";

function RouterContainer({
    authorized = console.log,
    setAuthorized = console.log,
    navigate = console.log,
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
                                navigate={navigate}
                            />
                        }
                    />
                </Routes>
            )}
            {authorized && (
                <Routes>
                    <Route
                        path="*"
                        element={<HomeContainer auth={authorized} />}
                    />
                    <Route
                        path={`${username}/home`}
                        element={<HomeContainer auth={authorized} />}
                    />
                    <Route
                        path={`${username}/scales`}
                        element={<ScalesContainer auth={authorized} />}
                    />
                    <Route
                        path={`${username}/analytics`}
                        element={<AnalyticsContainer auth={authorized} />}
                    />
                    <Route
                        path={`${username}/recipes`}
                        element={<AnalyticsContainer auth={authorized} />}
                    />
                </Routes>
            )}
        </>
    );
}

export default RouterContainer;
