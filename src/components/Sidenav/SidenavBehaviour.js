/*
        Function to open sidenav when mouse enter on mini sidenav
    */
export const handleOnMouseEnter = ({ miniSidenav, onMouseEnter, setMiniSidenav, setOnMouseEnter, dispatch }) => {
    if (miniSidenav && !onMouseEnter) {
        setMiniSidenav(dispatch, false);
        setOnMouseEnter(true);
    }
};

/*
            Function to close sidenav when mouse leave mini sidenav
        */
export const handleOnMouseLeave = ({ onMouseEnter, setOnMouseEnter, setMiniSidenav, dispatch }) => {
    if (onMouseEnter) {
        setMiniSidenav(dispatch, true);
        setOnMouseEnter(false);
    }
};
