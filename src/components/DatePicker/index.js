import dayjs from "dayjs";
import MDBox from "../MDBox";
import { useState } from "react";
import dayOfYear from "dayjs/plugin/dayOfYear.js";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const BasicDatePicker = ({ titleForPage, date, setDate }) => {
    console.log("The date is:", date);
    return (
        <>
            <MDBox py={1} display="flex" justifyContent="center">
                <h2 style={{ margin: "9px 10px", fontSize: "24px" }}>{titleForPage} </h2>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                        <DatePicker label="Select date" value={date} onChange={(newDate) => setDate(newDate)} />
                    </DemoContainer>
                </LocalizationProvider>
            </MDBox>
        </>
    );
};
export default BasicDatePicker;
