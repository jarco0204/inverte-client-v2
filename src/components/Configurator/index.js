import { useState, useEffect } from "react";

// react-github-btn
// import GitHubButton from "react-github-btn";

// @mui material components
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

// @mui icons
import LogoutIcon from "@mui/icons-material/Logout";

import CloseIcon from "@mui/icons-material/Close";

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import { useDispatch, useSelector } from "react-redux";
import { switchMetric } from "../../redux/settingsSlice";
// Custom styles for the Configurator
import ConfiguratorRoot from "./ConfiguratorRoot";

import { Auth, API, PubSub } from "aws-amplify";

// Material Dashboard 2 React context
import { useMaterialUIController, setOpenConfigurator, setTransparentSidenav, setWhiteSidenav, setFixedNavbar, setSidenavColor, setDarkMode } from "../../context";

// Function to handle log out
const handleLogOut = async () => {
    try {
        console.log("PP");
        await Auth.signOut();
        window.location.reload();
    } catch (err) {
        console.log(err);
    }
};
function Configurator({ metaInformation }) {
    const [controller, dispatch] = useMaterialUIController();
    const { openConfigurator, fixedNavbar, sidenavColor, transparentSidenav, whiteSidenav, darkMode } = controller;
    const [disabled, setDisabled] = useState(false);
    const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];
    const restaurantName = metaInformation.restaurantName;
    const restaurantLocationNum = metaInformation.restaurantLocationNum;
    const unitOfMass = useSelector(state => state.settings.metric)
    const reduxDispatch = useDispatch()
    // console.log("The unit of mass is: ", unitOfMass);
    // Use the useEffect hook to change the button state for the sidenav type based on window size.
    useEffect(() => {
        // A function that sets the disabled state of the buttons for the sidenav type.
        function handleDisabled() {
            return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
        }
        
        // The event listener that's calling the handleDisabled function when resizing the window.
        window.addEventListener("resize", handleDisabled);
        
        // Call the handleDisabled function to set the state with the initial value.
        handleDisabled();
        
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleDisabled);
    }, []);
    
    const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
    const handleTransparentSidenav = () => {
        setTransparentSidenav(dispatch, true);
        setWhiteSidenav(dispatch, false);
    };
    const handleWhiteSidenav = () => {
        setWhiteSidenav(dispatch, true);
        setTransparentSidenav(dispatch, false);
    };
    const handleDarkSidenav = () => {
        setWhiteSidenav(dispatch, false);
        setTransparentSidenav(dispatch, false);
    };
    const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);
    const handleDarkMode = () => setDarkMode(dispatch, !darkMode);
    const changeScaleMass = (action) => {
        let msg, finalTopic;
        msg = {
            control: action,
            msg: "Message sent by el PumaV56",
        };
        finalTopic = restaurantName + "/" + restaurantLocationNum + "/control";
        PubSub.publish(finalTopic, msg); // Await it not needed
        console.log("Action Published to Scale...", finalTopic); // Debug Statement
    };
    const updateUnitOfMass = async (event) => {
        const user = await Auth.currentAuthenticatedUser();
        try {
            console.log("The value is:", event.target.value);
            const AMPLIFY_API = process.env.REACT_APP_AMPLIFY_API_NAME;
            const path = "/restaurants/unitOfMass/";
            const finalAPIRoute = path + user.username; //TODO: Cases where userSession is empty

            await API.get(AMPLIFY_API, finalAPIRoute, { queryStringParameters: { unitOfMass: event.target.value } }).then((response) => {
                console.log("The meta that we pull from Unit of mass: ", response); //Debig statement
                if (response.item.Item == undefined) {
                    throw new Error("No Response from API");
                }
            });
        } catch (err) {
            console.log(err);
        }
    };
    // sidenav type buttons styles
    const sidenavTypeButtonsStyles = ({ functions: { pxToRem }, palette: { white, dark, background }, borders: { borderWidth } }) => ({
        height: pxToRem(39),
        background: darkMode ? background.sidenav : white.main,
        color: darkMode ? white.main : dark.main,
        border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,

        "&:hover, &:focus, &:focus:not(:hover)": {
            background: darkMode ? background.sidenav : white.main,
            color: darkMode ? white.main : dark.main,
            border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,
        },
    });
    
    // sidenav type active button styles
    const sidenavTypeActiveButtonStyles = ({ functions: { pxToRem, linearGradient }, palette: { white, gradients, background } }) => ({
        height: pxToRem(39),
        background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
        color: darkMode ? background.sidenav : white.main,

        "&:hover, &:focus, &:focus:not(:hover)": {
            background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
            color: darkMode ? background.sidenav : white.main,
        },
    });
    const switchMetricOnClick = (event) => {
        // console.log(event)
        reduxDispatch(switchMetric(event.target.defaultValue))
    }
    
    
    return (
        <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
            <MDBox display="flex" justifyContent="space-between" alignItems="baseline" pt={4} pb={0.5} px={3}>
                <MDBox>
                    <MDTypography variant="h5">Welcome to InVerte</MDTypography>
                    <MDTypography variant="body2" color="text">
                        Personalize your App.
                    </MDTypography>
                </MDBox>

                <Icon
                    sx={({ typography: { size }, palette: { dark, white } }) => ({
                        fontSize: `${size.lg} !important`,
                        color: darkMode ? white.main : dark.main,
                        stroke: "currentColor",
                        strokeWidth: "2px",
                        cursor: "pointer",
                        transform: "translateY(5px)",
                    })}
                    onClick={handleCloseConfigurator}
                >
                    <CloseIcon />
                </Icon>
            </MDBox>

            <Divider />

            <MDBox pt={0.5} pb={3} px={3}>
                <MDBox>
                    <MDTypography variant="h6">Sidebar Colors:</MDTypography>

                    <MDBox mb={0.5}>
                        {sidenavColors.map((color) => (
                            <IconButton
                                key={color}
                                sx={({ borders: { borderWidth }, palette: { white, dark, background }, transitions }) => ({
                                    width: "24px",
                                    height: "24px",
                                    padding: 0,
                                    border: `${borderWidth[1]} solid ${darkMode ? background.sidenav : white.main}`,
                                    borderColor: () => {
                                        let borderColorValue = sidenavColor === color && dark.main;

                                        if (darkMode && sidenavColor === color) {
                                            borderColorValue = white.main;
                                        }

                                        return borderColorValue;
                                    },
                                    transition: transitions.create("border-color", {
                                        easing: transitions.easing.sharp,
                                        duration: transitions.duration.shorter,
                                    }),
                                    backgroundImage: ({ functions: { linearGradient }, palette: { gradients } }) => linearGradient(gradients[color].main, gradients[color].state),

                                    "&:not(:last-child)": {
                                        mr: 1,
                                    },

                                    "&:hover, &:focus, &:active": {
                                        borderColor: darkMode ? white.main : dark.main,
                                    },
                                })}
                                onClick={() => setSidenavColor(dispatch, color)}
                            />
                        ))}
                    </MDBox>
                </MDBox>

                <MDBox mt={3} lineHeight={1}>
                    <MDTypography variant="h6">Sidebar Type:</MDTypography>
                    <MDTypography variant="button" color="text">
                        Choose between different sidebar types.
                    </MDTypography>

                    <MDBox
                        sx={{
                            display: "flex",
                            mt: 2,
                            mr: 1,
                        }}
                    >
                        <MDButton
                            color="dark"
                            variant="gradient"
                            onClick={handleDarkSidenav}
                            disabled={disabled}
                            fullWidth
                            sx={!transparentSidenav && !whiteSidenav ? sidenavTypeActiveButtonStyles : sidenavTypeButtonsStyles}
                        >
                            Dark
                        </MDButton>
                        <MDBox sx={{ mx: 1, width: "8rem", minWidth: "8rem" }}>
                            <MDButton
                                color="dark"
                                variant="gradient"
                                onClick={handleTransparentSidenav}
                                disabled={disabled}
                                fullWidth
                                sx={transparentSidenav && !whiteSidenav ? sidenavTypeActiveButtonStyles : sidenavTypeButtonsStyles}
                            >
                                Transparent
                            </MDButton>
                        </MDBox>
                        <MDButton
                            color="dark"
                            variant="gradient"
                            onClick={handleWhiteSidenav}
                            disabled={disabled}
                            fullWidth
                            sx={whiteSidenav && !transparentSidenav ? sidenavTypeActiveButtonStyles : sidenavTypeButtonsStyles}
                        >
                            White
                        </MDButton>
                    </MDBox>
                </MDBox>
                {/* <MDBox display="flex" justifyContent="space-between" alignItems="center" mt={3} lineHeight={1}>
                    <MDTypography variant="h6">Navbar Fixed</MDTypography>

                    <Switch checked={fixedNavbar} onChange={handleFixedNavbar} />
                </MDBox> */}
                <Divider />
                <MDBox display="flex" justifyContent="space-between" alignItems="center" lineHeight={1}>
                    <MDTypography variant="h6">Light / Dark (V2)</MDTypography>

                    <Switch disabled checked={darkMode} onChange={handleDarkMode} />
                </MDBox>

                <MDBox mt={3} lineHeight={1}>
                    <MDTypography variant="h6">Unit of Mass:</MDTypography>
                    <MDTypography variant="button" color="text">
                        Choose the unit that fits yourt kitchen best.
                    </MDTypography>
                    <MDBox
                        sx={{
                            display: "flex",
                            mt: 2,
                            mr: 1,
                        }}
                    >
                        <div style={{ display: "flex", gap: "10px", marginLeft: "70px" }}>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="unitOfMassField"
                                    // onChange={(event) => {
                                    //     console.log("Jump", event.target.value);
                                    //     switchMetricOnClick;
                                    //     console.log('Success')
                                    //     updateUnitOfMass(event);
                                    //     changeScaleMass(5);
                                    // }}
                                    onChange={switchMetricOnClick}
                                    defaultValue={unitOfMass}
                                >
                                    <FormControlLabel value="oz" control={<Radio />} label="oz" />
                                    <FormControlLabel value="g" control={<Radio />} label="g" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </MDBox>
                </MDBox>

                <Divider />
                {/* <MDBox mt={3} mb={2}>
                    <MDButton
                        component={Link}
                        href="https://www.creative-tim.com/learning-lab/react/quick-start/material-dashboard/"
                        target="_blank"
                        rel="noreferrer"
                        color={darkMode ? "light" : "dark"}
                        variant="outlined"
                        fullWidth
                    >
                        view documentation
                    </MDButton>
                </MDBox> */}
                <MDBox display="flex" justifyContent="center">
                    {/* <GitHubButton
                        href="https://github.com/creativetimofficial/material-dashboard-react"
                        data-icon="octicon-star"
                        data-size="large"
                        data-show-count="true"
                        aria-label="Star creativetimofficial/material-dashboard-react on GitHub"
                    >
                        Star
                    </GitHubButton> */}
                </MDBox>
                <MDBox mt={2} textAlign="center">
                    <MDBox mb={0.5}>
                        <MDTypography variant="h6">Make Every Gram Count!</MDTypography>
                    </MDBox>

                    <MDBox display="flex" justifyContent="center">
                        <MDBox mr={1.5}>
                            <MDButton onClick={handleLogOut} title="Log Out">
                                <LogoutIcon />
                                &nbsp; Log Out
                            </MDButton>
                        </MDBox>
                    </MDBox>
                </MDBox>
            </MDBox>
        </ConfiguratorRoot>
    );
}

export default Configurator;
