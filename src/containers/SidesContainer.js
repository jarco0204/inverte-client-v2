import { Box, CssBaseline } from "@mui/material";
import { useState } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

function SidesContainer ({
    authorized,
}) {
    const [open, setOpen] = useState(false)
    return (
        <>
        <Box sx={{ display:"flex" }}>
            <CssBaseline />
            <Header open={open} setOpen={setOpen}/>
            {authorized && (<NavBar open={open} setOpen={setOpen}/>)}
        </Box>
        </>
    )
}

export default SidesContainer;