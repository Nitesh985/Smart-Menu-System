import { createContext, useContext, useState } from 'react';
import { LoaderUpstairs } from '../components';

//TODO:Set the types for setLoading
const LoaderContext = createContext<null | {loading:boolean, setLoading:any}>(null);

export const LoaderProvider = ({ children }:{children:React.ReactNode}) => {
    const [loading, setLoading] = useState<boolean>(false)
    
    if (loading){
        return <LoaderUpstairs />
    }

    
    return (
        <LoaderContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoaderContext.Provider>
    );
};


export default function useLoaderContext(){
    const context = useContext(LoaderContext);
    if (!context){
        throw new Error('useLoaderContext must be used within a LoaderProvider');
    }
    return context;
}