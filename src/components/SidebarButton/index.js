import PropTypes from "prop-types";

// Theme Components
import MDBox from "../MDBox";
import Icon from "@mui/material/Icon";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";

// User-defined Components
import { setOpenConfigurator } from "../../context";

// Images
import inverteLogo from "../../assets/img/inverteBlackLogoNoText.png";

/*!
   @description: Function to change the openConfigurator state
   @params:
   @return:
   @Comments
   @Coders: Jarco0204
*/
export default function SidebarButton({ dispatch, openConfigurator }) {
    const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
    return (
        <>
            <MDBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="3.25rem"
                height="3.25rem"
                bgColor="white"
                shadow="sm"
                borderRadius="50%"
                position="fixed"
                left="2rem"
                bottom="2rem"
                zIndex={99}
                color="dark"
                sx={{ cursor: "pointer" }}
                onClick={handleConfiguratorOpen}
            >
                {inverteLogo && <MDBox component="img" src={inverteLogo} alt="Brand" width="5rem" />}

                {/* <Icon fontSize="small" color="inherit"></Icon> */}
                {/* <IconButton sx={navbarIconButton} size="small" disableRipple>
                    <Icon>
                        <AccountCircleIcon />
                        <SettingsIcon />
                    </Icon>
                </IconButton> */}
            </MDBox>
        </>
    );
}

// Typechecking props for the ButtonConfig
SidebarButton.propTypes = {
    dispatch: PropTypes.any,
    openConfigurator: PropTypes.any,
};
