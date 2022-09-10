/*
    @Input: Authorized state
    @Output: Graph UI Web Socket

    @Coder: El Puma
*/
function RealTimeContainer(props) {
    console.log("users is authorized: ", props.auth);
    return (
        <h1 style={{ position: "relative", top: "20px", left: "100px" }}>
            Hola
        </h1>
    );
}
export default RealTimeContainer;
