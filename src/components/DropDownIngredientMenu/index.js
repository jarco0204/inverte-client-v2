import { styled, alpha, Tooltip } from "@mui/material";
import { Menu } from "@mui/material";
import MDBox from "../MDBox";
import { useState } from "react";
import { KeyboardArrowDown } from "@material-ui/icons";
import { MenuItem } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { updateRestaurant } from "../../graphql/mutations";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedIndex } from "../../redux/metaSlice";
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

/*!
   @description:
   @params:
   @return:
   @Comments
   @Coders: PP111
*/
const DropDownIngredientMenu = ({ options, titleForPage }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const selectedIndexRef = { current: useSelector((state) => state.meta.displayIngredient).toString() };
    const selectedIndex = useSelector((state) => state.meta.displayIngredient);
    const reduxDispatch = useDispatch();
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const restaurant_id = useSelector((state) => state.meta.restaurant_id);

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
        @description: Update the index number of selected ingredient in dynamo 
        @params: integer
        @return:
        @Comments
        @Coders: Rohan-16
    */
    const updateIngredient = async (index) => {
        try {
            const inputData = { restaurant_id: restaurant_id, displayIngredient: index };
            const response = await API.graphql({
                query: updateRestaurant,
                variables: { input: inputData },
            });
            window.location.reload();
        } catch (err) {
            console.log("Error when updating selected ingredient index in dashboard page...", err);
        }
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
        reduxDispatch(setSelectedIndex(index.toString()));
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
        <>
            <MDBox py={1} display="flex" justifyContent="center">
                <h2 style={{ margin: "0 10px", fontSize: "24px" }}>{titleForPage} </h2>
                <Tooltip title="Select Ingredient" placement="bottom-end">
                    <MDBox
                        variant="gradient"
                        bgColor="dark"
                        color="light"
                        coloredShadow="info"
                        borderRadius="xl"
                        width="7rem"
                        height="3rem"
                        justifyContent="center"
                        alignItems="center"
                        display="flex"
                        id="lock-menu"
                        aria-controls={open ? "lock-menu" : undefined}
                        aria-haspopup="listbox"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
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
                </Tooltip>
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
        </>
    );
};

export default DropDownIngredientMenu;
