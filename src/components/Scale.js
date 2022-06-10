import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

// User imports
import "../assets/css/scale.css";

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

export default function RecipeReviewCard() {
    const [expanded, setExpanded] = useState(false);

    //V1 State
    const [nameIngredient, setNameIngredient] = useState("Cheese");
    const [weightReading, setWeightReading] = useState(0);
    const [correctPortionWeight, setCorrectPortionWeight] = useState(86);
    const [inputLowerWeight, setInputLowerWeight] = useState(1);
    const [inputUpperWeight, setInputUpperWeight] = useState(1);

    const [unitOfMass, setUnitOfMass] = useState("Ounzes");

    /*
        Material UI function component
    */
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    /*
        Send updated params to scale whenever focus is moved
    */
    const submitCorrectPortionParams = () => {
        console.log("send to scale");
        let msg = {
            msg: "Hello from Client V2",
            nameIngredient: nameIngredient,
            correctWeight: correctPortionWeight,
            lowerErrorLimit: inputLowerWeight,
            upperErrorLimit: inputUpperWeight,
            unitOfMass: unitOfMass,
        };
        console.log(msg);
    };

    return (
        <Card sx={{ maxWidth: 340 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        C
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={nameIngredient}
                subheader="Chicken Parmigiana"
            />

            <CardContent>
                <input
                    style={{
                        textAlign: "center",
                        padding: "10px",
                        border: "2px solid #d3d3d3",
                        backgroundColor: "beige",
                    }}
                    type="text"
                    value={weightReading + " " + unitOfMass}
                    readOnly
                />
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="Power On">
                    <PowerSettingsNewIcon />
                </IconButton>

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
                        <h5>Correct Portion Weight: ({unitOfMass}) </h5>
                        <input
                            id="correctPortionInput"
                            type="number"
                            value={correctPortionWeight}
                            onChange={(event) =>
                                setCorrectPortionWeight(
                                    parseInt(event.target.value),
                                )
                            }
                            onBlur={submitCorrectPortionParams}
                        />
                    </div>

                    <div className="centerContent">
                        <h5>Accepted Portion Offset: ({unitOfMass}) </h5>
                        <div className="errorRangeComponent">
                            <div className="errorRangeBlock">
                                <label htmlFor="test">Under</label>
                                <input
                                    type="number"
                                    id="underRangeInput"
                                    name="inputUnderRange"
                                    value={inputLowerWeight}
                                    onChange={(event) =>
                                        setInputLowerWeight(
                                            parseInt(event.target.value),
                                        )
                                    }
                                    onBlur={submitCorrectPortionParams}
                                />
                            </div>

                            <div className="errorRangeBlock">
                                <label htmlFor="test">Over</label>
                                <input
                                    type="number"
                                    id="overRangeInput"
                                    name="overRangeInput"
                                    value={inputUpperWeight}
                                    onChange={(event) =>
                                        setInputUpperWeight(
                                            parseInt(event.target.value),
                                        )
                                    }
                                    onBlur={submitCorrectPortionParams}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Collapse>
        </Card>
    );
}
