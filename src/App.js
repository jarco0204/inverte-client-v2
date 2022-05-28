import "./App.css";
import RouterContainer from "./containers/RouterContainer";
//import Header from "./components/Header";
//import Footer from "./components/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import ProviderWrapper from "./Provider";
import theme from "./theme";

function App() {
    const [authorized, setAuthorized] = useState(false);
    return (
        // <Header />
        <ProviderWrapper theme={theme}>
            <Router>
                <RouterContainer
                    authorized={authorized}
                    setAuthorized={setAuthorized}
                />
            </Router>
        </ProviderWrapper>
        // <Footer />
    );
}
export default App;
