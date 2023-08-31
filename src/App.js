// React Imports
import theme from "./assets/theme";
import MainContainer from "./pages/MainContainer";
import ProviderWrapper from "./Provider";

export default function App(){
    return (
        <ProviderWrapper theme={theme}>
            <MainContainer />
        </ProviderWrapper>
    )
}