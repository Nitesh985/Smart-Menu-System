import { createContext, useCallback, useContext, useState } from "react";


const ModalContext = createContext<null | {showModal: (id:string)=>void}>(null)

export const ModalProvider = ({children}:{children:React.ReactNode}) => {

    const showModal = (id:string) => {
        (document.getElementById(id) as HTMLFormElement)?.showModal()
    }


    return <ModalContext.Provider value={{showModal}}>
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