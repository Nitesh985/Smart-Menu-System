import { createContext, useContext, useState } from 'react';
import { DishProps } from '../components/user/Home/DishCard';

const SearchContext = createContext<null | {dishes:DishProps[], setDishes:React.Dispatch<React.SetStateAction<DishProps[]>>, searchedQuery:string; setSearchedQuery:React.Dispatch<React.SetStateAction<string>>}>(null);

export const SearchProvider = ({ children }:{children:React.ReactNode}) => {
    const [dishes, setDishes] = useState<DishProps[]>([])
    const [searchedQuery, setSearchedQuery] = useState("")

    return (
        <SearchContext.Provider value={{ dishes, setDishes, searchedQuery, setSearchedQuery }}>
            {children}
        </SearchContext.Provider>
    );
};


export default function useSearchContext(){
    const context = useContext(SearchContext);
    if (!context){
        throw new Error('useSearchContext must be used within a DishProvider');
    }
    return context;
}