import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// AWS Imports
import { Amplify, PubSub } from "aws-amplify";
import { AWSIoTProvider } from "@aws-amplify/pubsub";

//MUI Components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import CardActions from "@mui/material/CardActions";

// Expand Functionality
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// User Components
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import { TareButton, StartButton, ExpandMore } from "./ScaleButtons";

import InputAdornments from "./InputAdornments";
import RadioActions from "./RadioActions";

// MQTT Client to Receive Messages
Amplify.addPluggable(
    new AWSIoTProvider({
        aws_pubsub_region: "ca-central-1",
        aws_pubsub_endpoint: "wss://a33ho10nah991e-ats.iot.ca-central-1.amazonaws.com/mqtt",
    })
);

/*
    Main Function Component
*/
function Scale({ mainScaleData }) {
    /*
        Core Scale State is fetched from IoT Shadow
    */
    console.log("Your channel good sir, ", mainScaleData); // Debug statement
    const [nameIngredient, setNameIngredient] = useState(mainScaleData.state.nameIngredient);
    const [correctWeight, setCorrectWeight] = useState(mainScaleData.state.correctWeight);
    const [minOffset, setMinOffset] = useState(mainScaleData.state.lowerErrorLimit);
    const [maxOffset, setMaxOffset] = useState(mainScaleData.state.upperErrorLimit);
    const [unitOfMassCode, setUnitOfMassCode] = useState(mainScaleData.state.unitOfMass);

    /*
        Logic to handle the possible actions with the 4 buttons (controls available with a scale)
        • (tare)
        • (start)
    */
    const handleSpecialButton = (event) => {
        console.log(event.target.name);
        if (event.target.name === "tare") {
            sendDataAWS(true, 1);
        } else {
            // Other option is Start
            sendDataAWS(true, 2);
        }
    };

    /*
        Function to convert the values to either grams or ounces
    */
    const convertValues2UnitOfMass = () => {
        if (unitOfMassCode === "oz") {
            setCorrectWeight(Math.round(correctWeight * 28.35));
            setMinOffset(Math.round(minOffset * 28.35));
            setMaxOffset(Math.round(maxOffset * 28.35));
        } else {
            setCorrectWeight((correctWeight / 28.35).toFixed(1));
            setMinOffset((minOffset / 28.35).toFixed(1));
            setMaxOffset((maxOffset / 28.35).toFixed(1));
        }
    };

    /*
        Send updated params to APPROPRIATE scale channel
        whenever a change is detected in the inputs or focus is removed

        Function takes parameter to set data to update state or control

        When action = 1, the scale tares. 
        When action = 2, the scale starts. 
        When action = 3, the scale changes unit of mass. 
        When action = 4, the scale changes the mode of operation
    */
    const sendDataAWS = async (control = false, action = null, value = null) => {
        let msg, finalTopic;
        if (control) {
            msg = {
                msg: "Sending Scale action from Client to AWS",
                control: action,
                val: value,
            };
            // console.log(msg);
            if (action == 3) {
                // Unit of mass Change
                convertValues2UnitOfMass();
            }
            finalTopic = mainScaleData.topic + "control";
        } else {
            // TODO: Validate/convert the correct type of the parameters scale accepts
            msg = {
                msg: "Sending portion parameters from Client to AWS",
                nameIngredient: nameIngredient,
                correctWeight: correctWeight,
                lowerErrorLimit: minOffset,
                upperErrorLimit: maxOffset,
            };
            finalTopic = mainScaleData.topic + "params";
            console.log(msg);
        }
        await PubSub.publish(finalTopic, msg);
    };

    const [stateButtonStr, setStateButtonStr] = useState("Offline");
    const [stateCardColor, setStateCardColor] = useState("warning");
    // if (mainScaleData.state.scalePortionState === 0) {
    //     setStateCardColor("warning");
    //     setStateButtonStr("Turn On Scale");
    // } else if (mainScaleData.state.scalePortionState === 1) {
    //     setStateCardColor("info");
    //     setStateButtonStr("Start");
    // } else if (mainScaleData.state.scalePortionState === 2) {
    //     setStateCardColor("success");
    //     setStateButtonStr("Online");
    // } else {
    //     setStateCardColor("warning");
    //     setStateButtonStr("Error");
    // }

    useEffect(() => {
        // Open Web Socket to update data
        PubSub.subscribe("test/1/ts").subscribe({
            next: (dataCloud) => {
                console.log("Message received by el Puma", dataCloud);
                //         // Change Unix Timesetamp to Local Time
                //         let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                //         d.setUTCMilliseconds(dataCloud.value.timestamp);
                //         // console.log(d);
                //         let graphEle = {
                //             inventoryWeight: dataCloud.value.inventoryWeight - dataCloud.value.portionWeight,
                //             timestamp: d,
                //             inventoryName: dataCloud.value.ingredientName,
                //         };
                //         // const updatedDataAr = [...data, graphEle];
                //         // let newKey = dataCloud.readingID;
                //         setData((data) => [...data, graphEle]);
            },
            error: (error) => console.error(error),
            complete: () => console.log("Web Socket Done"),
        });
    }, []);

    /*
        Function to expand scale card when arrow is button is clicked
    */
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card style={{ maxWidth: "300px" }}>
            <MDBox display="flex" justifyContent="space-between" pt={1} px={3}>
                <MDBox variant="gradient" bgColor={stateCardColor} borderRadius="xl" display="flex" justifyContent="center" alignItems="center" width="4rem" height="4rem" mt={-3}>
                    <Icon fontSize="medium">
                        <FastfoodIcon />
                    </Icon>
                </MDBox>

                <MDBox textAlign="center" lineHeight={1.2}>
                    {/* <MDTypography fontWeight="bold" color="dark" marginRight={"40px"} fontSize="18px">
                        Scale #P0-08
                    </MDTypography> */}
                    <InputAdornments
                        style={{ margin: "10px 0", paddingRight: "40px" }}
                        valuePlaceholder={nameIngredient}
                        label={"Ingredient"}
                        setCorrectWeight={setNameIngredient}
                        sendDataAWS={sendDataAWS}
                    />
                </MDBox>
            </MDBox>
            <div style={{ margin: "auto" }}>
                <InputAdornments
                    label={"Correct Portion Weight"}
                    unitOfMassCode={unitOfMassCode}
                    valuePlaceholder={correctWeight.toString()}
                    setCorrectWeight={setCorrectWeight}
                    sendDataAWS={sendDataAWS}
                    width={"15ch"}
                />
            </div>
            <CardActions disableSpacing>
                <TareButton name="tare" onClick={handleSpecialButton}>
                    Tare
                </TareButton>
                <StartButton name="start" onClick={handleSpecialButton}>
                    {stateButtonStr}
                </StartButton>
                <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <div style={{ margin: "10px 10px" }}>
                    <MDBox textAlign="center" lineHeight={1.2}>
                        <MDTypography fontWeight="medium" color="dark" fontSize="15px">
                            Tolerance Levels
                        </MDTypography>
                    </MDBox>

                    <div style={{ display: "flex" }}>
                        <InputAdornments label={"Under"} unitOfMassCode={unitOfMassCode} valuePlaceholder={minOffset.toString()} setCorrectWeight={setMinOffset} sendDataAWS={sendDataAWS} />
                        <InputAdornments label={"Over"} unitOfMassCode={unitOfMassCode} valuePlaceholder={maxOffset.toString()} setCorrectWeight={setMaxOffset} sendDataAWS={sendDataAWS} />
                    </div>

                    <div style={{ margingTop: "10px" }}>
                        <MDBox textAlign="center">
                            <MDTypography fontWeight="medium" color="dark" fontSize="15px">
                                Unit of Mass:
                            </MDTypography>
                        </MDBox>
                    </div>

                    <RadioActions setUnitOfMassCode={setUnitOfMassCode} unitOfMassCode={unitOfMassCode} sendDataAWS={sendDataAWS} />
                </div>
            </Collapse>
        </Card>
    );
}

// Setting default values for the props of Scale and typechecking props for the Scale
Scale.defaultProps = {
    mainScaleData: {
        state: {
            nameIngredient: "Default",
            correctWeight: 28,
            lowerErrorLimit: 3,
            upperErrorLimit: 3,
            unitOfMass: "g",
        },
        topic: "test/1",
    },
};
Scale.propTypes = {
    mainScaleData: PropTypes.object,
};

export default Scale;
