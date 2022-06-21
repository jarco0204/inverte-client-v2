import React, { useState } from "react";
import RouterContainer from "./containers/RouterContainer";
import ProviderWrapper from "./Provider";
import theme from "./theme";
import SideContainer from "./containers/SideContainer";

export default function App() {
    // Core state
    const [authorized, setAuthorized] = useState(false);
    const [username, setUsername] = useState("");

    return (
        <>
            <ProviderWrapper theme={theme}>
                <SideContainer authorized={authorized} />
                <RouterContainer
                    authorized={authorized}
                    setAuthorized={setAuthorized}
                    username={username}
                    setUsername={setUsername}
                    />
            </ProviderWrapper>
        </>
    );
}
