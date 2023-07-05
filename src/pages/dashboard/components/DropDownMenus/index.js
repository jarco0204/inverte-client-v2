import { styled, alpha } from "@mui/material";
import { Menu } from "@mui/material";
import Button from "@mui/material/Button";
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import { useState } from "react";
import { KeyboardArrowDown } from "@material-ui/icons";
import {MenuItem} from "@mui/material";
import { useTheme } from "@mui/material";

const StyledMenu = styled(( props ) => (
    <Menu
    elevation={0}
    color="info"
    display="inline-block"
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}        
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
        theme.palette.info.main,
        '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
            fontSize: 18,
            color: theme.palette.info.main,
            marginRight: theme.spacing(1.5),
        },
        '&:active': {
            backgroundColor: alpha(
                theme.palette.info.main,
                theme.palette.info.main,
            ),
        },
        },
    },
    }));

function DropDownMenus({
    options,
    selectedIndexRef,
}) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return(
        <MDBox py={1}>
            <MDBox
            variant="gradient"
            bgColor="info"
            color="light"
            coloredShadow="info"
            borderRadius="xl"
            width="10%"
            height="3rem"
            justifyContent="center"
            alignItems="center"
            display="flex"
            id="lock-menu"
            aria-controls={open ? 'lock-menu' : undefined}
            aria-haspopup="listbox"
            aria-expanded={open ? 'true' : undefined}
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDown />}
            style={{fontFamily: "Roboto"}}
            >
                Options
                <KeyboardArrowDown />
            </MDBox>
            <StyledMenu
            id="lock-menu"
            MenuListProps={{
                'aria-labelledby': 'lock-menu',
                role: "listbox",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            >
            {options.map((option, index) => (
                <MenuItem 
                key={option} 
                selected={index === selectedIndexRef.curent} 
                onClick={handleClose} disableRipple>
                {option}
            </MenuItem>
            ))}
            </StyledMenu>
        </MDBox>
    )
}

export default DropDownMenus;