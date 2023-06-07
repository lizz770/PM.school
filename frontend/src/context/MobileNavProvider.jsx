import { createContext, useState, useContext} from "react";
const MobileNavContext = createContext({
    isOpened: false,
    setIsOpened: () => {},
});

const MobileNavProvider = ({ children }) =>{
    const [ isOpened, setIsOpened] = useState(false);
    const value ={ isOpened, setIsOpened };
    return(
        <MobileNavContext.Provider value={value}>
            {children}
        </MobileNavContext.Provider>
    );
};

const useMobileNav = ()=>useContext(MobileNavContext);
export {MobileNavContext, MobileNavProvider, useMobileNav};