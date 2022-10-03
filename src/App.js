import React, { useState } from "react";
import RouterContainer from "./containers/RouterContainer";
import ProviderWrapper from "./Provider";
import theme from "./theme";
import SideContainer from "./containers/SideContainer";

export default function App() {
    // Core state
    const [username, setUsername] = useState("");

    return (
        <>
            <ProviderWrapper theme={theme}>
                <SideContainer />
                <RouterContainer
                    username={username}
                    setUsername={setUsername}
                    />
            </ProviderWrapper>
        </>
    );
}
