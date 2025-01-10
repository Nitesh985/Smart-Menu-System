import { useEffect, useState } from "react";
import { Button, FileInput, Input, Loading, Select, TextArea } from "../..";
import { DishForm } from "..";
import { getDishById, updateDish } from "../../../api/dish";
import { getAllCategories } from "../../../api/category";
import { FormDataType } from "./DishForm";

interface EditDishProps {
  dishId: string;
  setDishUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}



function EditDish({ dishId, setDishUpdated }: EditDishProps) {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    description: "", 
    price: null,
    category: null,
    image: null,
  });
  const [loading, setLoading] = useState(false)
    useEffect(()=>{
        setLoading(true)
        getDishById(dishId)
        .then(res=>{
            setFormData(res?.data)
        })
        .catch(error=>console.log(error))
        .finally(()=>{
            setLoading(false)
        })
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      updateDish(dishId, formData)
      .then(()=>setDishUpdated(prevState=>!prevState))
        .then((response) => {
          console.log(response);
          const element = document.getElementById(dishId) as HTMLFormElement;
          if (element) {
            element.close();
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };


    return (
    <>
      <div className="text-center font-extrabold text-3xl text-txtColor-200 opacity-90">
        Edit Dish
      </div>
      <DishForm handleSubmit={handleSubmit} setFormData={setFormData} formData={formData} />
      {loading && <Loading />}
    </>
  );
}

export default EditDish;
