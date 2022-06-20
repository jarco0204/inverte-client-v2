import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const options = ["Change Grams", "Change Ounzes", "Rename Ingredient"];

const ITEM_HEIGHT = 48;

export default function ScaleMenuOptions({
    setUnitOfMassCode,
    setNameIngredient,
    submitCorrectPortionParams,
    convertUnitOfMass,
}) {
    //MUI State
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // User State
    const [changeIngredientName, setChangeIngredientName] = useState(false);
    const [newIngredientName, setNewIngredientName] = useState("");

    /*
        Material UI function to show menu or not
     */
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    /*
        Function to handle subsequent function calls after interaction with menu
    */
    const handleClose = (e) => {
        console.log(e.target.textContent);
        if (e.target.textContent === options[1]) {
            setUnitOfMassCode("Oz");
            convertUnitOfMass("Oz");
            submitCorrectPortionParams();
        } else if (e.target.textContent === options[0]) {
            setUnitOfMassCode("G");
            convertUnitOfMass("G");
            submitCorrectPortionParams();
        } else if (e.target.textContent === options[2]) {
            setChangeIngredientName(true);
        }
        setAnchorEl(null);
    };
    /*
        Function to handle subsequent behaviour after ingredient name is changed
    */
    const handleCloseName = (e) => {
        console.log(e);
        if (e.target.textContent === "Change") {
            setNameIngredient(newIngredientName);
            submitCorrectPortionParams(); // This function sends data to AWS
        }
        setChangeIngredientName(false);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "21ch",
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option}
                        selected={option === "Pyxis"}
                        onClick={handleClose}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
            <Dialog open={changeIngredientName} onClose={handleCloseName}>
                <DialogTitle>Change Ingredient Name</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Write the name of the ingredient your smart scale will
                        hold.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Ingredient"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={newIngredientName}
                        onChange={(e) => setNewIngredientName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseName}>Cancel</Button>
                    <Button onClick={handleCloseName}>Change</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
