// Main Page Containers
import DashboardContainer from "./dashboard";
import ScalesContainer from "./scales";
import AnalyticsContainer from "./analytics";
import OutlierContainer from "./outlier";

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
const RouterContainer = (metaInformation, isMobileDevice) => {
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
            component: (
                <DashboardContainer/>
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
            route: "/outlier",
            component: <OutlierContainer />,
        },
        // isMobileDevice
        //     ? {
        //           name: "Mobile Analytics coming soon",
        //       }
        //     : {
        //           type: "collapse",
        //           name: "Analytics",
        //           key: "analytics",
        //           icon: (
        //               <Icon fontSize="small">
        //                   <AnalyticsIcon />
        //               </Icon>
        //           ),
        //           route: "/analytics",
        //           component: <AnalyticsContainer iotThingNames={metaInformation.iotThingNames} displayIngredient={metaInformation.displayIngredient} />,
        //       },
    ];
};

export default RouterContainer;
