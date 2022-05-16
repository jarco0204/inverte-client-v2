import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignInContainer from "./SignInContainer";

function RouterContainer ({
    authorized = console.log,
    setAuthorized = console.log
}) {
    return (
        <>
        {!authorized &&(
            <Routes>
                <Route exact path="/" element={<SignInContainer authorized={authorized} setAuthorized={setAuthorized}/>}/>
                <Route exact path="/home" />
                    {/* <NavbarComponent /> */}
                    {/* <SidebarComponent curLocation={curLocation} /> */}
                    {/* <HomePage /> */}
            </Routes>
        )}
        {authorized&&(
            <Routes>
                <Route path="/scales" />
                    {/* <NavbarComponent /> */}
                    {/* <SidebarComponent curLocation={curLocation} /> */}
                    {/* <ScalesPage /> */}
                <Route path="/analytics" />
                    {/* <NavbarComponent /> */}
                    {/* <SidebarComponent curLocation={curLocation} /> */}
                    {/* <AnalyticsPage /> */ }
                <Route path="/" element={<Navigate replace to="/"/>}/>
            </Routes>
        )}
        </>
    )
};

export default RouterContainer