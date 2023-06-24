// Material UI
import { Typography } from "@material-ui/core";

// Assets
import inverteLogo from "../../assets/img/inverte_green_logo.png";
import "../../assets/css/SpinnerLoaderScreen.css";

/*!
   @description:
   @params:
   @return:
   @Comments
   @Coders: Rohan-16
*/
export default function SpinnerLoader() {
    return (
        <div className="spinner-container">
            <div className="spinner-logo">
                <img src={inverteLogo} alt="Logo" />
            </div>
            <Typography variant="h5" className="spinner-text">
                Make Every Gram Count
            </Typography>
        </div>
    );
}
