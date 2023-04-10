import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// AWS Imports
import { PubSub } from "aws-amplify";

//MUI Components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import CardActions from "@mui/material/CardActions";

// import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

// Expand Functionality
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// User Components
import InputAdornments from "./InputAdornments";
import RadioActions from "./RadioActions";
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import { TareButton, StartButton, ExpandMore } from "./ScaleButtons";

import { IoTDataPlaneClient, UpdateThingShadowCommand } from "@aws-sdk/client-iot-data-plane";

/*
    Main Function Component
*/
function Scale({ mainScaleData, iotShadowClient }) {
    /*
        Core Scale State is fetched from IoT Shadow
    */
    console.log("Your channel good sir, ", mainScaleData); // Debug statement
    const [nameIngredient, setNameIngredient] = useState(mainScaleData.state.nameIngredient);
    const [correctWeight, setCorrectWeight] = useState(mainScaleData.state.correctWeight);
    const [minOffset, setMinOffset] = useState(mainScaleData.state.lowerErrorLimit);
    const [maxOffset, setMaxOffset] = useState(mainScaleData.state.upperErrorLimit);
    const [unitOfMassCode, setUnitOfMassCode] = useState(mainScaleData.state.unitOfMass);

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

    /*
        Shadow Client
    */
    const updateShadow = async (event) => {
        if (event.target.name === "ingredientNameField") {
            const getThingShadowRequestInput = {
                state: {
                    desired: {
                        nameIngredient: nameIngredient,
                    },
                },
            };
            PubSub.publish("$aws/things/P0-08-v2/shadow/update", getThingShadowRequestInput);
            console.log("update shadow");
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
                control: action,
                val: value,
            };

            if (action == 3) {
                // Unit of mass Change
                if (unitOfMassCode === "oz") {
                    setCorrectWeight(Math.round(correctWeight * 28.35));
                    setMinOffset(Math.round(minOffset * 28.35));
                    setMaxOffset(Math.round(maxOffset * 28.35));
                } else {
                    setCorrectWeight((correctWeight / 28.35).toFixed(1));
                    setMinOffset((minOffset / 28.35).toFixed(1));
                    setMaxOffset((maxOffset / 28.35).toFixed(1));
                }
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
        <Card style={{ width: "300px" }}>
            <MDBox display="flex" justifyContent="space-between" pt={1} px={3}>
                <MDBox variant="gradient" bgColor={stateCardColor} borderRadius="xl" display="flex" justifyContent="center" alignItems="center" width="4rem" height="4rem" mt={-3}>
                    <Icon fontSize="medium">
                        <FastfoodIcon />
                    </Icon>
                </MDBox>

                <MDBox textAlign="center" lineHeight={1.2} style={{ margin: "10px 0", paddingRight: "40px" }}>
                    {/* <MDTypography fontWeight="bold" color="dark" marginRight={"40px"} fontSize="18px">
                        Scale #P0-08
                    </MDTypography> */}
                    {/* <InputAdornments
                        style={{ margin: "10px 0", paddingRight: "40px" }}
                        valuePlaceholder={nameIngredient}
                        label={"Ingredient"}
                        setCorrectWeight={setNameIngredient}
                        updateShadow={updateShadow}
                    /> */}
                    {/* <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                        <> */}
                    <FormControl sx={{ m: 1, width: 125 }} variant="outlined">
                        <FormHelperText id="outlined-weight-helper-text">Ingredient</FormHelperText>
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            name="ingredientNameField"
                            style={{
                                backgroundColor: "beige",
                            }}
                            value={nameIngredient}
                            endAdornment={<InputAdornment position="end">{unitOfMassCode}</InputAdornment>}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                "aria-label": "weight",
                            }}
                            onChange={(e) => setNameIngredient(e.target.value)}
                            onBlur={(e) => updateShadow(e)}
                        />
                    </FormControl>
                    {/* </>
                    </Box> */}
                </MDBox>
            </MDBox>
            <div style={{ margin: "auto" }}>
                <InputAdornments
                    label={"Correct Portion Weight"}
                    unitOfMassCode={unitOfMassCode}
                    valuePlaceholder={correctWeight.toString()}
                    setCorrectWeight={setCorrectWeight}
                    updateShadow={updateShadow}
                    width={"15ch"}
                />
            </div>
            <CardActions disableSpacing>
                <TareButton name="tare" onClick={() => sendDataAWS(true, 1)}>
                    Tare
                </TareButton>
                <StartButton name="start" onClick={() => sendDataAWS(true, 2)}>
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
Scale.propTypes = {
    mainScaleData: PropTypes.object,
    iotShadowClient: PropTypes.object,
};
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

export default Scale;
