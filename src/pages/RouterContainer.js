// Main Page Containers
import DashboardContainer from "./dashboard";
import ScalesContainer from "./scales";
import AnalyticsContainer from "./analytics";

// @mui icons
import Icon from "@mui/material/Icon";
import HomeIcon from "@mui/icons-material/Home";
import ScaleIcon from "@mui/icons-material/Scale";
import AnalyticsIcon from "@mui/icons-material/Analytics";

/*!
   @description: Array of Routes
   @params:
   @return:
   @Comments
   @Coders: GGG111000
*/
const RouterContainer = (metaInformation) => {
    return [
        {
            type: "collapse",
            name: "Dashboard",
            key: "dashboard",
            icon: (
                <Icon fontSize="small">
                    <HomeIcon />
                </Icon>
            ),
            route: "/dashboard",
            component: (
                <DashboardContainer
                    iotThingNames={metaInformation.iotThingNames}
                    unitOfMass={metaInformation.unitOfMass}
                    displayIngredientIndex={metaInformation.displayIngredient}
                    timeZone={metaInformation.timeZone}
                    isMobileDevice={metaInformation.isMobileDevice}
                    demo={metaInformation.demo}
                />
            ),
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
            component: (
                <ScalesContainer
                    iotThingNames={metaInformation.iotThingNames}
                    restaurantName={metaInformation.restaurantName}
                    restaurantLocationNum={metaInformation.restaurantLocationNum}
                    unitOfMass={metaInformation.unitOfMass}
                />
            ),
        },
        {
            type: "collapse",
            name: "Analytics",
            key: "analytics",
            icon: (
                <Icon fontSize="small">
                    <AnalyticsIcon />
                </Icon>
            ),
            route: "/analytics",
            component: <AnalyticsContainer iotThingNames={metaInformation.iotThingNames} displayIngredient={metaInformation.displayIngredient} />,
        },
    ];
};

export default RouterContainer;
