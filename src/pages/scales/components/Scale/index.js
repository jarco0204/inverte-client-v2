import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// AWS Imports
import { Amplify, PubSub } from "aws-amplify";
import { AWSIoTProvider } from "@aws-amplify/pubsub";

// MUI Components
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import CardActions from "@mui/material/CardActions";
import { Button } from "@mui/material";

// Expand Functionality
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// User Components
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";

import InputAdornments from "./InputAdornments";
import RadioActions from "./RadioActions";

// MQTT Client to Receive Messages
Amplify.addPluggable(
    new AWSIoTProvider({
        aws_pubsub_region: "ca-central-1",
        aws_pubsub_endpoint: "wss://a33ho10nah991e-ats.iot.ca-central-1.amazonaws.com/mqtt",
    })
);

// Setting default values for the props of Scale
Scale.defaultProps = {
    mainPublishTopic: {},
};

// Typechecking props for the Scale
Scale.propTypes = {
    mainScaleData: PropTypes.object,
};

/*
    scaleArr is an array that is passed from ScalesContainer after an API call.
    
        • The first scaleArr[0] is the Publish MQTT topic of the scale
        • The second scaleArr[1] is the type of scale (Flat or Pan)
*/
export default function Scale({ mainScaleData }) {
    console.log("Your channel good sir, ", mainScaleData);

    // Core Data State of a Scale Card
    const [nameIngredient, setNameIngredient] = useState(mainScaleData.state.nameIngredient);

    const [correctWeight, setCorrectWeight] = useState(mainScaleData.state.correctWeight);
    const [minOffset, setMinOffset] = useState(mainScaleData.state.lowerErrorLimit);
    const [maxOffset, setMaxOffset] = useState(mainScaleData.state.upperErrorLimit);

    const [unitOfMassCode, setUnitOfMassCode] = useState("oz"); // Options are oz/g

    const [expanded, setExpanded] = useState(false);

    // const [buttonStateStr, setButtonStateStr] = useState("Start");
    // const [buttonStateColor, setButtonStateColor] = useState("#02182E");

    const StartButton = styled(Button)(() => ({
        // color: theme.palette.primary.main,
        color: "whitesmoke",
        backgroundColor: "#02182E",
        marginLeft: "20px",
        fontSize: 13,
    }));

    // Customer would like to tare button directly accesible
    const TareButton = styled(Button)(() => ({
        color: "whitesmoke",
        backgroundColor: "#02182E",
        marginLeft: "20px",
        fontSize: 13,
    }));

    // Special Expand More Button
    const ExpandMore = styled((props) => {
        // eslint-disable-next-line
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    // Behaviour for expand more button
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
            setCorrectWeight(correctWeight * 28.35);
            setMinOffset(minOffset * 28.35);
            setMaxOffset(maxOffset * 28.35);
        } else {
            setCorrectWeight(correctWeight / 28.35);
            setMinOffset(minOffset / 28.35);
            setMaxOffset(maxOffset / 28.35);
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

    // Note that Subscribe param needs to be dynamic; this information is already called
    // from API in ScaleContainer => copy it or move it to parent component
    useEffect(() => {
        const subscribe = PubSub.subscribe("test/1/ts").subscribe({
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
        // subscribe.unsubscribe();
    }, []);

    return (
        <Card style={{ maxWidth: "300px" }}>
            <MDBox display="flex" justifyContent="space-between" pt={1} px={3}>
                <MDBox
                    variant="gradient"
                    bgColor="light"
                    // color={color === "light" ? "dark" : "white"}
                    // coloredShadow={color}
                    borderRadius="xl"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="4rem"
                    height="4rem"
                    mt={-3}
                >
                    <Icon fontSize="medium" color="inherit">
                        <FastfoodIcon />
                    </Icon>
                </MDBox>

                <MDBox textAlign="center" lineHeight={1.2}>
                    {/* <MDTypography fontWeight="bold" color="dark" marginRight={"40px"} fontSize="18px">
                        Scale #P0-08
                    </MDTypography> */}
                    <InputAdornments
                        style={{ margin: "10px 0", paddingRight: "50px" }}
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
                    Start
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
                                Extra Controls:
                            </MDTypography>
                        </MDBox>
                    </div>

                    <RadioActions setUnitOfMassCode={setUnitOfMassCode} unitOfMassCode={unitOfMassCode} sendDataAWS={sendDataAWS} />
                </div>
            </Collapse>
        </Card>
    );
}
