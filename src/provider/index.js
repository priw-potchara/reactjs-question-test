import React, {
    useContext,
    createContext,
    useState,
    useEffect,
} from "react";

const WebContext = createContext()

const useWebDetail = () => {
    const {
        webDetail,
        setWebDetail,
    } = useContext(WebContext)

    return {
        webDetail,
        setWebDetail,
    }
}
//==============================
//==============================

const WebProvider = ({ children }) => {
    const [webDetail, setWebDetail] = useState(null);

    //==============================
    return (
        <WebContext.Provider value={{
            webDetail,
            setWebDetail,
        }}>{children}</WebContext.Provider>
    )
};

export {
    WebProvider,
    useWebDetail,
};