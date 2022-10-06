import React from "react";
import RouterContainer from "./containers/RouterContainer";
import ProviderWrapper from "./Provider";
import theme from "./theme";

export default function App() {

    return (
        <>
            <ProviderWrapper theme={theme}>
                <RouterContainer />
            </ProviderWrapper>
        </>
    );
}
