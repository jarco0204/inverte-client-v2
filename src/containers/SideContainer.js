import NavBar from "../components/NavBar";
import Header from "../components/Header";

function SideContainer ({
    authorized = console.log,
}) {
    return (
        <>
        <Header />
        { authorized && (
            <NavBar />
            )}
        </>
    )
}

export default SideContainer;