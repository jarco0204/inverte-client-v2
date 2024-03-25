import dayjs from "dayjs";
import MDBox from "../MDBox";
import { useState } from "react";
import { DatePicker } from "antd";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const BasicDatePicker = ({ titleForPage, date, setDate }) => {
    console.log("The date is:", date);
    const [value, setStartDate] = useState(null);
    const [date1, setDate1] = useState(null);
    const disabledDate = (current) => {
        if (current.isBefore("2023-11-30")) {
            return true;
        }

        // Disable dates after today (using default getNow)
        return current.isAfter(new Date());
    };
    return (
        <>
            <MDBox py={1} display="flex" justifyContent="center">
                <h2 style={{ margin: "9px 10px", fontSize: "24px" }}>{titleForPage} </h2>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateRangePicke"]}>
                        <DatePicker
                            value={date || value}
                            disabledDate={disabledDate}
                            onCalendarChange={(start) => {
                                setStartDate(start);
                            }}
                            onChange={(val) => {
                                setDate1(val);
                            }}
                            onBlur={setDate(date1)}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </MDBox>
        </>
    );
};
export default BasicDatePicker;
