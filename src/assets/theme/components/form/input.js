/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React Base Styles
import colors from "../../base/colors";
import typography from "../../base/typography";
import borders from "../../base/borders";

const { info, inputBorderColor, dark } = colors;
const { size } = typography;
const { borderWidth } = borders;

const input = {
    styleOverrides: {
        root: {
            fontSize: size.sm,
            color: dark.main,

            "&:hover:not(.Mui-disabled):before": {
                borderBottom: `${borderWidth[1]} solid ${inputBorderColor}`,
            },

            "&:before": {
                borderColor: inputBorderColor,
            },

            "&:after": {
                borderColor: info.main,
            },
        },
    },
};

export default input;
