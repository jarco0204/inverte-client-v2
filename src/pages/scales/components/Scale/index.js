import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // prop-types is a library for typechecking of props.

// AWS Imports
import { PubSub } from "aws-amplify";

// User Components
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import { TareButton, StartButton, ExpandMore } from "./ScaleButtons";

//MUI Components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import CardActions from "@mui/material/CardActions";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

/*
    Main Function Component

    TODO
        
    //  Function to handle the change of unit of mass
    // const unitOfMassChange = (event) => {
    //     // Unit of mass Change
    //     if (unitOfMassCode === "g") {
    //         setCorrectWeight((correctWeight / 28.35).toFixed(1));
    //         setMinOffset((minOffset / 28.35).toFixed(1));
    //         setMaxOffset((maxOffset / 28.35).toFixed(1));

    //         setUnitOfMassCode("oz");
    //     } else {
    //         setCorrectWeight(Math.round(correctWeight * 28.35));
    //         setMinOffset(Math.round(minOffset * 28.35));
    //         setMaxOffset(Math.round(maxOffset * 28.35));
    //         setUnitOfMassCode("g");
    //     }

    //     updateShadow(event);
    // };
*/
function Scale({ mainScaleData }) {
    console.log("Your channel good sir, ", mainScaleData); // Debug statement //NOTE: Changes to Input Fields trigger the re-render

    // Classic Shadow Parameters
    const [nameIngredient, setNameIngredient] = useState("");
    const [correctWeight, setCorrectWeight] = useState(24);
    const [minOffset, setMinOffset] = useState(3);
    const [maxOffset, setMaxOffset] = useState(3);
    // const [unitOfMassCode, setUnitOfMassCode] = useState("g"); // Global variable
    const unitOfMassCode = "g";

    // Timeseries Shadow Parameters
    const [realTimeWeight, setRealTimeWeight] = useState(0);
    const [realTimeTemperature, setRealTimeTemperature] = useState("Off");
    const [scaleStateReported, setScaleStateReported] = useState(0); // 0 = off & 1 = Unloaded & 2 = Busy/On
    // const [stateCardColor, setStateCardColor] = useState("warning");

    /*
        UI and UX state variable and handlers
    */
    const useStyles = makeStyles(() => ({
        centered: {
            textAlign: "center",
        },
    }));
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    /*
        Function to update the IoT Device Shadow by using PubSub Amplify MQTT Client
    */
    const updateShadow = async (event) => {
        const updateThingShadowRequestInput = { state: { desired: {} } };

        // Determine which property of shadow to update
        if (event.target.name === "ingredientNameField") {
            updateThingShadowRequestInput.state.desired["nameIngredient"] = nameIngredient;
        } else if (event.target.name === "correctWeightField") {
            updateThingShadowRequestInput.state.desired["correctWeight"] = correctWeight;
        } else if (event.target.name === "minOffsetField") {
            updateThingShadowRequestInput.state.desired["lowerErrorLimit"] = minOffset;
        } else if (event.target.name === "maxOffsetField") {
            updateThingShadowRequestInput.state.desired["upperErrorLimit"] = maxOffset;
        } else {
            console.log("error while trying to change the scale state");
        }
        // else if (event.target.name === "unitOfMassField") {
        //     updateThingShadowRequestInput.state.desired["unitOfMass"] = unitOfMassCode;
        // }

        // Update Shadow
        let shadowTopic = "$aws/things/" + mainScaleData.iotNameThing + "/shadow/update";
        PubSub.publish(shadowTopic, updateThingShadowRequestInput);
        console.log("Shadow Update...", updateThingShadowRequestInput); // Debug Statement
    };

    /*
        Function to send desired action to scale (Tare or Start Guidance)
        Possible Actions are {1: "tare", 2: "start"}
    */
    const sendDataAWS = (action) => {
        let msg, finalTopic;
        msg = {
            control: action,
            msg: "Message sent by el PumaV56",
        };
        finalTopic = mainScaleData.topic + "/" + mainScaleData.iotNameThing + "/control";
        PubSub.publish(finalTopic, msg); // Await it not needed
        console.log("Action Published to Scale...", finalTopic); // Debug Statement
    };

    /*
        Hook to get Thing's Shadow by publishing to get topic and then listening after request is accepted.
    */
    useEffect(() => {
        /*
            Get Shadow by publishing empty message to GET topic of Classic Shadow
        */
        const getShadow = () => {
            setTimeout(async () => {
                try {
                    await PubSub.publish("$aws/things/" + mainScaleData.iotNameThing + "/shadow/get", {});
                } catch (error) {
                    console.log("Failed to publish to your GET Classic Shadow...", error);
                }
            }, 690);
        };
        getShadow();

        // Get Shadow state
        const subscription = PubSub.subscribe("$aws/things/" + mainScaleData.iotNameThing + "/shadow/get/accepted").subscribe({
            next: (dataCloud) => {
                dataCloud = dataCloud.value.state;
                console.log("Message received by el Puma from shadow get", dataCloud); // Debug Statement

                // Update Scale State Parameters
                setNameIngredient(dataCloud.reported.nameIngredient);
                setCorrectWeight(dataCloud.reported.correctWeight);
                setMinOffset(dataCloud.reported.lowerErrorLimit);
                setMaxOffset(dataCloud.reported.upperErrorLimit);

                //Unsubcribe to topic after fething and updating parameters
                subscription.unsubscribe();
            },
            error: (error) => console.error(error),
            complete: () => console.log("Web Socket Done"),
        });
    }, []);

    /*
        Hook to enable real-time communication from scale to client to display IoT Shadows
    */
    useEffect(() => {
        PubSub.subscribe("$aws/things/" + mainScaleData.iotNameThing + "/shadow/name/timeseries/update/accepted").subscribe({
            next: (dataCloud) => {
                console.log("Message received by el Puma Scale 313", dataCloud);
                dataCloud = dataCloud.value;

                setRealTimeWeight(dataCloud.state.reported.inventoryWeight);
                if (dataCloud.state.reported.temperature) {
                    setRealTimeTemperature(dataCloud.state.reported.temperature + "℃");
                } else {
                    setRealTimeTemperature("On");
                }
                setScaleStateReported(dataCloud.state.reported.scalePortionState);
            },
            error: (error) => console.error(error),
            complete: () => console.log("Web Socket Done"),
        });

        //     const handleDisconnected = useCallback(() => {
        //         console.log("Client" + mainScaleData.iotNameThing + " Disconnected");
        //         setRealTimeWeight(0);
        //         setRealTimeTemperature("Off");
        //         setScaleStateReported(0);
        //     }, []);

        //     const disconnectSubscription = PubSub.subscribe("$aws/events/presence/disconnected/" + mainScaleData.iotNameThing).subscribe({
        //         next: handleDisconnected,
        //         error: (error) => console.error(error),
        //         complete: () => console.log("Web Socket Done"),
        //     });

        // return () => {
        //     updateSubscription.unsubscribe();
        //     disconnectSubscription.unsubscribe();
        // };
    }, []);

    return (
        <Card style={{ maxWidth: "300px", paddingBottom: "10px" }}>
            <MDBox display="flex" justifyContent="space-between" pt={1} px={1}>
                <MDBox variant="gradient" bgColor="light" borderRadius="xl" display="flex" justifyContent="center" width="3.5rem" height="3rem" mt={-4.5}>
                    <Icon fontSize="large">
                        <FastfoodIcon style={{ color: scaleStateReported == 0 ? "grey" : scaleStateReported == 1 ? "#02182E" : "green" }} />
                    </Icon>
                </MDBox>
                <MDBox
                    variant="gradient"
                    bgColor="light"
                    style={{ color: scaleStateReported == 0 ? "red" : scaleStateReported == 1 ? "#02182E" : "green", fontSize: "18px" }}
                    borderRadius="xl"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="3.5rem"
                    height="3rem"
                    mt={-4.5}
                >
                    {realTimeTemperature}
                </MDBox>
            </MDBox>
            <MDBox style={{ margin: "auto", paddingTop: "5px" }}>
                <FormControl sx={{ m: 1, width: 145 }} variant="outlined">
                    <FormHelperText style={{ margin: "auto" }} id="outlined-weight-helper-text">
                        Ingredient Name
                    </FormHelperText>
                    <OutlinedInput
                        id="outlined-adornment-weight"
                        name="ingredientNameField"
                        classes={{ input: classes.centered }}
                        style={{
                            backgroundColor: "beige",
                            textAlign: "center",
                            margin: "2px 0",
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
            <FormControl sx={{ m: 1, width: "18ch" }} style={{ margin: "10px auto" }} variant="outlined">
                <FormHelperText style={{ margin: "2px auto" }} id="outlined-weight-helper-text">
                    Real-Time Weight
                </FormHelperText>
                <TextField
                    id="standard-start-adornment"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">{unitOfMassCode}</InputAdornment>,
                        readOnly: true,
                        classes: { input: classes.centered },
                        style: { fontSize: "18px" },
                    }}
                    variant="standard"
                    value={realTimeWeight}
                    focused={scaleStateReported == 1 ? false : true}
                />
            </FormControl>
            <CardActions disableSpacing>
                <TareButton name="tare" onClick={() => sendDataAWS(1)}>
                    Tare
                </TareButton>
                <StartButton name="start" onClick={() => sendDataAWS(2)}>
                    {scaleStateReported == 2 ? "Stop" : scaleStateReported == 1 ? "Guide" : "Stop"}
                </StartButton>
                <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit style={{ margin: "10px 0" }}>
                <Divider />
                <MDBox textAlign="center" style={{ margin: "10px 0" }}>
                    <MDTypography fontWeight="medium" color="dark" fontSize="15px">
                        Accuracy Settings: ({unitOfMassCode == "g" ? "Grams" : "Ounces"})
                    </MDTypography>
                </MDBox>
                <MDBox textAlign="center" lineHeight={1.2}>
                    <FormControl sx={{ m: 1, width: 155 }} variant="outlined">
                        <FormHelperText style={{ margin: "auto" }} id="outlined-weight-helper-text">
                            Correct Weight
                        </FormHelperText>
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            name="correctWeightField"
                            style={{
                                backgroundColor: "beige",
                            }}
                            classes={{ input: classes.centered }}
                            value={correctWeight}
                            // endAdornment={<InputAdornment position="end">{unitOfMassCode}</InputAdornment>} // Removed after feedback from the team
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
                            <FormHelperText id="outlined-weight-helper-text">Min Limit </FormHelperText>
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                name="minOffsetField"
                                style={{
                                    backgroundColor: "beige",
                                }}
                                classes={{ input: classes.centered }}
                                value={minOffset}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    "aria-label": "weight",
                                }}
                                onChange={(e) => setMinOffset(e.target.value)}
                                onBlur={(e) => updateShadow(e)}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 125 }} variant="outlined">
                            <FormHelperText id="outlined-weight-helper-text">Max Limit </FormHelperText>
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                name="maxOffsetField"
                                style={{
                                    backgroundColor: "beige",
                                }}
                                classes={{ input: classes.centered }}
                                value={maxOffset}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    "aria-label": "weight",
                                }}
                                onChange={(e) => setMaxOffset(e.target.value)}
                                onBlur={(e) => updateShadow(e)}
                            />
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
        iotNameThing: "PP",
    },
};

export default Scale;
