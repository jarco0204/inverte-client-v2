import dayjs from "dayjs";
import MDBox from "../MDBox";
import { useState } from "react";
import { DatePicker } from "antd";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const MultipleDatePicker = ({ titleForPage, date, setDate }) => {
    console.log("The date is:", date);
    const { RangePicker } = DatePicker;
    const [value, setStartDate] = useState(null);
    const [date1, setDate1] = useState(null);
    const disabledDate = (current) => {
        if (current.isBefore("2024-01-01")) {
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
                    <DemoContainer components={["DateRangePicker"]}>
                        <RangePicker
                            disabledDate={disabledDate}
                            showTime={{
                                hideDisabledOptions: true,
                                defaultValue: [dayjs("00:00:00", "HH:mm:ss"), dayjs("11:59:59", "HH:mm:ss")],
                            }}
                            format="YYYY-MM-DD"
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
export default MultipleDatePicker;
