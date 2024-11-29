import { useEffect, useState } from "react";
import { getAllCategories } from "../../api/category";
import CategoryItem from './CategoryItem';

function Category() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    
    useEffect(()=>{
        setLoading(true)
        setError("")
        getAllCategories()
        .then(data=>{
            setCategories(data)
        })
        .catch(error=>{
            setError(error.message)
        })
        .finally(()=>{
            setLoading(false)
        })
    },[])

  return (
    <div>
        {categories.length>0 && categories.map(category=>(
            <CategoryItem {...category} />
        ))}
        {loading && <div>Loading...</div>}
    </div>
  )
}

export default Category