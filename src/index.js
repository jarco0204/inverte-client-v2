// React Imports
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "./context";

// App and root csss
import App from "./App";

/*!
   @description:
   @params:
   @return:
   @Comments
   @Coders: InverteClientTeam111
*/
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <MaterialUIControllerProvider>
            <App />
        </MaterialUIControllerProvider>
    </Router>
);
