// Main Page Containers
import DashboardContainer from "./dashboard";
import ScalesContainer from "./scales";
import AnalyticsContainer from "./analytics";
import OutlierContainer from "./outlier";

// @mui icons
import Icon from "@mui/material/Icon";
import ScaleIcon from "@mui/icons-material/Scale";
import AnalyticsIcon from "@mui/icons-material/Analytics";

/*!
   @description: Array of Routes
   @params:
   @return:
   @Comments
   @Coders: GGG111000
*/
const RouterContainer = () => {
    return [
        {
            type: "collapse",
            name: "Daily",
            key: "daily",
            icon: (
                <Icon fontSize="small">
                    <AnalyticsIcon />
                </Icon>
            ),
            route: "/dashboard",
            component: <DashboardContainer />,
        },
        {
            type: "collapse",
            name: "Scales",
            key: "scales",
            icon: (
                <Icon fontSize="small">
                    <ScaleIcon />
                </Icon>
            ),
            route: "/scales",
            component: <ScalesContainer />,
        },
        {
            route: "/outlier",
            component: <OutlierContainer />,
        },
        {
            type: "collapse",
            name: "Past",
            key: "past",
            icon: (
                <Icon fontSize="small">
                    <AnalyticsIcon />
                </Icon>
            ),
            route: "/past",
            component: <AnalyticsContainer />,
        },
    ];
};

export default RouterContainer;
