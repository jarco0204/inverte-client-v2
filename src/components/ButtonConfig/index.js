import PropTypes from "prop-types";

// Theme Components
import MDBox from "../MDBox";
import Icon from "@mui/material/Icon";
import SettingsIcon from "@mui/icons-material/Settings";

// User-defined Components
import { setOpenConfigurator } from "../../context";
import { Tooltip } from "@mui/material";

/*!
   @description: Function to change the openConfigurator state
   @params:
   @return:
   @Comments
   @Coders: Jaycos
*/
export default function ButtonConfig({ dispatch, openConfigurator }) {
    const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
    return (
        <>
            <Tooltip title="Personalize Dashboard" placement="bottom">
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
                    right="2rem"
                    bottom="2rem"
                    zIndex={99}
                    color="dark"
                    sx={{ cursor: "pointer" }}
                    onClick={handleConfiguratorOpen}
                >
                    <Icon Icon fontSize="small" color="inherit" style={{ display: "flex", alignItems: "center" }}>
                        <SettingsIcon />
                    </Icon>
                </MDBox>
            </Tooltip>
        </>
    );
}

// Typechecking props for the ButtonConfig
ButtonConfig.propTypes = {
    dispatch: PropTypes.any,
    openConfigurator: PropTypes.any,
};
