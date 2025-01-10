import { useEffect, useState } from "react"
import { getAllCategories } from "../api/category"
import MobileContainer from "../components/MobileContainer";


interface CategoryProps {
  id: string;
  name: string;
  description?: string;
}

function Test() {
  const [categories, setCategories] = useState([])

  useEffect(()=>{
    getAllCategories()
    .then(categories=>{
      setCategories(categories)
    })
    .catch(error=>{
      console.error("Failed to fetch categories:", error)
    })
  }, [])

  return (
    <MobileContainer className="bg-green-600" >
      <h1>All Categories</h1>
      {categories.map((category:CategoryProps) => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          <p>{category.description}</p>
        </div>
      ))}
    </MobileContainer>  
  )
}

export default Test