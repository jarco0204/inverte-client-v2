import { Route, Switch } from "wouter";
import SignInContainer from "./SignInContainer";

function RouterContainer () {
    return (
        <>
            <Switch>
                <Route path="/" exact>
                    <SignInContainer history={history} />
                </Route>
                <Route path="/home" exact>
                    <NavbarComponent />
                    <SidebarComponent curLocation={curLocation} />
                    <HomePage />
                </Route>
                <Route path="/scales">
                    <NavbarComponent />
                    <SidebarComponent curLocation={curLocation} />
                    <ScalesPage />
                </Route>
                <Route path="/analytics">
                    <NavbarComponent />
                    <SidebarComponent curLocation={curLocation} />
                    <AnalyticsPage />
                </Route>
            </Switch>
        </>
    )
};

export default RouterContainer