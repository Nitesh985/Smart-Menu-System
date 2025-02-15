import { useEffect, useState } from "react";
import { DishForm } from "..";
import { addDish } from "../../../api/dish";
import { Loading } from "../..";
import { FormDataType } from "./DishForm";



function AddDish({setShowModal}:{setShowModal:React.Dispatch<React.SetStateAction<boolean>>}) {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    description: "", 
    price: null,
    category: null,
    image: null,
    quantity: null,
  });
  const [loading, setLoading] = useState(false)


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    addDish(formData)
      .then((res) => {
        if (res.success){
          setShowModal(false);
          setFormData({
            name: "",
            description: "", 
            price: null,
            category: null,
            image: null,
            quantity: null,
          })
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
      <DishForm handleSubmit={handleSubmit} setFormData={setFormData} formData={formData} />
      {loading && <Loading />}
    </>
  );
}

export default AddDish;
