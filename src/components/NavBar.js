import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import ScaleOutlinedIcon from "@mui/icons-material/ScaleOutlined";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { SettingsPowerRounded } from "@material-ui/icons";
import { useState } from "react";



const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0,1),
    ...theme.mixins.toolbar,
}))

function NavBar({
    open,
    setOpen = console.log,
}) {

    const handleDrawerClose = () => {
        setOpen(false)
    }
    return (
        <Drawer 
        // sx={{
        //     width: drawerWidth,
        //     flexShrink: 0,
        //     "& .MuiDrawer-paper": {
        //         width: drawerWidth,
        //         boxSizing: "border-box",
        //     },
        // }}
        variant="permanent" 
        open={open}
        // anchor="left"
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <ListItem key={"Home"} disablePadding>
                    <ListItemButton
                        onClick={'navigate here'}
                    >
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Home"} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={"Scales"} disablePadding>
                        <ListItemButton
                            // onClick={'() => navigate(`${username}/scales`)'}
                        >
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
                        <ListItemButton
                            // onClick={'() => navigate(`${username}/recipes`)'}
                        >
                            <ListItemIcon>
                                <LocalDiningIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Recipes"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"Analytics"} disablePadding>
                        <ListItemButton
                            // onClick={'() => navigate(`${username}/analytics`)'}
                        >
                            <ListItemIcon>
                                <AutoGraphIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Analytics"} />
                        </ListItemButton>
                    </ListItem>
                </List>
        </Drawer>
    )
}

export default NavBar;