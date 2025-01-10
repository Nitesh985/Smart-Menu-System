import { createContext, useContext, useState } from "react";


const AlertContext = createContext<null | {message:string, alertMessage: (message: string, timer?: number ) => void }>(null);

export const AlertProvider = ({children}:{children:React.ReactNode}) => {
    const [message, setMessage] = useState("")

    const alertMessage = (message:string, timer:number=3000) => {
        let timerId;
        clearTimeout(timerId)
        setMessage(message)
        setTimeout(() => {
            setMessage("")
        }, timer)
    }
    


    return <AlertContext.Provider value={{ message, alertMessage }}>
        {children}
    </AlertContext.Provider>;
};

 

export default function useAlertContext () {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlertContext must be used within a AlertProvider");
    }
    return context;
}