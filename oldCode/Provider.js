import React from "react";
import theme from "./theme";
import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import defaultStore from "./redux/store";

const ProviderWrapper = ({ children }: { +children: Node }) => {
    return (
        <Provider store={defaultStore}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </Provider>
    );
};

export default ProviderWrapper;
