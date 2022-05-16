import "./App.css";
import RouterContainer from "./containers/RouterContainer";
//import Header from "./components/Header";
//import Footer from "./components/Footer";
import { BrowserRouter as Router } from 'react-router-dom'
import { useState } from 'react'

function App() {
    const [authorized, setAuthorized] = useState(false);
    return (
        // <Header />
        <Router>
            <RouterContainer authorized={authorized} setAuthorized={setAuthorized}/>
        </Router>
        // <Footer />
    );
}
export default App;
