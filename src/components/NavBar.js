import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import ElectricBoltTwoToneIcon from "@mui/icons-material/ElectricBoltTwoTone";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

import FoodBankIcon from "@mui/icons-material/FoodBank";
import ScaleIcon from "@mui/icons-material/Scale";
import InsightsIcon from "@mui/icons-material/Insights";

import logo from "../assets/img/inverte_green_logo.png";

const drawerWidth = 240;

export default function NavBar({ children }) {
    const navigate = useNavigate(); // To move to other routes

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleClick = (e) => {
        let address = e.target.textContent.toLowerCase();
        navigate("/" + address);
    };
    // console.log(username);

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem key={"scales"} disablePadding>
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <ScaleIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Scales"} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={"Real-Time"} disablePadding>
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <ElectricBoltTwoToneIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Real-Time"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem key={"analytics"} disablePadding>
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <InsightsIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Analytics"} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={"recipes"} disablePadding>
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <FoodBankIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Recipes"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 0 }}
                    >
                        <img
                            src={logo}
                            alt="logo"
                            style={{ maxWidth: "90px" }}
                        />
                    </IconButton>
                    <Typography
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{
                            mr: 2,

                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        INVERTE
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{
                    width: { sm: drawerWidth },
                    flexShrink: { sm: 0 },
                    height: { sm: 100 },
                }}
                aria-label="Options"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            <Box style={{ margin: "auto", width: "300px" }}>{children}</Box>
        </Box>
    );
}
