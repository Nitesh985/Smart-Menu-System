import { createContext, useCallback, useContext, useState } from "react";


const ModalContext = createContext(null)

export const ModalProvider = ({children}:{children:React.ReactNode}) => {
    const [isOpen, setIsOpen] = useState(false)

 
    const showModal = () => {
        document.getElementById("my_modal_1").showModal()
    }


    return <ModalContext.Provider value={{isOpen, showModal }}>
        {children}
    </ModalContext.Provider>;
};

 

export default function useModalContext () {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModalContext must be used within a ModalProvider");
    }
    return context;
}