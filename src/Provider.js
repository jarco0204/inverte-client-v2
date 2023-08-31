import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import defaultStore from "./redux/store";
// import App from "./App";

const ProviderWrapper = ({
    children,
    darkMode,
    theme,
    store = defaultStore
}) => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={darkMode? null: theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </Provider>
    )
}

export default ProviderWrapper