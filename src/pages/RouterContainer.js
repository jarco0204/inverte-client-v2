// Main Page Containers
import DashboardContainer from "./dashboard";
import ScalesContainer from "./scales";
import AnalyticsContainer from "./analytics";

// @mui icons
import Icon from "@mui/material/Icon";
import ScaleIcon from "@mui/icons-material/Scale";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import InsightsIcon from "@mui/icons-material/Insights";

/*!
   @description: Array of Routes
   @params:
   @return:
   @Comments
   @Coders: GGG111000
*/
const RouterContainer = (metaInformation, isMobileDevice) => {
    return [
        {
            type: "collapse",
            name: "Real-Time",
            key: "real time",
            icon: (
                <Icon fontSize="small">
                    <AnalyticsIcon />
                </Icon>
            ),
            route: "/dashboard",
            component: <DashboardContainer />,
        },
        !isMobileDevice
            ? {
                  type: "collapse",
                  name: "Past Day",
                  key: "past day",
                  icon: (
                      <Icon fontSize="small">
                          <InsightsIcon />
                      </Icon>
                  ),
                  route: "/pastDaily",
                  component: <AnalyticsContainer />,
              }
            : {},
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
    ];
};

export default RouterContainer;
