import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";

export const StartButton = styled(Button)(() => ({
    // color: theme.palette.primary.main,
    color: "whitesmoke",
    backgroundColor: "#02182E",
    marginLeft: "20px",
    fontSize: 13,
}));

// Customer would like to tare button directly accesible
export const TareButton = styled(Button)(() => ({
    color: "whitesmoke",
    backgroundColor: "#02182E",
    marginLeft: "20px",
    fontSize: 13,
}));

// Special Expand More Button
export const ExpandMore = styled((props) => {
    // eslint-disable-next-line
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));
