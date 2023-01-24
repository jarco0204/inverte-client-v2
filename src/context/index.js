import { createContext, useContext, useReducer, useMemo } from "react";

// Material Dashboard 2 React main context
const MaterialUI = createContext();

// Context module functions
const setMiniSidenav = (dispatch, value) =>
    dispatch({ type: "MINI_SIDENAV", value });

// Material Dashboard 2 React custom hook for using context
function useMaterialUIController() {
    const context = useContext(MaterialUI);

    if (!context) {
        throw new Error(
            "useMaterialUIController should be used inside the MaterialUIControllerProvider."
        );
    }

    return context;
}

const setOpenConfigurator = (dispatch, value) =>
    dispatch({ type: "OPEN_CONFIGURATOR", value });

export {
    // MaterialUIControllerProvider,
    useMaterialUIController,
    setMiniSidenav,
    // setTransparentSidenav,
    // setWhiteSidenav,
    setOpenConfigurator,
    // setSidenavColor,
    // setTransparentNavbar,
    // setFixedNavbar,
    // setDirection,
    // setLayout,
    // setDarkMode,
};
