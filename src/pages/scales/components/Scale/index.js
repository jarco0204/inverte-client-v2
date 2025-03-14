// React Imports
import PropTypes from "prop-types"; // prop-types is a library for typechecking of props.
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

// AWS Imports
import { PubSub, Auth, API } from "aws-amplify";

//MUI Components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import CardActions from "@mui/material/CardActions";
import FormControl from "@mui/material/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// User Components
import { Radio } from "antd";
import Grid from "@mui/material/Grid";
import { Tooltip } from "@mui/material";
import MDBox from "../../../../components/MDBox";
import { getRestaurant } from "../../../../graphql/queries";
import MDTypography from "../../../../components/MDTypography";
import { updateRestaurant, updateScale } from "../../../../graphql/mutations";
import { TareButton, StartButton, ExpandMore } from "./ScaleButtons";

// External Libraries
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(timezone);

const Scale = ({ mainScaleData, isMobileDevice }) => {
    // Classic Shadow Parameters
    const [minOffset, setMinOffset] = useState(3);
    const [maxOffset, setMaxOffset] = useState(3);
    const [unitOfMass, setUnitOfMass] = useState(null);
    const [nameIngredient, setNameIngredient] = useState("default");
    const [correctWeightIndex, setCorrectWeightIndex] = useState(-1);

    // Time Series Shadow Parameters
    const [scaleState, setScaleState] = useState(-1);
    const [realTimeWeight, setRealTimeWeight] = useState(0);
    const [correctWeight1, setCorrectWeight1] = useState(7);
    const [correctWeight2, setCorrectWeight2] = useState(28);
    const [correctWeight3, setCorrectWeight3] = useState(56);
    const [realTimeStatusLabel, setRealTimeStatusLabel] = useState("Off");

    // UI & UX
    const scaleStateReported = 1; // 0 = off & 1 = Unloaded & 2 = Busy/On
    const [expanded, setExpanded] = useState(false);
    const [scaleAction1, setScaleAction1] = useState("Start");
    const [scaleAction2, setScaleAction2] = useState("g/oz");

    const accessType = useSelector((state) => state.meta.accessType);
    const timeZone = useSelector((state) => state.meta.timeZone);
    const lastConnected = dayjs
        .unix(mainScaleData.iotNameThing.lastConnected / 1000)
        .tz(timeZone)
        .format("MM-DD HH:mm");

    /*!
       @description:
       @params:
       @return:
       @Comments
       @Coders: StylingSteel
    */
    const useStyles = makeStyles(() => ({
        centered: {
            textAlign: "center",
        },
    }));
    const classes = useStyles();

    /*!
        @description: Center 3 buttons to control your scale card
        @params:
        @return:
        @Comments:
        @Coders: ElToro
    */
    const CustomizedCardActions = styled(CardActions)`
        display: flex;
        justify-content: center;
    `;

    /*!
       @description:
       @params:
       @return:
       @Comments
       @Coders: LAto
    */
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    /*!
        @description: Function to update the IoT Device Shadow by using PubSub Amplify MQTT Client
        @params:
        @return:
        @Comments
        @Coders: JAAM
    */
    const updateClassicShadow = (event) => {
        // Creae Variables
        console.log("The event is:", event);
        console.log("Main scale data is:", mainScaleData);
        const updateThingShadowRequestInput = { state: { desired: {} } };
        let shadowTopic = "$aws/things/" + mainScaleData.iotNameThing.scaleName + "/shadow/update";

        // Update Shadow
        console.log("your topic is...", shadowTopic);
        PubSub.publish(shadowTopic, updateThingShadowRequestInput);
        console.log("Classic Shadow Update...", updateThingShadowRequestInput); // Debug Statement
    };

    /*!
       @description:
       @params:
       @return:
       @Comments
       @Coders: BlackyFliper
    */
    const updatePortionControlShadow = (event) => {
        // Create Variables
        console.log("The event is", event);
        const updateThingShadowRequestInput = { state: { desired: {} } };
        let shadowTopic = "$aws/things/" + mainScaleData.iotNameThing.scaleName + "/shadow/name/portion-control/update";

        if (event == "correctWeight1Field") {
            setCorrectWeightIndex(0); // NOTE Coding Convention, from smallest to biggest if there is no logical ordering
            if (unitOfMass == "g") {
                updateThingShadowRequestInput.state.desired["correctWeight1"] = correctWeight1; // NOTE: MUST Be Careful with Types (Unit Test)
            } else {
                updateThingShadowRequestInput.state.desired["correctWeight1"] = Math.round((correctWeight1 * 28.35 * 10) / 10).toString();
            }
        } else if (event === "correctWeight2Field") {
            setCorrectWeightIndex(1);
            if (unitOfMass == "g") {
                updateThingShadowRequestInput.state.desired["correctWeight2"] = correctWeight2; // NOTE: MUST Be Careful with Types (Unit Test)
            } else {
                updateThingShadowRequestInput.state.desired["correctWeight2"] = Math.round((correctWeight2 * 28.35 * 10) / 10).toString();
            }
        } else if (event === "correctWeight3Field") {
            setCorrectWeightIndex(2);
            if (unitOfMass == "g") {
                updateThingShadowRequestInput.state.desired["correctWeight3"] = correctWeight3; // NOTE: MUST Be Careful with Types (Unit Test)
            } else {
                updateThingShadowRequestInput.state.desired["correctWeight3"] = Math.round((correctWeight3 * 28.35 * 10) / 10).toString();
            }
        } else if (event.target.name === "ingredientNameField") {
            updateIngredientName(mainScaleData.iotNameThing.scaleName, nameIngredient);
            updateThingShadowRequestInput.state.desired["ingredientName"] = nameIngredient;
        } else if (event.target.name === "minOffsetField") {
            if (unitOfMass == "g") {
                updateThingShadowRequestInput.state.desired["lowerErrorLimit"] = minOffset;
            } else {
                updateThingShadowRequestInput.state.desired["lowerErrorLimit"] = Math.round((minOffset * 28.35 * 10) / 10).toString();
            }
        } else if (event.target.name === "maxOffsetField") {
            if (unitOfMass == "g") {
                updateThingShadowRequestInput.state.desired["upperErrorLimit"] = maxOffset;
            } else {
                updateThingShadowRequestInput.state.desired["upperErrorLimit"] = Math.round((maxOffset * 28.35 * 10) / 10).toString();
            }
        }

        // Update Shadow
        console.log("your topic is...", shadowTopic);
        PubSub.publish(shadowTopic, updateThingShadowRequestInput);
        console.log("Updated Correct weight in Time Series Shadow...", updateThingShadowRequestInput); // Debug Statement
    };

    /*!
        @description: Function to update the IoT Device Timeseries Shadow by using PubSub Amplify MQTT Client
        @params:
        @return:
        @Comments
        @Coders: JohanRules
    */
    const updateCorrectWeightIndexClassicShadow = (newIndex) => {
        const updateThingShadowRequestInput = { state: { desired: {} } };
        updateThingShadowRequestInput.state.desired["indexCorrectWeightSelected"] = parseInt(newIndex);

        // Update Shadow
        let shadowTopic = "$aws/things/" + mainScaleData.iotNameThing.scaleName + "/shadow/name/portion-control/update";
        console.log("your topic is...", shadowTopic);
        PubSub.publish(shadowTopic, updateThingShadowRequestInput);
        console.log("Updated correct weight index in Portion Control Shadow...", updateThingShadowRequestInput); // Debug Statement
    };

    /*!
        @description: On change function for radio button to select the portion sizes
        @params:
        @return:
        @Comments
        @Coders: Cyno & JohanWin$
    */
    const handleCorrectWeightIndexChange = (e) => {
        let index = parseInt(e.target.value);
        setCorrectWeightIndex(index);
        updateCorrectWeightIndexClassicShadow(index);
        if (index == 0) {
            updatePortionControlShadow("correctWeight1Field");
        } else if (index == 1) {
            updatePortionControlShadow("correctWeight2Field");
        } else if (index == 2) {
            updatePortionControlShadow("correctWeight3Field");
        }
    };

    /*!
        @description:Function to update the ingredient name in the database.
        @params:
        @return:
        @Comments
        @Coders: Rohan-16
    */
    const updateIngredientName = async (iotNameThing, ingredient) => {
        const user = await Auth.currentAuthenticatedUser();
        try {
            // Perform GQL Query
            const inputData = { scaleName: iotNameThing, ingredient: ingredient };
            const response1 = await API.graphql({
                query: updateScale,
                variables: { input: inputData },
            });
            console.log("The response from the updateRestaurant API is:", response1);
        } catch (err) {
            console.log("Error in updating ingredient name API...", err);
        }
    };
    /*!
   @description:Function that prevents keyboard inputs on the texbox for Lower and upper Error Limit
   @params:
   @return:
   @Comments
   @Coders:Rohan-16
*/
    const handleKeyDown = (event) => {
        // Prevent keyboard inputs on the text box
        event.preventDefault();
    };
    /*!
   @description:Handle changes from CorrectWeight textbox
   @params:
   @return:
   @Comments
   @Coders: Rohan
*/
    const handleCorrectWeightChange = (event, number) => {
        if (number == 1) {
            setCorrectWeight1(event);
        } else if (number == 2) {
            setCorrectWeight2(event);
        } else if (number == 3) {
            setCorrectWeight3(event);
        }
    };

    // Hook to enable real-time communication from scale to client to display IoT Shadows
    useEffect(() => {
        // Subscribe to Topic after Get Request was accepted
        const subscriptionClassicShadow = PubSub.subscribe("$aws/things/" + mainScaleData.iotNameThing.scaleName + "/shadow/get/accepted").subscribe({
            next: (dataCloud) => {
                dataCloud = dataCloud.value.state;
                console.log("The datacloud is:", dataCloud);
                setUnitOfMass(dataCloud.reported.unitOfMass);

                console.log("Successfully handled your GET Classic Shadow...");

                // subscriptionClassicShadow.unsubscribe(); //Unsubcribe to topic after fething and updating parameters
            },
            error: (error) => console.error("Error in Classic Shadow GET Request...", error),
            complete: () => console.log("Web Socket Done"),
        });
        const subscriptionTime_SeriesShadow = PubSub.subscribe("$aws/things/" + mainScaleData.iotNameThing.scaleName + "/shadow/name/time-series/get/accepted").subscribe({
            next: (dataCloud) => {
                dataCloud = dataCloud.value.state.reported;
                console.log("The time-series shadow is", dataCloud);
                if (dataCloud != undefined) {
                    setRealTimeWeight(Math.abs(dataCloud.inventoryWeight));
                    setScaleState(dataCloud.scaleState);
                    if (dataCloud.scaleState === 0) {
                        setRealTimeStatusLabel("Idle");
                    } else if (dataCloud.scaleState === 1) {
                        setRealTimeStatusLabel("On");
                        setScaleAction1("Tare");
                    } else {
                        setRealTimeStatusLabel("Off");
                        //setRealTimeWeight(dataCloud.inventoryWeight);
                    }
                } else {
                    console.log("Scale is of");
                }
                console.log("Successfully handled your GET Time-Series Shadow...");
                // subscriptionTimeSeriesShadow.unsubscribe(); //Unsubcribe to topic after fething and updating parameters
            },
            error: (error) => console.error("Error in GET/Accepted web socket of Timeseries...", error),
            complete: () => console.log("Web Socket Done"),
        });
        const subscriptionPortionControlShadow = PubSub.subscribe("$aws/things/" + mainScaleData.iotNameThing.scaleName + "/shadow/name/portion-control/get/accepted").subscribe({
            next: (dataCloud) => {
                dataCloud = dataCloud.value.state;
                if (dataCloud != undefined) {
                    console.log("The data obtained from pc shadow is", dataCloud.reported);
                    setCorrectWeightIndex(dataCloud.reported.indexCorrectWeightSelected);
                    setNameIngredient(dataCloud.reported.ingredientName);
                    if (unitOfMass === "g") {
                        setCorrectWeight1(dataCloud.reported.correctWeight1);
                        setCorrectWeight2(dataCloud.reported.correctWeight2);
                        setCorrectWeight3(dataCloud.reported.correctWeight3);
                        setMinOffset(dataCloud.reported.lowerErrorLimit);
                        setMaxOffset(dataCloud.reported.upperErrorLimit);
                    } else if (unitOfMass === "oz") {
                        console.log("The unit of mass is:", unitOfMass);
                        setCorrectWeight1(Math.round((dataCloud.reported.correctWeight1 / 28.35) * 10) / 10);
                        setCorrectWeight2(Math.round((dataCloud.reported.correctWeight2 / 28.35) * 10) / 10);
                        setCorrectWeight3(Math.round((dataCloud.reported.correctWeight3 / 28.35) * 10) / 10);
                        setMinOffset(Math.round((dataCloud.reported.lowerErrorLimit / 28.35) * 10) / 10);
                        setMaxOffset(Math.round((dataCloud.reported.upperErrorLimit / 28.35) * 10) / 10);
                    }
                } else {
                    console.log("Scale is offfffffff");
                }
                console.log("Successfully handled your GET Portion-Control Shadow...");
                // subscriptionTimeSeriesShadow.unsubscribe(); //Unsubcribe to topic after fething and updating parameters
            },
            error: (error) => console.error("Error in GET/Accepted web socket of Timeseries...", error),
            complete: () => console.log("Web Socket Done"),
        });

        const subscriptionClassicShadowPortionSize = PubSub.subscribe("$aws/things/" + mainScaleData.iotNameThing.scaleName + "/shadow/name/portion-control/update/accepted").subscribe({
            next: (dataCloud) => {
                dataCloud = dataCloud.value.state;
                // Update Scale State Parameters
                if (dataCloud.desired == undefined && dataCloud.reported.indexCorrectWeightSelected != undefined) {
                    setCorrectWeightIndex(dataCloud.reported.indexCorrectWeightSelected);
                }

                console.log("Successfully handled your UPDATE Portion Control Shadow...");
                // subscriptionClassicShadow.unsubscribe(); //Unsubcribe to topic after fething and updating parameters
            },
            error: (error) => console.error("Error in Classic Shadow GET Request...", error),
            complete: () => console.log("Web Socket Done"),
        });

        //Listen for Updates in Timeseries shadow
        const subscriptionTimeSeriesShadowInventoryWeight = PubSub.subscribe("$aws/things/" + mainScaleData.iotNameThing.scaleName + "/shadow/name/time-series/update/accepted").subscribe({
            next: (dataCloud) => {
                dataCloud = dataCloud.value.state.reported;
                console.log("The datacloud is", dataCloud);
                if (dataCloud.inventoryWeight != undefined) {
                    console.log("The inventory weight is", dataCloud.inventoryWeight);
                    setRealTimeWeight(Math.abs(dataCloud.inventoryWeight));
                } else {
                    console.log("Batch ID updated");
                }

                console.log("Successfully handled your UPDATE Time-Series Shadow...");
            },
            error: (error) => console.error("Error in GET/Accepted web socket of Timeseries...", error),
            complete: () => console.log("Web Socket Done"),
        });
        //getLastConnected();
    }, [correctWeightIndex, unitOfMass, realTimeStatusLabel]);

    // @description: Hook to get Thing's Shadow by publishing to get topic and then listening after request is accepted.
    useEffect(() => {
        // Publish to MQTT Topic
        const getClassicShadow = () => {
            setTimeout(async () => {
                try {
                    await PubSub.publish("$aws/things/" + mainScaleData.iotNameThing.scaleName + "/shadow/get", {});
                    await PubSub.publish("$aws/things/" + mainScaleData.iotNameThing.scaleName + "/shadow/name/time-series/get", {});
                    await PubSub.publish("$aws/things/" + mainScaleData.iotNameThing.scaleName + "/shadow/name/portion-control/get", {});
                    console.log("Successfully queried your shadows...");
                } catch (error) {
                    console.log("Failed to publish to your GET Classic Shadow...", error);
                }
            }, 1000);
        };

        getClassicShadow();
    }, [unitOfMass]);

    /*!
       @description:
       @params:
       @return:
       @Comments
       @Coders: ManuLao
    */
    const handleScaleAction = (event) => {
        let msg, finalTopic;
        if (event.target.value == "Start") {
            msg = {
                scaleAction: "start",
            };
        } else if (event.target.value == "Tare") {
            msg = {
                scaleAction: "tare",
            };
        } else if (event.target.value == "g/oz") {
            msg = {
                scaleAction: "unitOfMass",
            };
        } else {
            console.log("No Action Published to AWS..."); // Debug Statement
            return;
        }

        finalTopic = mainScaleData.topic + "/" + mainScaleData.iotNameThing.scaleName + "/clientActions";
        PubSub.publish(finalTopic, msg);
        console.log("Desired Client Action Published to Scale..."); // Debug Statement
    };

    return (
        <Card>
            <MDBox display="flex" justifyContent="space-between" pt={1} px={1}>
                <MDBox variant="gradient" bgColor="light" borderRadius="xl" display="flex" justifyContent="center" width="3.5rem" height="3rem" mt={-4.5}>
                    <Icon fontSize="large">
                        <FastfoodIcon style={{ color: scaleStateReported == 0 ? "grey" : scaleStateReported == 1 ? "#02182E" : "#71990D" }} />
                    </Icon>
                </MDBox>
                <Grid>
                    <Tooltip title={"Last time the scale connected:" + `${lastConnected}`} placement="top">
                        <MDBox
                            variant="gradient"
                            bgColor="light"
                            style={{ color: realTimeStatusLabel == "Off" ? "white" : realTimeStatusLabel == "Idle" ? "#e81ba8" : "#63e22a", fontSize: "21px", fontFamily: "" }}
                            borderRadius="xl"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            width="4.5rem"
                            height="3rem"
                            mt={-4.5}
                        >
                            {realTimeStatusLabel == "111000℃" ? "ON" : realTimeStatusLabel}
                        </MDBox>
                    </Tooltip>
                </Grid>
            </MDBox>
            <MDBox style={{ margin: "auto", paddingTop: "5px" }}>
                <FormControl id={"ingredient-name"} sx={{ m: 1, width: 145 }} variant="outlined">
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
                        readOnly={accessType === "Restricted"}
                        value={nameIngredient}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            "aria-label": "weight",
                        }}
                        onChange={(e) => setNameIngredient(e.target.value)}
                        onBlur={(e) => (e.target.value == "" ? console.log("Invalid") : updatePortionControlShadow(e))}
                    />
                </FormControl>
            </MDBox>
            <FormControl id={"inventory-weight"} sx={{ m: 1, width: "18ch" }} style={{ margin: "10px auto" }} variant="outlined">
                <FormHelperText style={{ margin: "2px auto" }} id="outlined-weight-helper-text">
                    Real-Time Weight
                </FormHelperText>
                <TextField
                    id="standard-start-adornment"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">{unitOfMass}</InputAdornment>,
                        readOnly: true,
                        classes: { input: classes.centered },
                        style: { fontSize: "18px" },
                    }}
                    variant="standard"
                    value={unitOfMass == "g" ? (realTimeStatusLabel == "Off" ? 0 : realTimeWeight) : ((realTimeStatusLabel == "Off" ? 0 : realTimeWeight) / 28.35).toFixed(2)}
                    focused={scaleStateReported == 1 ? false : true}
                />
            </FormControl>
            <CustomizedCardActions>
                <TareButton name="leftButton" value={scaleAction1} onClick={handleScaleAction}>
                    {scaleAction1}
                </TareButton>

                <StartButton name="rightButton" value={scaleAction2} onClick={handleScaleAction}>
                    {scaleAction2}
                </StartButton>

                <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                    <ExpandMoreIcon />
                </ExpandMore>
            </CustomizedCardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit style={{ width: "100%", boxSizing: "border-box" }}>
                <Divider />
                <MDBox textAlign="center" style={{ margin: "10px 0" }}>
                    <MDTypography fontWeight="medium" color="dark" fontSize="15px">
                        Accuracy Settings: ({unitOfMass == "g" ? "Grams" : "oz"})
                    </MDTypography>
                </MDBox>
                <MDBox textAlign="center" lineHeight={1.3}>
                    <FormHelperText style={{ margin: "auto", textAlign: "center" }} id="portion-sizes-helper-text">
                        Correct Portion Size
                    </FormHelperText>
                    <Radio.Group onChange={handleCorrectWeightIndexChange} value={correctWeightIndex}>
                        <Radio value={0}>
                            <FormControl id={"min-limit"} sx={{ m: 1, width: 75 }} variant="outlined">
                                <FormHelperText id="outlined-weight-helper-text">Size #1 </FormHelperText>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    name="correctWeight1Field"
                                    style={{
                                        backgroundColor: "beige",
                                    }}
                                    readOnly={accessType === "Restricted"}
                                    classes={{ input: classes.centered }}
                                    value={correctWeight1}
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        "aria-label": "weight",
                                        min: 0,
                                        max: 100000,
                                    }}
                                    // onChange={(e) => (unitOfMass == "g" ? setCorrectWeight1(e.target.value) : console.log(e.target.value * (28.35).toFixed(0)))}
                                    onChange={(e) => handleCorrectWeightChange(e.target.value, 1)}
                                    onBlur={(e) => (e.target.value == "" ? console.log("Invalid") : updatePortionControlShadow(e.target.name))}
                                />
                            </FormControl>
                        </Radio>
                        <Radio value={1}>
                            <FormControl id={"min-limit"} sx={{ m: 1, width: 75 }} variant="outlined">
                                <FormHelperText id="outlined-weight-helper-text">Size #2 </FormHelperText>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    name="correctWeight2Field"
                                    style={{
                                        backgroundColor: "beige",
                                    }}
                                    readOnly={accessType === "Restricted"}
                                    classes={{ input: classes.centered }}
                                    value={correctWeight2}
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        "aria-label": "weight",
                                    }}
                                    onChange={(e) => handleCorrectWeightChange(e.target.value, 2)}
                                    onBlur={(e) => (e.target.value == "" ? console.log("Invalid") : updatePortionControlShadow(e.target.name))}
                                />
                            </FormControl>
                        </Radio>
                        <Radio value={2}>
                            <FormControl id={"min-limit"} sx={{ m: 1, width: 75 }} variant="outlined">
                                <FormHelperText id="outlined-weight-helper-text">Size #3 </FormHelperText>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    name="correctWeight3Field"
                                    style={{
                                        backgroundColor: "beige",
                                    }}
                                    readOnly={accessType === "Restricted"}
                                    classes={{ input: classes.centered }}
                                    value={correctWeight3}
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        "aria-label": "weight",
                                    }}
                                    onChange={(e) => handleCorrectWeightChange(e.target.value, 3)}
                                    onBlur={(e) => (e.target.value == "" ? console.log("Invalid") : updatePortionControlShadow(e.target.name))}
                                />
                            </FormControl>
                        </Radio>
                    </Radio.Group>
                </MDBox>
                {/* <MDBox textAlign="center" lineHeight={1.2}>
                    <FormControl id={"correct-weight"} sx={{ m: 1, width: 155 }} variant="outlined">
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
                            value={unitOfMass == "g" ? textBoxValue : (textBoxValue / 28.35).toFixed(2)}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                "aria-label": "weight",
                                type: "number",
                                min: "1",
                                onInput: (event) => {
                                    if (!event.target.validity.valid) {
                                        event.target.value = "";
                                    }
                                },
                            }}
                            onChange={(e) => handleCorrectWeightChange(e)}
                            onBlur={(e) => (e.target.value == "" ? console.log("Invalid") : updatePortionControlShadow(e))}
                        />
                    </FormControl>
                </MDBox> */}
                <MDBox textAlign="center" lineHeight={1.2}>
                    <FormHelperText style={{ margin: "auto", textAlign: "center" }} id="portion-sizes-helper-text">
                        Tolerance Limits
                    </FormHelperText>
                    <FormControl id={"min-limit"} sx={{ m: 1, width: 100 }} variant="outlined">
                        <FormHelperText id="outlined-weight-helper-text">Min Limit </FormHelperText>

                        <TextField
                            id="outlined-adornment-weight"
                            type={accessType != "Restricted" ? "number" : "text"}
                            name="minOffsetField"
                            style={{
                                backgroundColor: "beige",
                            }}
                            readOnly={accessType === "Restricted"}
                            classes={{ input: classes.centered }}
                            value={minOffset}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                "aria-label": "weight",
                                step: unitOfMass == "g" ? 1 : 0.1,
                                style: {
                                    textAlign: "center",
                                },

                                min: unitOfMass == "g" ? 2 : 0.1, // Set the minimum value
                                max: unitOfMass == "g" ? 10 : 0.6,
                            }}
                            //onKeyDown={!isMobileDevice ? handleKeyDown : null} // Prevent keyboard Inputs
                            onChange={(e) => (unitOfMass == "g" ? setMinOffset(e.target.value == 1 ? 2 : e.target.value) : setMinOffset(e.target.value))}
                            onBlur={(e) => (e.target.value == "" ? console.log("Invalid") : updatePortionControlShadow(e))}
                        />
                    </FormControl>
                    <FormControl id={"max-limit"} sx={{ m: 1, width: 100 }} variant="outlined">
                        <FormHelperText id="outlined-weight-helper-text">Max Limit </FormHelperText>
                        <TextField
                            id="outlined-adornment-weight"
                            type={accessType != "Restricted" ? "number" : "text"}
                            name="maxOffsetField"
                            style={{
                                backgroundColor: "beige",
                            }}
                            readOnly={accessType === "Restricted"}
                            classes={{ input: classes.centered }}
                            value={maxOffset}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                step: unitOfMass == "g" ? 1 : 0.1,
                                "aria-label": "weight",
                                style: {
                                    textAlign: "center",
                                },
                                min: unitOfMass == "g" ? 2 : 0.1, // Set the minimum value
                                max: unitOfMass == "g" ? 10 : 0.6,
                            }}
                            //onKeyDown={!isMobileDevice ? handleKeyDown : null} // Prevent keyboard Inputs
                            onChange={(e) => (unitOfMass == "g" ? setMaxOffset(e.target.value == 1 ? 2 : e.target.value) : setMaxOffset(e.target.value))}
                            onBlur={(e) => (e.target.value == "" ? console.log("Invalid") : updatePortionControlShadow(e))}
                        />
                    </FormControl>
                </MDBox>
            </Collapse>
        </Card>
    );
};

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
