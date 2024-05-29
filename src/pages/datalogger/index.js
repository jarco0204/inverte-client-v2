// Main Imports
import dayjs from "dayjs";
import PropTypes from "prop-types";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import toObject from "dayjs/plugin/toObject.js";
import dayOfYear from "dayjs/plugin/dayOfYear.js";

// General Dashboard Components

import Footer from "../../components/Footer";
import { TareButton, StartButton } from "../scales/components/Scale/ScaleButtons";
import { PubSub, Auth, API } from "aws-amplify";
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import LivePortionWeightComponent from "./components/LivePortionWeightComponent";

// DayJS Configuration
dayjs.extend(dayOfYear);
dayjs.extend(toObject);
dayjs.extend(utc);
dayjs.extend(timezone);

/*!
   @description: Main Dashboard container that displays portion event information to user. 
   @params:
   @return:
   @Comments
   @Coders: GangaLi
*/
const DataLogger = () => {
    /*!
       @description:
       @params:
       @return:
       @Comments: 
       @Coders: Mohan
    */
    const convertGsToOz = (val) => {
        return (parseInt(val) / 28.35).toFixed(2).toString();
    };
    const handleScaleAction = (event) => {
        console.log(event.target.value);
        let msg, finalTopic;
        if (event.target.value == "Restart") {
            msg = {
                clientAction: 2,
            };
        } else if (event.target.value == "Tare") {
            msg = {
                clientAction: 1,
            };
        }
        finalTopic = "Invert/1/1/clientActions";
        PubSub.publish(finalTopic, msg);
        console.log("Desired Client Action Published to Scale..."); // Debug Statement
    };

    // Return Main Dashboard Container
    return (
        <DashboardLayout>
            <LivePortionWeightComponent />
            <TareButton value={"Tare"} onClick={handleScaleAction}>
                Tare Scale
            </TareButton>
            <StartButton value={"Restart"} onClick={handleScaleAction}>
                Restart scale
            </StartButton>
        </DashboardLayout>
    );
};

export default DataLogger;
