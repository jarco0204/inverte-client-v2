import React from "react";
import theme from "./theme";
import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";

const ProviderWrapper = ({ children }: { +children: Node }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default ProviderWrapper;
