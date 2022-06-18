import { IconButton, Toolbar, Typography } from "@mui/material";
// import logo from "./assets/img/inverte_green_logo.png";
import logo from "../assets/img/inverte_green_logo.png";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";

const drawerWidth = 240;

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
const Typographys = styled(Typography)(
    ({ theme }) => `
    color: ${theme.palette.secondary.main};
    `,
);

function Header({ open, setOpen = console.log }) {
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    return (
        <AppBar open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: "none" }) }}
                >
                    <img src={logo} alt="logo" style={{ maxWidth: "100px" }} />
                </IconButton>
                <Typographys
                    variant="h4"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1 }}
                >
                    INVERTE
                </Typographys>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
