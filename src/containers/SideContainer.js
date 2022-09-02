import NavBar from "../components/NavBar";
import Header from "../components/Header";

function SideContainer ({
    authorized = console.log,
}) {
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