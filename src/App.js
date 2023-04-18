import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import SettingsIcon from "@mui/icons-material/Settings";
import CircularProgress from "@mui/material/CircularProgress";

// Fundamental components
import MDBox from "./components/MDBox";
import Sidenav from "./components/Sidenav";
import Configurator from "./components/Configurator";

// Pages Containers
import SignIn from "./pages/signin";
import routes from "./routes";

// Context to keep track of state
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "./context";

// Material Dashboard Theme
import theme from "./assets/theme";
// import themeDark from "assets/theme-dark"; // TODO

//AWS Imports
import { Auth, API } from "aws-amplify";

// Images
import inverteLogo from "./assets/img/inverte_green_logo.png";

export default function App() {
    // Following lines should be looked into further
    const [controller, dispatch] = useMaterialUIController();
    const { miniSidenav, direction, layout, openConfigurator, sidenavColor, transparentSidenav, whiteSidenav, darkMode } = controller;

    // Component State
    const [onMouseEnter, setOnMouseEnter] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    const [metaInformation, setMetaInformation] = useState({ iotThingNames: ["test"], restaurantName: "pp", restaurantLocation: "pp2" }); //TODO: Support different scale IDs

    const [spinnerLoader, setSpinnerLoader] = useState(false);

    // Hook for For route traversal
    const { pathname } = useLocation();

    // Hook to test Authentication
    useEffect(() => {
        async function authSession() {
            try {
                setSpinnerLoader(true);
                const session = await Auth.currentSession();
                const user = await Auth.currentAuthenticatedUser();
                console.log("My session is:", session);
                console.log("My user is:", user);
                /* This Code block allows you to determine the CognitoIdentityID that allows
                to attach the IoT Policy
                Auth.currentCredentials().then((info) => {
                    const cognitoIdentityId = info.identityId;
                    console.log("pp read this : ", cognitoIdentityId);
                });
                */
                // setUserSession(user);
                await getEssentialInfoAPI(user.username);

                setAuthenticated(true);
                setSpinnerLoader(false);
            } catch (err) {
                console.log("You are not signed in");
                console.log(err);
            }
        }
        authSession();
    }, []);

    // Setting the dir attribute for the body element
    useEffect(() => {
        document.body.setAttribute("dir", direction);
    }, [direction]);

    // Setting page scroll to 0 when changing the route
    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }, [pathname]);

    /*
        Function to open sidenav when mouse enter on mini sidenav
    */
    const handleOnMouseEnter = () => {
        if (miniSidenav && !onMouseEnter) {
            setMiniSidenav(dispatch, false);
            setOnMouseEnter(true);
        }
    };

    /*
        Function to close sidenav when mouse leave mini sidenav
    */
    const handleOnMouseLeave = () => {
        if (onMouseEnter) {
            setMiniSidenav(dispatch, true);
            setOnMouseEnter(false);
        }
    };

    /*
        Function to change the openConfigurator state
    */
    const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

    /*
        Function to retrieve essential info from API
    */
    async function getEssentialInfoAPI(username) {
        try {
            const AMPLIFY_API = process.env.REACT_APP_AMPLIFY_API_NAME;
            const path = "/restaurants/";
            const finalAPIRoute = path + username; //TODO: Cases where userSession is empty

            // Get Essential Restaurant Meta Data (ScaleID)
            // console.log(Response.item.Item);
            await API.get(AMPLIFY_API, finalAPIRoute).then(async (response) => {
                console.log(response.item.Item);
                setMetaInformation(response.item.Item);
            });
        } catch (err) {
            console.log(err);
        }
    }

    // Config Button Component
    const configsButton = (
        <MDBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="3.25rem"
            height="3.25rem"
            bgColor="white"
            shadow="sm"
            borderRadius="50%"
            position="fixed"
            right="2rem"
            bottom="2rem"
            zIndex={99}
            color="dark"
            sx={{ cursor: "pointer" }}
            onClick={handleConfiguratorOpen}
        >
            <Icon fontSize="small" color="inherit">
                <SettingsIcon />
            </Icon>
        </MDBox>
    );

    /*
        Function to control the route traversal

        Specifically, the function first checks if the current route object has a collapse property. 
        If it does, the function recursively calls itself with the collapse property as the new input, effectively flattening nested route structures.
    */
    const getRoutes = (allRoutes) =>
        allRoutes.map((route) => {
            if (route.collapse) {
                return getRoutes(route.collapse);
            }

            if (route.route) {
                return <Route exact path={route.route} element={route.component} key={route.key} />;
            }

            return null;
        });

    /*
        TODO: Make Spinner Loader look Decent
    */
    const SpinnerLoaderScreen = () => {
        return (
            <div style={{ backgroundColor: "lightblue", width: "2000px", height: "2000px" }}>
                <CircularProgress color="success" />
            </div>
        );
    };

    return (
        <>
            {!authenticated ? (
                <>{spinnerLoader ? SpinnerLoaderScreen() : <SignIn setAuthenticated={setAuthenticated} />}</>
            ) : (
                // TODO: Add Dark theme
                <ThemeProvider theme={darkMode ? null : theme}>
                    <CssBaseline />
                    {layout === "dashboard" ? (
                        <>
                            <Sidenav
                                color={sidenavColor}
                                brand={(transparentSidenav && !darkMode) || whiteSidenav ? inverteLogo : inverteLogo}
                                brandName="InVerte"
                                routes={routes(metaInformation)}
                                onMouseEnter={handleOnMouseEnter}
                                onMouseLeave={handleOnMouseLeave}
                            />
                            <Configurator />
                            {configsButton}
                        </>
                    ) : null}
                    {layout === "vr" ? <Configurator /> : null}
                    <Routes>
                        {getRoutes(routes(metaInformation))}
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                </ThemeProvider>
            )}
        </>
    );
}
