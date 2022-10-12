import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import { blue, green } from "@mui/material/colors";
import { Button } from "@mui/material";

import ScaleMenuOptions from "../components/ScaleMenuOptions";

import InputAdornments from "../components/InputAdornments";
import EditableCardNameParam from "../components/EditableCardNameParam";

// User imports
import "../assets/css/ScalesContainer.css";

// Aws Imports
import { PubSub } from "aws-amplify";

// Expand Functionality
// import IconButton from "@mui/material/IconButton";
// import Collapse from "@mui/material/Collapse";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// const ExpandMore = styled((props) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//     transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//     marginLeft: "auto",
//     transition: theme.transitions.create("transform", {
//         duration: theme.transitions.duration.shortest,
//     }),
// }));

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

    // const [expanded, setExpanded] = useState(false);

    const [buttonStateStr, setButtonStateStr] = useState("Start");
    const [buttonStateColor, setButtonStateColor] = useState("#02182E");

    const StartButton = styled(Button)(({ theme }) => ({
        // color: theme.palette.primary.main,
        color: "whitesmoke",
        backgroundColor: buttonStateColor,
        marginLeft: "20px",
        fontSize: 13,
    }));

    // Customer would like to tare button directly accesible
    const TareButton = styled(Button)(({ theme }) => ({
        color: "whitesmoke",
        backgroundColor: "#02182E",
        marginLeft: "20px",
        fontSize: 13,
    }));

    /*
        Material UI function component

        This function allowed the component to be expanded, but as determined by customer 
        feedback, the UI should be even simpler 
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    */
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
        console.log("Special Start/Guide or Stop to fill food pan");
        if (buttonStateStr === "Start") {
            setButtonStateStr("Stop");
            setButtonStateColor("#f58a1f");
            sendDataAWS(true, 3);
        } else {
            setButtonStateColor("#02182E");
            setButtonStateStr("Start");
            sendDataAWS(true, 4);
        }
    };

    /*
        Tare Button Logic
    */
    const handleTareButton = () => {
        console.log("Tare");
        // setButtonStateColor(blue[500]);
        sendDataAWS(true, 0);
    };

    /*
        Helper function to convert unit of mass
    */
    const convertUnitOfMass = () => {
        if (unitOfMassCode === "G") {
            setCorrectWeight((correctWeight / 28.35).toFixed(1));
            setMinOffset((minOffset / 28.35).toFixed(1));
            setMaxOffset((maxOffset / 28.35).toFixed(1));
            setUnitOfMassCode("Oz");
        } else {
            setCorrectWeight((correctWeight * 28.35).toFixed(1));
            setMinOffset((minOffset * 28.35).toFixed(1));
            setMaxOffset((maxOffset * 28.35).toFixed(1));
            setUnitOfMassCode("G");
        }
        // sendDataAWS(); // Data NOTE: It seems this is not executing
        sendDataAWS(true, 2); // Action
    };
    /*
        Send updated params to APPROPRIATE scale channel
        whenever a change is detected in the inputs or focus is removed

        Function takes parameter to set data to update state or control

        When action = 3, the scale begins. 
        When action = 4, the scale stops and takes you to refill screen
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
        <Card sx={{ maxWidth: 310, margin: "auto" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: "#02182E" }} aria-label="recipe">
                        {nameIngredient[0]}
                    </Avatar>
                }
                action={
                    <ScaleMenuOptions
                        setUnitOfMassCode={setUnitOfMassCode}
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
                        width={"28ch"}
                    />
                </div>
            </CardContent>
            <CardContent>
                <div className="centerContent" style={{ marginTop: "-25px" }}>
                    <h5>Accepted Portion Range: </h5>
                    <div style={{ display: "flex", marginTop: "-10px" }}>
                        <InputAdornments
                            label={"Under"}
                            unitOfMassCode={unitOfMassCode}
                            correctPortionWeight={minOffset}
                            setCorrectWeight={setMinOffset}
                            submitCorrectPortionParams={sendDataAWS}
                        />
                        <InputAdornments
                            label={"Over"}
                            unitOfMassCode={unitOfMassCode}
                            correctPortionWeight={maxOffset}
                            setCorrectWeight={setMaxOffset}
                            submitCorrectPortionParams={sendDataAWS}
                        />
                    </div>
                </div>
            </CardContent>
            <CardActions disableSpacing>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "97px",
                    }}
                >
                    <TareButton onClick={handleTareButton}>Tare</TareButton>
                    <StartButton onClick={handleSpecialButton}>
                        {buttonStateStr}
                    </StartButton>
                </div>

                {/* <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore> */}
            </CardActions>
            {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
                // Here is where the Expand portion range menu was found.
                This hasn't been deleted since it might be reusable for some other area
            </Collapse> */}
        </Card>
    );
}
