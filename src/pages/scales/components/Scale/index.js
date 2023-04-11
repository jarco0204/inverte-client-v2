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
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// User Components
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import { TareButton, StartButton, ExpandMore } from "./ScaleButtons";

/*
    Main Function Component
*/
function Scale({ mainScaleData }) {
    //  Core Scale State is fetched from IoT Shadow
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
        Function to expand scale card when arrow is button is clicked
    */
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    /*
        Function to handle the change of unit of mass
    */
    const unitOfMassChange = (event) => {
        // Unit of mass Change
        if (unitOfMassCode === "g") {
            setCorrectWeight((correctWeight / 28.35).toFixed(1));
            setMinOffset((minOffset / 28.35).toFixed(1));
            setMaxOffset((maxOffset / 28.35).toFixed(1));

            setUnitOfMassCode("oz");
        } else {
            setCorrectWeight(Math.round(correctWeight * 28.35));
            setMinOffset(Math.round(minOffset * 28.35));
            setMaxOffset(Math.round(maxOffset * 28.35));
            setUnitOfMassCode("g");
        }

        updateShadow(event);
    };

    /*
        Function to update the IoT Device Shadow by using PubSub Amplify MQTT Client
    */
    const updateShadow = async (event) => {
        const getThingShadowRequestInput = { state: { desired: {} } };

        // Determine which property of shadow to update
        if (event.target.name === "ingredientNameField") {
            getThingShadowRequestInput.state.desired["nameIngredient"] = nameIngredient;
        } else if (event.target.name === "correctWeightField") {
            getThingShadowRequestInput.state.desired["correctWeight"] = correctWeight;
        } else if (event.target.name === "minOffsetField") {
            getThingShadowRequestInput.state.desired["lowerErrorLimit"] = minOffset;
        } else if (event.target.name === "maxOffsetField") {
            getThingShadowRequestInput.state.desired["upperErrorLimit"] = maxOffset;
        } else if (event.target.name === "unitOfMassField") {
            getThingShadowRequestInput.state.desired["unitOfMass"] = unitOfMassCode;
        } else {
            console.log("error while trying to change the scale state");
        }

        // Update Shadow
        PubSub.publish("$aws/things/P0-08-v2/shadow/update", getThingShadowRequestInput);
        console.log("Shadow Update..."); // Debug Statement
    };

    /*
        Function to send desired action to scale (Tare or Start Guidance)
        Possible Actions are {1: "tare", 2: "start"}
    */
    const sendDataAWS = async (action) => {
        let msg, finalTopic;
        msg = {
            control: action,
            msg: "Message sent by el PumaV56",
        };
        finalTopic = mainScaleData.topic[0] + "control";

        // Perform action on scale
        PubSub.publish(finalTopic, msg); // Await it not needed
        console.log("Action Published to Scale..."); // Debug Statement
    };

    /*
        Hook to enable real-time communication from scale to client to display IoT Shadows
    */
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

    return (
        <Card style={{ maxWidth: "300px" }}>
            <MDBox display="flex" justifyContent="space-between" pt={1} px={1}>
                <MDBox variant="gradient" bgColor={stateCardColor} borderRadius="xl" display="flex" justifyContent="center" alignItems="center" width="4.5rem" height="3.5rem" mt={-4}>
                    <Icon fontSize="medium">
                        <FastfoodIcon />
                    </Icon>
                </MDBox>

                <MDBox display="flex" style={{ margin: "auto", paddingRight: "40px", paddingTop: "10px" }}>
                    {/* <MDTypography fontWeight="bold" color="dark" marginRight={"40px"} fontSize="18px">
                        Scale #P0-08
                    </MDTypography> */}
                    <FormControl sx={{ m: 1, width: 145 }} variant="outlined">
                        <FormHelperText style={{ margin: "auto" }} id="outlined-weight-helper-text">
                            Ingredient Name
                        </FormHelperText>
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            name="ingredientNameField"
                            style={{
                                backgroundColor: "beige",
                                textAlign: "center",
                                margin: "5px 0",
                            }}
                            value={nameIngredient}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                "aria-label": "weight",
                            }}
                            onChange={(e) => setNameIngredient(e.target.value)}
                            onBlur={(e) => updateShadow(e)}
                        />
                    </FormControl>
                </MDBox>
            </MDBox>
            <FormControl sx={{ m: 1, width: "22ch", display: "flex", flexDirection: "row", gap: "10px" }} variant="outlined">
                <div>
                    <OutlinedInput
                        id="outlined-adornment-weight"
                        endAdornment={<InputAdornment position="end">{unitOfMassCode}</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            "aria-label": "weight",
                            readOnly: true,
                        }}
                    />
                    <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
                </div>
                <div>
                    <OutlinedInput
                        id="outlined-adornment-weight"
                        endAdornment={<InputAdornment position="end">℃</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            "aria-label": "weight",
                            readOnly: true,
                        }}
                    />
                    <FormHelperText id="outlined-weight-helper-text">Temperature</FormHelperText>
                </div>
            </FormControl>

            <CardActions disableSpacing>
                <TareButton name="tare" onClick={() => sendDataAWS(1)}>
                    Tare
                </TareButton>
                <StartButton name="start" onClick={() => sendDataAWS(2)}>
                    {stateButtonStr}
                </StartButton>
                <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <MDBox textAlign="center" style={{ margin: "10px 0" }}>
                    <MDTypography fontWeight="medium" color="dark" fontSize="15px">
                        Portion Control:
                    </MDTypography>
                </MDBox>
                <MDBox textAlign="center" lineHeight={1.2}>
                    <FormControl sx={{ m: 1, width: 155 }} variant="outlined">
                        <FormHelperText style={{ margin: "auto" }} id="outlined-weight-helper-text">
                            Correct Portion Weight
                        </FormHelperText>
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            name="correctWeightField"
                            style={{
                                backgroundColor: "beige",
                            }}
                            value={correctWeight}
                            endAdornment={<InputAdornment position="end">{unitOfMassCode}</InputAdornment>}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                "aria-label": "weight",
                            }}
                            onChange={(e) => setCorrectWeight(e.target.value)}
                            onBlur={(e) => updateShadow(e)}
                        />
                    </FormControl>
                </MDBox>
                <div style={{ margin: "0 10px" }}>
                    <div style={{ display: "flex" }}>
                        <FormControl sx={{ m: 1, width: 125 }} variant="outlined">
                            <FormHelperText id="outlined-weight-helper-text">Lower Threshold </FormHelperText>
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                name="minOffsetField"
                                style={{
                                    backgroundColor: "beige",
                                }}
                                value={minOffset}
                                endAdornment={<InputAdornment position="end">{unitOfMassCode}</InputAdornment>}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    "aria-label": "weight",
                                }}
                                onChange={(e) => setMinOffset(e.target.value)}
                                onBlur={(e) => updateShadow(e)}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 125 }} variant="outlined">
                            <FormHelperText id="outlined-weight-helper-text">Upper Threshold </FormHelperText>
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                name="maxOffsetField"
                                style={{
                                    backgroundColor: "beige",
                                }}
                                value={maxOffset}
                                endAdornment={<InputAdornment position="end">{unitOfMassCode}</InputAdornment>}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    "aria-label": "weight",
                                }}
                                onChange={(e) => setMaxOffset(e.target.value)}
                                onBlur={(e) => updateShadow(e)}
                            />
                        </FormControl>
                    </div>

                    <MDBox textAlign="center" style={{ margin: "10px 0" }}>
                        <MDTypography fontWeight="medium" color="dark" fontSize="15px">
                            Unit of Mass:
                        </MDTypography>
                    </MDBox>
                    <div style={{ display: "flex", gap: "10px", marginLeft: "70px" }}>
                        <FormControl>
                            <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" name="unitOfMassField" onChange={unitOfMassChange} defaultValue={unitOfMassCode}>
                                <FormControlLabel value="oz" control={<Radio />} label="oz" />
                                <FormControlLabel value="g" control={<Radio />} label="g" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
            </Collapse>
        </Card>
    );
}

// Setting default values for the props of Scale and typechecking props for the Scale
Scale.propTypes = {
    mainScaleData: PropTypes.object,
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
