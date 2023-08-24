// React Imports
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

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
import SpinnerLoader from "./components/SpinnerLoader";
import { handleOnMouseEnter, handleOnMouseLeave } from "./components/Sidenav/SidenavBehaviour";
import DashboardNavbar from "./components/Navbars/DashboardNavbar";
import { getRestaurant } from "./graphql/queries";
// import themeDark from "assets/theme-dark"; // TODO

// Pages Containers
import RouterContainer from "./pages/RouterContainer";
import SignInContainer from "./pages/signin";

// Assets
import inverteLogoSideWhite from "./assets/img/inverteLogo.png";
import inverteLogoSideBlack from "./assets/img/inverteLogoBlack.png";
import SidebarButton from "./components/SidebarButton";

// Amplify Pub/Sub MQTT Client for Scale Container
Amplify.addPluggable(
    new AWSIoTProvider({
        aws_pubsub_region: process.env.REACT_APP_AWS_REGION,
        aws_pubsub_endpoint: "wss://" + process.env.REACT_APP_MQTT_ENDPOINT + ".iot." + process.env.REACT_APP_AWS_REGION + ".amazonaws.com/mqtt",
    })
);
Amplify.configure(awsmobile);

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
    const [metaInformation, setMetaInformation] = useState({ iotThingNames: ["test"], restaurantName: "test", unitOfMass: "g", demo: "False" });
    const [unitOfMass, setUnitOfMass] = useState(metaInformation.unitOfMass);
    const [isMobileDevice, setIsMobileDevice] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileDevice(window.innerWidth < 1200);
        };

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);

        // Initial check on component mount
        handleResize();

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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
                console.log("test");
                const session = await Auth.currentSession();
                const user = await Auth.currentAuthenticatedUser();
                console.log("My user is:", user);
                const AMPLIFY_API = process.env.REACT_APP_AMPLIFY_API_NAME;
                const API_PATH = "/restaurants/";
                setSpinnerLoader(true);

                // Block to Help Debugging
                if (DEBUG_FLAG) {
                    Amplify.Logger.LOG_LEVEL = "DEBUG";
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
                    const response = await API.graphql({
                        query: getRestaurant,
                        variables: { restaurant_id: user.username },
                    });
                    response.data.getRestaurant.iotThingNames = JSON.parse(response.data.getRestaurant.iotThingNames);
                    setMetaInformation(response.data.getRestaurant);
                    setUnitOfMass(response.data.getRestaurant.unitOfMass);
                    console.log("The metaInformation is", metaInformation);

                    //Get Essential Restaurant Meta Data using Cognito UserID
                    // const finalAPIRoute = API_PATH + user.username; //TODO: Cases where userSession is empty
                    // await API.get(AMPLIFY_API, finalAPIRoute).then((response) => {
                    //     if (response.item.Item == undefined) {
                    //         throw new Error("No Response from API");
                    //     }
                    //     console.log("The meta information is:", response.item.Item);
                    //     setMetaInformation(response.item.Item);
                    //     setUnitOfMass(response.item.Item.unitOfMass);
                    // });

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

    /*!
        @description: Function to control the route traversal
        @params:
        @return:
        @Comments
        @Coders: CodeJinja
    */
    const createRoutes = (allRoutes) =>
        allRoutes.map((route) => {
            if (route.collapse) {
                return createRoutes(route.collapse);
            }
            if (route.route) {
                return <Route exact path={route.route} element={route.component} key={route.key} />;
            }
            return null;
        });

    return (
        <>
            {!authenticated ? (
                <>{spinnerLoader ? SpinnerLoader() : <SignInContainer />}</>
            ) : (
                <ThemeProvider theme={darkMode ? null : theme}>
                    <CssBaseline />
                    {layout === "dashboard" ? (
                        <>
                            <Sidenav
                                color={sidenavColor}
                                brand={(transparentSidenav && !darkMode) || whiteSidenav ? inverteLogoSideBlack : inverteLogoSideWhite}
                                brandName={"Test"}
                                routes={RouterContainer(metaInformation)}
                                onMouseEnter={() => handleOnMouseEnter(miniSidenav, onMouseEnter, setMiniSidenav, setOnMouseEnter, dispatch)}
                                onMouseLeave={() => handleOnMouseLeave(onMouseEnter, setOnMouseEnter, setMiniSidenav, dispatch)}
                            />
                            <Configurator metaInformation={metaInformation} setUnitOfMass={setUnitOfMass} unitOfMass={unitOfMass} />
                            <ButtonConfig dispatch={dispatch} openConfigurator={openConfigurator} />
                            {isMobileDevice ? (
                                <>
                                    <DashboardNavbar />
                                    <SidebarButton />
                                </>
                            ) : null}
                        </>
                    ) : null}
                    <Routes>
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                        {createRoutes(RouterContainer(metaInformation))}
                    </Routes>
                </ThemeProvider>
            )}
        </>
    );
}
