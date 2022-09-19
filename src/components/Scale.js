import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { blue } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";

import ScaleMenuOptions from "../components/ScaleMenuOptions";

import InputAdornments from "../components/InputAdornments";
import EditableCardNameParam from "../components/EditableCardNameParam";

// User imports
import "../assets/css/ScalesContainer.css";

// Aws Imports
import { PubSub } from "aws-amplify";

// CSS Elements
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

    const [correctWeight, setCorrectWeight] = useState(10);
    const [minOffset, setMinOffset] = useState(1);
    const [maxOffset, setMaxOffset] = useState(1);
    const [unitOfMassCode, setUnitOfMassCode] = useState("G");

    const [expanded, setExpanded] = useState(false);

    const [buttonStateStr, setButtonStateStr] = useState("Start");
    const [buttonStateColor, setButtonStateColor] = useState("#02182E");

    const StartButton = styled(Button)(({ theme }) => ({
        color: theme.palette.secondary.main,
        backgroundColor: buttonStateColor,
        marginLeft: "20px",
        fontSize: 13,
    }));

    /*
        Material UI function component
    */
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    /*
        Material UI function component
    */
    const editableNameComponent = (ingredientName, scaleType) => {
        return (
            <EditableCardNameParam
                ingredientName={ingredientName}
                scaleType={scaleType}
                setNameIngredient={setNameIngredient}
                sendDataAWS={sendDataAWS}
            />
        );
    };

    /*
        Special Tare Button Logic
    */
    const handleSpecialButton = () => {
        console.log("hello");
        setButtonStateColor(blue[500]);
        sendDataAWS(true, 3);
        setButtonStateStr("Online");
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

        Function takes parameter to set data to update state or control

        When action = 3, the scale begins. 
        Consequently, we determine the weight of the inventory. 
    */
    const sendDataAWS = async (control = false, action = null) => {
        if (control) {
            let msg = {
                msg: "Sending Scale action from Client to AWS",
                control: action,
            };
            console.log(msg);
            let topic = scaleArr[0] + "/control";
            await PubSub.publish(topic, msg);
        } else {
            // TODO: Validate/convert the correct type of the parameters scale accepts
            let msg = {
                msg: "Sending portion parameters from Client to AWS",
                nameIngredient: nameIngredient,
                correctWeight: correctWeight,
                lowerErrorLimit: minOffset,
                upperErrorLimit: maxOffset,
                unitOfMass: unitOfMassCode,
            };
            let topic = scaleArr[0] + "/params";
            console.log("sending data to ", topic);
            await PubSub.publish(topic, msg);
        }
    };

    return (
        <Card sx={{ maxWidth: 340 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                        {nameIngredient[0]}
                    </Avatar>
                }
                action={
                    <ScaleMenuOptions
                        setUnitOfMassCode={setUnitOfMassCode}
                        setNameIngredient={setNameIngredient}
                        sendDataAWS={sendDataAWS}
                        convertUnitOfMass={convertUnitOfMass}
                    />
                }
                title={editableNameComponent(
                    nameIngredient,
                    scaleArr[1] + " Scale",
                )}
            />
            <CardContent>
                <div className="centerContent">
                    <InputAdornments
                        label={"Correct Portion Weight"}
                        unitOfMassCode={unitOfMassCode}
                        correctPortionWeight={correctWeight}
                        setCorrectWeight={setCorrectWeight}
                        submitCorrectPortionParams={sendDataAWS}
                    />
                </div>
            </CardContent>
            <CardActions disableSpacing>
                <StartButton onClick={handleSpecialButton}>
                    {buttonStateStr}
                </StartButton>

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
                                    submitCorrectPortionParams={sendDataAWS}
                                />
                            </div>

                            <div>
                                <InputAdornments
                                    label={"Over"}
                                    unitOfMassCode={unitOfMassCode}
                                    correctPortionWeight={maxOffset}
                                    setCorrectWeight={setMaxOffset}
                                    submitCorrectPortionParams={sendDataAWS}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Collapse>
        </Card>
    );
}
