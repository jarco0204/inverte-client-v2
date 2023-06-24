// React Imports
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography } from "@material-ui/core";

//AWS Imports
import { Amplify, Auth, API } from "aws-amplify";
import { AWSIoTProvider } from "@aws-amplify/pubsub";
import awsmobile from "./aws-exports";

// App-Level Components
import Sidenav from "./components/Sidenav";
import Configurator from "./components/Configurator";
import { useMaterialUIController, setMiniSidenav } from "./context"; // Context to keep track of state
import theme from "./assets/theme";
import ButtonConfig from "./components/ButtonConfig";
// import themeDark from "assets/theme-dark"; // TODO

// Pages Containers
import SignIn from "./pages/signin";
import routes from "./routes";

// Assets
import inverteLogo from "./assets/img/inverte_green_logo.png";
import inverteLogoSideWhite from "./assets/img/inverteLogo.png";
import inverteLogoSideBlack from "./assets/img/inverteLogoBlack.png";
import "./assets/css/SpinnerLoaderScreen.css";

// AWS Config
Amplify.addPluggable(
    // Amplify Pub/Sub MQTT Client for Scale Container
    new AWSIoTProvider({
        aws_pubsub_region: process.env.REACT_APP_AWS_REGION,
        aws_pubsub_endpoint: "wss://" + process.env.REACT_APP_MQTT_ENDPOINT + ".iot." + process.env.REACT_APP_AWS_REGION + ".amazonaws.com/mqtt",
    })
);
Amplify.configure(awsmobile); // // Amplify.Logger.LOG_LEVEL = "DEBUG";

// Global Variables
let DEBUG_FLAG = true;

/*!
   @description:
   @params:
   @return:
   @Comments
   @Coders: ElToro56
*/
export default function App() {
    // Theme Settings
    const [controller, dispatch] = useMaterialUIController();
    const { miniSidenav, direction, layout, openConfigurator, sidenavColor, transparentSidenav, whiteSidenav, darkMode } = controller;

    // Component State
    const [onMouseEnter, setOnMouseEnter] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [spinnerLoader, setSpinnerLoader] = useState(false);
    const [displayIngredient, setDisplayIngredient] = useState(0);
    const [metaInformation, setMetaInformation] = useState({ iotThingNames: ["test"], restaurantName: "pp", restaurantLocation: "pp2", unitOfMass: "pp3" });
    const [unitOfMass, setUnitOfMass] = useState(metaInformation.unitOfMass);

    // Hook for route traversal
    const { pathname } = useLocation();

    // ======================= Start of UseEffect Hooks ===================

    // Setting the dir attribute for the body element
    useEffect(() => {
        document.body.setAttribute("dir", direction);
    }, [direction]);

    // Setting page scroll to 0 when changing the route
    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }, [pathname]);

    // Setting the dir attribute for the body element
    useEffect(() => {
        document.body.setAttribute("dir", direction);
    }, [direction]);

    // Setting page scroll to 0 when changing the route
    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }, [pathname]);

    // Handling Authentication
    useEffect(() => {
        /*!
           @description: Use Amplify Auth to handle authentication and signin
           @params:
           @return:
           @Comments
           @Coders: MohanPPs
        */
        async function authSession() {
            try {
                // Const Definition
                const session = await Auth.currentSession();
                const user = await Auth.currentAuthenticatedUser();
                const AMPLIFY_API = process.env.REACT_APP_AMPLIFY_API_NAME;
                const API_PATH = "/restaurants/";
                setSpinnerLoader(true);

                // Block to Help Debugging
                if (DEBUG_FLAG) {
                    console.log("My session is:", session);
                    console.log("My user is:", user);
                    console.log("The metaInformation is", metaInformation);
                    // To Use IoT, you must attach an IoT Policy to this CognitoIdentityID
                    Auth.currentCredentials().then((info) => {
                        const cognitoIdentityId = info.identityId;
                        console.log("pp read this : ", cognitoIdentityId);
                    });
                    console.log("Your Version of Deployment is: ", process.env.REACT_APP_DEPLOYMENT_VERSION);
                }

                try {
                    const finalAPIRoute = API_PATH + user.username; //TODO: Cases where userSession is empty

                    // Get Essential Restaurant Meta Data using Cognito UserID
                    await API.get(AMPLIFY_API, finalAPIRoute).then((response) => {
                        if (response.item.Item == undefined) {
                            throw new Error("No Response from API");
                        }
                        setMetaInformation(response.item.Item);
                        setUnitOfMass(response.item.Item.unitOfMass);
                        setDisplayIngredient(response.item.Item.displayIngredient);
                        // console.log("The meta that we pull from App.js: ", response.item.Item); // DEBUG Statement
                    });
                    setAuthenticated(true);
                    setSpinnerLoader(false);
                } catch (err) {
                    console.log("Error making API call to get restaurant meta data: ", err);
                }
            } catch (err) {
                setSpinnerLoader(false);
                console.log("User not signed in...");
                console.log(err);
            }
        }
        authSession(); // Calling authSession()
    }, [authenticated]);

    // ======================= End of UseEffect Hooks ===================

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

    const SpinnerLoaderScreen = () => {
        return (
            <div className="spinner-container">
                <div className="spinner-logo">
                    <img src={inverteLogo} alt="Logo" />
                </div>
                <Typography variant="h5" className="spinner-text">
                    Make Every Gram Count
                </Typography>
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
                                brand={(transparentSidenav && !darkMode) || whiteSidenav ? inverteLogoSideBlack : inverteLogoSideWhite}
                                // brandName="InVerte"
                                routes={routes(metaInformation)}
                                onMouseEnter={handleOnMouseEnter}
                                onMouseLeave={handleOnMouseLeave}
                            />
                            <Configurator metaInformation={metaInformation} setUnitOfMass={setUnitOfMass} unitOfMass={unitOfMass} />
                            <ButtonConfig dispatch={dispatch} openConfigurator={openConfigurator} />
                        </>
                    ) : null}
                    {/* {layout === "vr" ? <Configurator /> : null} */}
                    <Routes>
                        {getRoutes(routes(metaInformation, unitOfMass, displayIngredient))}
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                </ThemeProvider>
            )}
        </>
    );
}
