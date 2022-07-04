import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

import ScaleMenuOptions from "../components/ScaleMenuOptions";

import InputAdornments from "../components/InputAdornments";

// User imports
import "../assets/css/ScalesContainer.css";

// Aws Imports
import { PubSub } from "aws-amplify";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));
/*
    scaleArr is an array that is passed from ScalesContainer after an API call.
    
        • The first scaleArr[0] is the Publish MQTT topic of the scale
        • The second scaleArr[1] is the type of scale (Flat or Pan)
*/
export default function Scale({ scaleArr }) {
    // console.log("I get my scaleArr", scaleArr);

    // Core Data State of a Scale Card
    const [nameIngredient, setNameIngredient] = useState("Cheese");

    const [correctWeight, setCorrectWeight] = useState(1.5);
    const [minOffset, setMinOffset] = useState(0.1);
    const [maxOffset, setMaxOffset] = useState(0.1);
    const [unitOfMassCode, setUnitOfMassCode] = useState("Oz");

    const [expanded, setExpanded] = useState(false);

    /*
        Material UI function component
    */
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    /*
        Helper function to convert unit of mass
    */
    const convertUnitOfMass = (outputForm) => {
        if (outputForm === "Oz" && unitOfMassCode !== "Oz") {
            setCorrectWeight((correctWeight / 28.35).toFixed(1));
            setMinOffset((minOffset / 28.35).toFixed(1));
            setMaxOffset((maxOffset / 28.35).toFixed(1));
        } else if (outputForm === "G" && unitOfMassCode !== "G") {
            setCorrectWeight((correctWeight * 28.35).toFixed(1));
            setMinOffset((minOffset * 28.35).toFixed(1));
            setMaxOffset((maxOffset * 28.35).toFixed(1));
        }
    };
    /*
        Send updated params to APPROPRIATE scale channel
        whenever a change is detected in the inputs or focus is removed
    */
    const submitCorrectPortionParams = async () => {
        console.log("Sending updated params to scale");

        // TODO: Validate/convert the correct type of the parameters scale accepts
        let msg = {
            msg: "Hello from Client V2",
            nameIngredient: nameIngredient,
            correctWeight: correctWeight,
            lowerErrorLimit: minOffset,
            upperErrorLimit: maxOffset,
            unitOfMass: unitOfMassCode,
        };
        console.log("sending data to ", scaleArr[0]);

        await PubSub.publish(scaleArr[0], msg);
        // await PubSub.publish("johan/1/P0$8", msg);
    };

    return (
        <Card sx={{ maxWidth: 340 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {nameIngredient[0]}
                    </Avatar>
                }
                action={
                    <ScaleMenuOptions
                        setUnitOfMassCode={setUnitOfMassCode}
                        setNameIngredient={setNameIngredient}
                        submitCorrectPortionParams={submitCorrectPortionParams}
                        convertUnitOfMass={convertUnitOfMass}
                    />
                }
                title={nameIngredient}
                subheader={scaleArr[1] + " Scale"}
            />
            <CardContent>
                <div className="centerContent">
                    <InputAdornments
                        label={"Correct Portion Weight"}
                        unitOfMassCode={unitOfMassCode}
                        correctPortionWeight={correctWeight}
                        setCorrectWeight={setCorrectWeight}
                        submitCorrectPortionParams={submitCorrectPortionParams}
                    />
                </div>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="Power On">
                    <PowerSettingsNewIcon />
                </IconButton>

                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <div className="centerContent">
                        <h5>Accepted Portion Range: </h5>
                        <div>
                            <div>
                                <InputAdornments
                                    label={"Under"}
                                    unitOfMassCode={unitOfMassCode}
                                    correctPortionWeight={minOffset}
                                    setCorrectWeight={setMinOffset}
                                    submitCorrectPortionParams={
                                        submitCorrectPortionParams
                                    }
                                />
                            </div>

                            <div>
                                <InputAdornments
                                    label={"Over"}
                                    unitOfMassCode={unitOfMassCode}
                                    correctPortionWeight={maxOffset}
                                    setCorrectWeight={setMaxOffset}
                                    submitCorrectPortionParams={
                                        submitCorrectPortionParams
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Collapse>
        </Card>
    );
}
