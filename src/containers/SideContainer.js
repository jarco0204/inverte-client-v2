import NavBar from "../components/NavBar";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { isAuthorized } from "../redux/authSelector"

function SideContainer () {
    const authorized = useSelector(isAuthorized)
    return (
        <>
        { !authorized && (
            <Header />
        )}
        { authorized && (
            <NavBar />
            )}
        </>
    )
}

export default SideContainer;