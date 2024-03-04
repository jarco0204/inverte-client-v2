import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const Dropdown = ({ displayData, setDisplayData }) => {
    const [chartData, setChartData] = useState("Chart Display");

    const handleChange = (event) => {
        setDisplayData(event.target.value);
        setChartData(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 165 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Chart display</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={chartData} label="Chart display" onChange={handleChange}>
                    <MenuItem value={"inventoryWeight"}>Inventory Weight</MenuItem>
                    <MenuItem value={"portionComparison"}>Portion Comparison</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};
export default Dropdown;
