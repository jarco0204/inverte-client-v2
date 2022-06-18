import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RouterContainer from "./containers/RouterContainer";
import ProviderWrapper from "./Provider";
import theme from "./theme";

export default function App() {
    const navigate = useNavigate(); // To move to other routes
    // Core state
    const [authorized, setAuthorized] = useState(false);
    const [username, setUsername] = useState("");

    return (
        <>
            <ProviderWrapper theme={theme}>
                <RouterContainer
                    authorized={authorized}
                    setAuthorized={setAuthorized}
                    navigate={navigate}
                    username={username}
                    setUsername={setUsername}
                />
            </ProviderWrapper>
        </>
    );
}
