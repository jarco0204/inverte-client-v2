import { useState } from "react";
// MUI Components
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import CardActions from "@mui/material/CardActions";
import { Button } from "@mui/material";

// User Components
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";

import InputAdornments from "./InputAdornments";
import RadioActions from "./RadioActions";

import Amplify, { PubSub } from "aws-amplify";
import { AWSIoTProvider } from "@aws-amplify/pubsub/lib/Providers";
Amplify.configure({
    Auth: {
        identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
    },
});
Amplify.addPluggable(
    new AWSIoTProvider({
        aws_pubsub_region: process.env.REACT_APP_REGION,
        aws_pubsub_endpoint: `wss://${process.env.REACT_APP_MQTT_ID}.iot.${process.env.REACT_APP_REGION}.amazonaws.com/mqtt`,
    })
);
// Amplify.PubSub.subscribe("real-time-weather").subscribe({
//     next: (data) => console.log("Message received", data),
//     error: (error) => console.error(error),
//     close: () => console.log("Done"),
// });

// Expand Functionality
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Setting default values for the props of Scale
Scale.defaultProps = {
    scaleArr: { test: "erorr" },
};

// Typechecking props for the Scale
Scale.propTypes = {
    scaleArr: PropTypes.array,
};
/*
    scaleArr is an array that is passed from ScalesContainer after an API call.
    
        • The first scaleArr[0] is the Publish MQTT topic of the scale
        • The second scaleArr[1] is the type of scale (Flat or Pan)
*/
export default function Scale({ scaleArr }) {
    console.log(scaleArr);
    // Core Data State of a Scale Card
    const [nameIngredient, setNameIngredient] = useState("Cheese");

    const [correctWeight, setCorrectWeight] = useState(10);
    const [minOffset, setMinOffset] = useState(1);
    const [maxOffset, setMaxOffset] = useState(1);
    const [unitOfMassCode, setUnitOfMassCode] = useState("g"); // Options are oz/g

    const [expanded, setExpanded] = useState(false);

    const [buttonStateStr, setButtonStateStr] = useState("Start");
    const [buttonStateColor, setButtonStateColor] = useState("#02182E");

    const StartButton = styled(Button)(() => ({
        // color: theme.palette.primary.main,
        color: "whitesmoke",
        backgroundColor: buttonStateColor,
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
        Send updated params to APPROPRIATE scale channel
        whenever a change is detected in the inputs or focus is removed

        Function takes parameter to set data to update state or control

        When action = 1, the scale tares. 
        When action = 2, the scale starts. 
        When action = 3, the scale changes unit of mass. 
        When action = 4, the scale changes the mode of operation
    */
    const sendDataAWS = async (control = false, action = null, value = null) => {
        let channel = "johan/1/P0-08";
        if (control) {
            let msg = {
                msg: "Sending Scale action from Client to AWS",
                control: action,
                val: value,
            };
            console.log(msg);
            // let topic = scaleArr[0] + "/control";
            try {
                console.log("1");
                let finalTopic = channel + "/control";
                await PubSub.publish(finalTopic, msg);
                return;
            } catch (err) {
                console.log(err);
            }
        } else {
            // TODO: Validate/convert the correct type of the parameters scale accepts
            let msg = {
                msg: "Sending portion parameters from Client to AWS",
                nameIngredient: nameIngredient,
                correctWeight: correctWeight,
                lowerErrorLimit: minOffset,
                upperErrorLimit: maxOffset,
            };
            console.log(msg);
            try {
                let finalTopic = channel + "/params";
                await PubSub.publish(finalTopic, msg);
                return;
            } catch (err) {
                console.log(err);
            }
        }
    };

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
                    {buttonStateStr}
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
