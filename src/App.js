import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";

// Containers
import RouterContainer from "./containers/RouterContainer";

// Theme & CSS
import ProviderWrapper from "./Provider";
import "./App.css";
import theme from "./theme";

function App() {
    const [authorized, setAuthorized] = useState(false);
    return (
        <ProviderWrapper theme={theme}>
            <Router>
                <RouterContainer
                    authorized={authorized}
                    setAuthorized={setAuthorized}
                />
            </Router>
        </ProviderWrapper>
    );
}
export default App;
