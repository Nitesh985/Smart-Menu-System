import { useEffect, useState } from "react";
import { DishForm } from "..";
import { addDish } from "../../../api/dish";
import { Loading } from "../..";
import { FormDataType } from "./DishForm";



function AddDish({modalId}:{modalId:string}) {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    description: "", 
    price: null,
    category: null,
    image: null,
  });
  const [loading, setLoading] = useState(false)


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    addDish(formData)
      .then((response) => {
        console.log(response);
        const element = document.getElementById(modalId) as HTMLFormElement;
        if (element) {
          element.close();
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
        setFormData({
          name: "",
          description: "", 
          price: 0,
          category: null,
          image: null,
        })
      });
  };

  return (
    <>
      <div className="text-center font-extrabold text-3xl text-txtColor-200 opacity-90">
        Add Dish
      </div>
      <DishForm handleSubmit={handleSubmit} setFormData={setFormData} formData={formData} />
      {loading && <Loading />}
    </>
  );
}

export default AddDish;
