import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import defaultStore from "./redux/store";
import theme from "./assets/theme";
import App from "./App";

const ProviderWrapper = ({
    children,
    darkMode,
    store = defaultStore
}) => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={darkMode? null: theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </Provider>
    )
}

export default ProviderWrapper