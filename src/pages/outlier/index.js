// Main Libraries
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Backend
import { API, Auth } from "aws-amplify";

/*!
   @description:
   @params:
   @return:
   @Comments
   @Coders: Fu€g0001
*/
const OutlierContainer = ({ iotThingNames, displayIngredient }) => {
    // Display Outlier Page
    return <h1>FUEGO</h1>;
};
OutlierContainer.propTypes = {
    iotThingNames: PropTypes.array,
    displayIngredient: PropTypes.string,
};

export default OutlierContainer;
