import { createContext, useState } from "react";

interface ContextApplicationProps {
    dataApplication: any;
    setDataApplication: (dataApplication : any) => void
}

export const ContextApplication = createContext<ContextApplicationProps>({dataApplication: {}, setDataApplication: () => {}});

function Context({children}:any) {
    const [currentData, setCurrentData] = useState({})
    return(
        <ContextApplication.Provider value={{
            dataApplication: currentData,
            setDataApplication: setCurrentData
        }}>
            {children}
        </ContextApplication.Provider>
    )
}

export default Context