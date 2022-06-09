import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

//User Imports
import logo from "../assets/img/inverte_green_logo.png";

export default function MenuAppBar(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogo = () => {
        if (props.auth) {
            console.log("Open side Bar");
            props.setOpenSideBar(true);
            // handleDrawerOpen()
        } else {
            // In theory it should send user back to landing page
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ background: "#02182e" }}>
                <Toolbar>
                    <IconButton
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleLogo}
                    >
                        <img
                            src={logo}
                            alt="logo"
                            style={{ maxWidth: "100px" }}
                        />
                    </IconButton>
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        INVERTE
                    </Typography>
                    {props.auth && (
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
        </Box>
    );
}
