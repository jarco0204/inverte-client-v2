import { styled, alpha } from "@mui/material";
import { Menu } from "@mui/material";
// import Button from "@mui/material/Button";
import MDBox from "../../../../components/MDBox";
// import MDTypography from "../../../../components/MDTypography";
import { useState } from "react";
import { KeyboardArrowDown } from "@material-ui/icons";
import { MenuItem } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        color="info"
        display="inline-block"
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: theme.palette.info.main,
        "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.info.main,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: alpha(theme.palette.info.main, theme.palette.info.main),
            },
        },
    },
}));

const DropDownMenus = ({ options, selectedIndexRef, selectedIndex, setSelectedIndex, updateIngredient }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    /*!
       @description: 
       @params:
       @return:
       @Comments
       @Coders: Rohan-16
    */
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    /*!
       @description: 
       @params:
       @return:
       @Comments
       @Coders: Rohan-16
    */
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        selectedIndexRef.current = index;
        setAnchorEl(null);
        updateIngredient(index);
    };

    /*!
       @description: 
       @params:
       @return:
       @Comments
       @Coders: Rohan-16
    */
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <MDBox py={1} display="flex" justifyContent="space-between">
            <h4 style={{ justifyContent: "center", textAlign: "center" }}>Daily Inventory Report: </h4>
            <MDBox
                variant="gradient"
                bgColor="dark"
                color="light"
                coloredShadow="info"
                borderRadius="xl"
                width="22%"
                maxWidth="100px"
                height="3rem"
                justifyContent="center"
                alignItems="center"
                display="flex"
                id="lock-menu"
                aria-controls={open ? "lock-menu" : undefined}
                aria-haspopup="listbox"
                aria-expanded={open ? "true" : undefined}
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDown />}
                style={{ fontFamily: "Roboto", color: "white" }}
            >
                <List component="nav" aria-label="Device settings" style={{ fontFamily: "Roboto", color: "white" }}>
                    <ListItem
                        id="lock-button"
                        aria-haspopup="listbox"
                        aria-controls="lock-menu"
                        aria-label="when device is locked"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClickListItem}
                        style={{ fontFamily: "Roboto", color: "white" }}
                    >
                        <ListItemText secondaryTypographyProps={{ style: { color: "white" } }} secondary={selectedIndex === -1 ? "Ingredient" : options[selectedIndex]} />
                    </ListItem>
                </List>
                <KeyboardArrowDown />
            </MDBox>
            <StyledMenu
                id="lock-menu"
                MenuListProps={{
                    "aria-labelledby": "lock-menu",
                    role: "listbox",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {options.map((option, index) => (
                    <MenuItem key={option} selected={index === selectedIndexRef.curent} onClick={(event) => handleMenuItemClick(event, index)} disableRipple>
                        {option}
                    </MenuItem>
                ))}
            </StyledMenu>
        </MDBox>
    );
};

export default DropDownMenus;
