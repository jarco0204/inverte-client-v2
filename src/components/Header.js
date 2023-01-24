import logo from "../assets/img/inverte_green_logo.png";
import AppBar from "@mui/material/AppBar";
import { IconButton, Toolbar, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../redux/authSelector";
import { ExitToApp } from "@material-ui/icons";

const Header = () => {
    const authorized = useSelector(isAuthenticated);
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    >
                        <img
                            src={logo}
                            alt="logo"
                            style={{ maxWidth: "100px" }}
                        />
                        <Typography
                            variant="h4"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            INVERTE
                        </Typography>
                    </IconButton>

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    >
                        <img
                            src={logo}
                            alt="logo"
                            style={{ maxWidth: "100px" }}
                        />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: "flex", md: "none" },
                                flexGrow: 2,
                                fontWeight: 900,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            INVERTE
                        </Typography>
                        {authorized && <ExitToApp />}
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;
