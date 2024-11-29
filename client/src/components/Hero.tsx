import { createCategory, CategoryProps } from "../api/category"
import { useEffect, useState } from "react"
import axios from "axios";
import useAlertContext from "../context/AlertContext";
import Alert from "./Alert";

function Hero() {
    const [category, setCategory] = useState<CategoryProps>({name:"", description:""})
    const {message, alertMessage} = useAlertContext()
    const [error, setError] = useState("")



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setCategory(prevCategory=>{
        return {...prevCategory, [name]: value }
      })
    }
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!category){
        return
      }
        try {
          setError("")

          const categoryCreated = await axios.post('/api/v1/categories/add-category', {
            name: category.name,
            description: category.description
          })
          alertMessage("The category was created successfully")

          console.log(categoryCreated)
          setCategory({name:"", description:""})
        } catch (error) {
          console.log(error)
          if (error instanceof axios.AxiosError && error.response?.data.message) {
            setError(error.response.data.message)
            alertMessage(error.response.data.message)
          }
      }
    }


    return (
    <>
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          placeholder="Enter the category "
          className="input input-secondary w-full max-w-xs"
          name="name"
          onChange={handleInputChange}
          />
          <input
          type="text"
          placeholder="Enter the description"
          className="input input-secondary w-full max-w-xs mt-2"
          name="description"
          onChange={handleInputChange}
          />
        <button
          className="button button-primary w-1/2 max-w-xs h-[50px] rounded-xl bg-blue-700"
          >
          Create Category
        </button>
      </form>
      {message && <Alert type={error?"error":"success"} message={message} />}
    </>
  
  )
}


export default Hero