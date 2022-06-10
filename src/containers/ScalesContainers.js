import Scale from "../components/Scale";
function ScalesContainer() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "60vh",
            }}
        >
            <Scale />
        </div>
    );
}
export default ScalesContainer;
