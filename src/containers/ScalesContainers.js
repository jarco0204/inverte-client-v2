import Scale from "../components/Scale";

// CSS
import "../assets/css/ScalesContainer.css";

/*
    Main Container Function
  */
export default function ScalesContainer({ auth, username, scalesData }) {
    return (
        <div className="scalesContainer">
            {scalesData.map((scaleArr, i) => (
                <Scale key={i} scaleArr={scaleArr} />
            ))}
        </div>
    );
}