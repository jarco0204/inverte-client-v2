// React Imports
import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // prop-types is a library for typechecking of props.

// AWS Imports
import { PubSub, Auth, API } from "aws-amplify";

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
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";

// User Components
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import { TareButton, StartButton, ExpandMore } from "./ScaleButtons";
import { updateRestaurant } from "../../../../graphql/mutations";
import { getRestaurant } from "../../../../graphql/queries";
import { Radio } from "antd";

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

const Scale = ({ mainScaleData }) => {
    // Classic Shadow Parameters
    const [textBoxValue, setTextBoxValue] = useState(0);
    const [nameIngredient, setNameIngredient] = useState("");
    const [correctWeight1, setCorrectWeight1] = useState(24);
    const [correctWeight2, setCorrectWeight2] = useState(30);
    const [correctWeight3, setCorrectWeight3] = useState(35);
    const [minOffset, setMinOffset] = useState(3);
    const [maxOffset, setMaxOffset] = useState(3);
    const [unitOfMass, setUnitOfMass] = useState("g"); // Unit of mass for the scale
    // const [value, setValue] = useState(correctWeight3);
    const [weightIndex, setWeightIndex] = useState(0);
    // Timeseries Shadow Parameters
    const [realTimeWeight, setRealTimeWeight] = useState(0);
    const [realTimeTemperature, setRealTimeTemperature] = useState("Off");
    // const [scaleStateReported, setScaleStateReported] = useState(0); // 0 = off & 1 = Unloaded & 2 = Busy/On
    const scaleStateReported = 1;

    // UI & UX
    const [expanded, setExpanded] = useState(false);

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
    const updateClassicShadow = async (event) => {
        // Creae Variables
        const updateThingShadowRequestInput = { state: { desired: {} } };
        let shadowTopic = "$aws/things/" + mainScaleData.iotNameThing + "/shadow/update";

        // Determine which property of shadow to update
        if (event.target.name === "ingredientNameField") {
            updateThingShadowRequestInput.state.desired["nameIngredient"] = nameIngredient;
            updateIngredientName(); // Update the ingredient name in the database
        } else if (event.target.name === "minOffsetField") {
            updateThingShadowRequestInput.state.desired["lowerErrorLimit"] = minOffset;
        } else if (event.target.name === "maxOffsetField") {
            updateThingShadowRequestInput.state.desired["upperErrorLimit"] = maxOffset;
        } else if (event.target.data_name != undefined) {
            if (event.target.data_name === "correctWeight1") {
                setWeightIndex(0); // NOTE Coding Convention, from smallest to biggest if there is no logical ordering
                updateThingShadowRequestInput.state.desired["correctWeightIndex"] = 0; // NOTE: MUST Be Careful with Types (Unit Test)
            } else if (event.target.data_name === "correctWeight2") {
                setWeightIndex(1);
                updateThingShadowRequestInput.state.desired["correctWeightIndex"] = 1;
            } else {
                updateThingShadowRequestInput.state.desired["correctWeightIndex"] = 2;
                setWeightIndex(2); // TODO: Follow Coding Convenction
            }
        }

        // Update Shadow
        console.log("Your shadow topic is...", shadowTopic); // Debug Statement
        PubSub.publish(shadowTopic, updateThingShadowRequestInput);
        console.log("Classic Shadow Update...", updateThingShadowRequestInput); // Debug Statement
    };
    /*!
        @description: Function to update the IoT Device Timeseries Shadow by using PubSub Amplify MQTT Client
        @params:
        @return:
        @Comments
        @Coders: MHyke
    */
    const updateTimeseriesShadow = async (event) => {
        const updateThingShadowRequestInput = { state: { desired: {} } };
        if (event.target.name === "correctWeightField") {
            if (weightIndex == 0) {
                updateThingShadowRequestInput.state.desired["correctWeight1"] = parseInt(textBoxValue);
            } else if (weightIndex == 1) {
                updateThingShadowRequestInput.state.desired["correctWeight2"] = parseInt(textBoxValue);
            } else if (weightIndex == 2) {
                updateThingShadowRequestInput.state.desired["correctWeight3"] = parseInt(textBoxValue);
            }
        }
        // Update Shadow
        let shadowTopic = "$aws/things/" + mainScaleData.iotNameThing + "/shadow/name/timeseries/update";
        PubSub.publish(shadowTopic, updateThingShadowRequestInput);
        console.log("Time Series Shadow Update...", updateThingShadowRequestInput); // Debug Statement
    };

    /*!
        @description:Function to update the ingredient name in the database.
        @params:
        @return:
        @Comments
        @Coders: Rohan-16
    */
    const updateIngredientName = async () => {
        const user = await Auth.currentAuthenticatedUser();
        let iotThingNames;
        try {
            // const AMPLIFY_API = process.env.REACT_APP_AMPLIFY_API_NAME;
            // const path = "/restaurants/updateIngredientName/";
            // const finalAPIRoute = path + user.username; //TODO: Cases where userSession is empty

            // // Make API Call
            // await API.get(AMPLIFY_API, finalAPIRoute, { queryStringParameters: { iotNameThing: mainScaleData.iotNameThing, ingredientName: nameIngredient } }).then((response) => {
            //     console.log("The new IotThingNames is:", response);
            //     iotThingNames = JSON.stringify(response);
            // });
            const response = await API.graphql({
                query: getRestaurant,
                variables: { restaurant_id: user.username },
            });
            console.log("The iotThingNames are", response.data.getRestaurant.iotThingNames);
            let iotThingNames = JSON.parse(response.data.getRestaurant.iotThingNames);
            iotThingNames[mainScaleData.iotNameThing] = nameIngredient;
            iotThingNames = JSON.stringify(iotThingNames);

            const inputData = { restaurant_id: user.username, iotThingNames: iotThingNames };
            const response1 = await API.graphql({
                query: updateRestaurant,
                variables: { input: inputData },
            });
            console.log("The response from the updateRestaurant API is:", response1);
        } catch (err) {
            console.log("Error in updating ingredient name API...", err);
        }
    };

    /*!
        @description: Function to trigger scale action from client
        @params:
        @return:
        @Comments: Possible Actions are {1: "tare", 2: "start"}
        @Coders: JAAM
    */
    const sendActionDataAWS = (action) => {
        let msg, finalTopic;
        // msg = {
        //     control: action,
        //     msg: "Message sent by el PumaV56",
        // };
        // finalTopic = mainScaleData.topic + "/" + mainScaleData.iotNameThing + "/control";
        // PubSub.publish(finalTopic, msg);
        console.log("Action Not Published to AWS...", finalTopic); // Debug Statement
    };

    /*!
        @description: Hook to get Thing's Shadow by publishing to get topic and then listening after request is accepted.
        @params:
        @return:
        @Comments: Triggers GET request in Firmware
        @Coders: BlackiLorenzo
    */
    useEffect(() => {
        // Publish to MQTT Topic
        const getClassicShadow = () => {
            setTimeout(async () => {
                try {
                    await PubSub.publish("$aws/things/" + mainScaleData.iotNameThing + "/shadow/get", {});
                    await PubSub.publish("$aws/things/" + mainScaleData.iotNameThing + "/shadow/name/timeseries/get", {});
                } catch (error) {
                    console.log("Failed to publish to your GET Classic Shadow...", error);
                }
            }, 1000);
        };
        getClassicShadow();

        // Subscribe to Topic after Get Request was accepted
        const subscription = PubSub.subscribe("$aws/things/" + mainScaleData.iotNameThing + "/shadow/get/accepted").subscribe({
            next: (dataCloud) => {
                dataCloud = dataCloud.value.state;

                // Update Scale State Parameters
                setNameIngredient(dataCloud.reported.nameIngredient);
                setMinOffset(dataCloud.reported.lowerErrorLimit);
                setMaxOffset(dataCloud.reported.upperErrorLimit);
                setUnitOfMass(dataCloud.reported.unitOfMass);
                setWeightIndex(dataCloud.reported.correctWeightIndex);
                //Unsubcribe to topic after fething and updating parameters
                if (dataCloud.reported.correctWeightIndex == 0) {
                    // setValue(correctWeight1);
                    setTextBoxValue(correctWeight1);
                } else if (dataCloud.reported.correctWeightIndex == 1) {
                    // setValue(correctWeight2);
                    setTextBoxValue(correctWeight2);
                } else if (dataCloud.reported.correctWeightIndex == 2) {
                    // setValue(correctWeight3);
                    setTextBoxValue(correctWeight3);
                }
                subscription.unsubscribe();
            },
            error: (error) => console.error("Error in GET/Accepted web socket...", error),
            complete: () => console.log("Web Socket Done"),
        });

        // Subscribe to Topic after Get Request was accepted
        const subscriptionTimeSeriesShadow = PubSub.subscribe("$aws/things/" + mainScaleData.iotNameThing + "/shadow/name/timeseries/get/accepted").subscribe({
            next: (dataCloud) => {
                dataCloud = dataCloud.value.state.reported;

                setRealTimeWeight(dataCloud.inventoryWeight);
                if (dataCloud.inventoryWeight === -1) {
                    setRealTimeTemperature("Off");
                } else if (dataCloud.inventoryWeight === 0) {
                    setRealTimeTemperature("Idle");
                } else {
                    setRealTimeTemperature("On");
                    setRealTimeWeight(dataCloud.inventoryWeight);
                }
                setCorrectWeight1(dataCloud.correctWeight1);
                setCorrectWeight2(dataCloud.correctWeight2);
                setCorrectWeight3(dataCloud.correctWeight3);
                //Unsubcribe to topic after fething and updating parameters
                subscriptionTimeSeriesShadow.unsubscribe();
            },
            error: (error) => console.error("Error in GET/Accepted web socket of Timeseries...", error),
            complete: () => console.log("Web Socket Done"),
        });
    }, [realTimeWeight, realTimeTemperature]);

    /*!
        @description: Hook to enable real-time communication from scale to client to display IoT Shadows
        @params:
        @return:
        @Comments
        @Coders: GGG100111001
    */
    useEffect(() => {
        PubSub.subscribe("$aws/things/" + mainScaleData.iotNameThing + "/shadow/name/timeseries/update/accepted").subscribe({
            next: (dataCloud) => {
                dataCloud = dataCloud.value;
                setRealTimeWeight(dataCloud.state.reported.inventoryWeight);
                console.log("The data cloud is", dataCloud);

                if (dataCloud.state.reported.temperature) {
                    setRealTimeTemperature(dataCloud.state.reported.temperature + "℃");
                } else {
                    if (realTimeWeight == -1) {
                        setRealTimeTemperature("Off");
                    } else if (realTimeWeight == 0) {
                        setRealTimeTemperature("Idle");
                    } else {
                        setRealTimeTemperature("On");
                    }
                }
            },
            error: (error) => console.error(error),
            complete: () => console.log("Web Socket Done"),
        });
    }, []);

    /*!
        @description: On change function for radio button to select the portion sizes
        @params:
        @return:
        @Comments
        @Coders:Cyno
    */
    const handleOnRadioButtonChange = (e) => {
        console.log("radio checked", e.target);
        // setValue(e.target.value);
        if (e.target.data_name == "correctWeight1") {
            // setValue(correctWeight1);
            setTextBoxValue(correctWeight1);
            updateClassicShadow(e);
        } else if (e.target.data_name == "correctWeight2") {
            // setValue(correctWeight2);
            setTextBoxValue(correctWeight2);
            updateClassicShadow(e);
        } else if (e.target.data_name == "correctWeight3") {
            // setValue(correctWeight3);
            setTextBoxValue(correctWeight3);
            updateClassicShadow(e);
        }
    };

    /*!
        @description:On change function correctWeight changes
        @params:
        @return:
        @Comments
        @Coders: Rohan-16
    */
    const handleCorrectWeightChange = (e) => {
        console.log("the event is", e);
        if (weightIndex == 0) {
            setTextBoxValue(e.target.value);
        } else if (weightIndex == 1) {
            setTextBoxValue(e.target.value);
        } else if (weightIndex == 2) {
            setTextBoxValue(e.target.value);
        }
    };
    return (
        <Card>
            <MDBox display="flex" justifyContent="space-between" pt={1} px={1}>
                <MDBox variant="gradient" bgColor="light" borderRadius="xl" display="flex" justifyContent="center" width="3.5rem" height="3rem" mt={-4.5}>
                    <Icon fontSize="large">
                        <FastfoodIcon style={{ color: scaleStateReported == 0 ? "grey" : scaleStateReported == 1 ? "#02182E" : "#71990D" }} />
                    </Icon>
                </MDBox>
                <MDBox
                    variant="gradient"
                    bgColor="light"
                    style={{ color: realTimeTemperature == "Off" ? "white" : realTimeTemperature == "Idle" ? "#e81ba8" : "#63e22a", fontSize: "21px", fontFamily: "" }}
                    borderRadius="xl"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="4.5rem"
                    height="3rem"
                    mt={-4.5}
                >
                    {realTimeTemperature == "111000℃" ? "ON" : realTimeTemperature}
                </MDBox>
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
                        value={nameIngredient}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            "aria-label": "weight",
                        }}
                        onChange={(e) => setNameIngredient(e.target.value)}
                        onBlur={(e) => (e.target.value == "" ? console.log("Invalid") : updateClassicShadow(e))}
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
                    value={unitOfMass == "g" ? (realTimeWeight == -1 ? 0 : realTimeWeight) : ((realTimeWeight == -1 ? 0 : realTimeWeight) / 28.35).toFixed(2)}
                    focused={scaleStateReported == 1 ? false : true}
                />
            </FormControl>
            <CustomizedCardActions>
                <TareButton name="tare" onClick={() => sendActionDataAWS(1)}>
                    Tare
                </TareButton>

                <StartButton name="start" onClick={() => sendActionDataAWS(2)}>
                    {scaleStateReported == 2 ? "Guide" : scaleStateReported == 1 ? "Guide" : "Guide"}
                </StartButton>

                <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                    <ExpandMoreIcon />
                </ExpandMore>
            </CustomizedCardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit style={{ width: "100%", boxSizing: "border-box" }}>
                <Divider />
                <MDBox textAlign="center" style={{ margin: "10px 0" }}>
                    <MDTypography fontWeight="medium" color="dark" fontSize="15px">
                        Accuracy Settings: ({unitOfMass == "g" ? "Grams" : "Ounces"})
                    </MDTypography>
                </MDBox>

                <MDBox textAlign="center" lineHeight={1.2}>
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
                            onBlur={(e) => (e.target.value == "" ? console.log("Invalid") : updateTimeseriesShadow(e))}
                        />
                    </FormControl>
                </MDBox>
                <MDBox textAlign="center" lineHeight={1.2}>
                    <FormControl id={"min-limit"} sx={{ m: 1, width: 100 }} variant="outlined">
                        <FormHelperText id="outlined-weight-helper-text">Min Limit </FormHelperText>
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            name="minOffsetField"
                            style={{
                                backgroundColor: "beige",
                            }}
                            classes={{ input: classes.centered }}
                            value={unitOfMass == "g" ? minOffset : (minOffset / 28.35).toFixed(2)}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                "aria-label": "weight",
                            }}
                            onChange={(e) => setMinOffset(e.target.value)}
                            onBlur={(e) => (e.target.value == "" ? console.log("Invalid") : updateClassicShadow(e))}
                        />
                    </FormControl>
                    <FormControl id={"max-limit"} sx={{ m: 1, width: 100 }} variant="outlined">
                        <FormHelperText id="outlined-weight-helper-text">Max Limit </FormHelperText>
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            name="maxOffsetField"
                            style={{
                                backgroundColor: "beige",
                            }}
                            classes={{ input: classes.centered }}
                            value={unitOfMass == "g" ? maxOffset : (maxOffset / 28.35).toFixed(2)}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                "aria-label": "weight",
                            }}
                            onChange={(e) => setMaxOffset(e.target.value)}
                            onBlur={(e) => (e.target.value == "" ? console.log("Invalid") : updateClassicShadow(e))}
                        />
                    </FormControl>
                </MDBox>
                <MDBox textAlign="center" lineHeight={1.3}>
                    <FormHelperText style={{ margin: "auto", textAlign: "center" }} id="portion-sizes-helper-text">
                        Portion Sizes
                    </FormHelperText>
                    <Radio.Group onChange={handleOnRadioButtonChange}>
                        <Radio value="0" data_name={"correctWeight1"}>
                            {correctWeight1}
                        </Radio>
                        <Radio value="1" data_name="correctWeight2">
                            {correctWeight2}
                        </Radio>
                        <Radio value="2" data_name="correctWeight3">
                            {correctWeight3}
                        </Radio>
                    </Radio.Group>
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
