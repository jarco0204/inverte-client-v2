import React, { useState } from "react";
// React Router Modules
import { useNavigate } from "react-router-dom";

// Material UI Imports
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import ScaleOutlinedIcon from "@mui/icons-material/ScaleOutlined";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";

// User  Imports
import RouterContainer from "./containers/RouterContainer";
import logo from "./assets/img/inverte_green_logo.png";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

export default function App() {
    const navigate = useNavigate(); // To move to other routes
    const theme = useTheme();
    const [authorized, setAuthorized] = useState(false);

    // Icon  sidebar
    const [open, setOpen] = useState(false);
    const handleDrawerOpen = () => {
        if (authorized) {
            setOpen(true);
        }
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    // User
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                open={open}
                style={{ background: "#02182e" }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: "none" }) }}
                    >
                        <img
                            src={logo}
                            alt="logo"
                            style={{ maxWidth: "100px" }}
                        />
                    </IconButton>

                    <Typography
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        INVERTE
                    </Typography>
                    {authorized && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    My account
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem key={"Home"} disablePadding>
                        <ListItemButton onClick={() => navigate("/home")}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Home"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"Scales"} disablePadding>
                        <ListItemButton onClick={() => navigate("/scales")}>
                            <ListItemIcon>
                                <ScaleOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Scales"} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem key={"Recipes"} disablePadding>
                        <ListItemButton onClick={() => navigate("/recipes")}>
                            <ListItemIcon>
                                <LocalDiningIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Recipes"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"Analytics"} disablePadding>
                        <ListItemButton onClick={() => navigate("/analytics")}>
                            <ListItemIcon>
                                <AutoGraphIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Analytics"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                {/* This is where the main content of the app is displayed */}
                <RouterContainer
                    authorized={authorized}
                    setAuthorized={setAuthorized}
                    navigate={navigate}
                />
            </Main>
        </Box>
    );
}
