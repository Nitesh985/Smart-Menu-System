import { useEffect, useState } from "react";
import { Button, FileInput, Input, Loader, LoaderUpstairs, Loading, TextArea } from "../..";
import CheckOutForm from "../../CheckOutForm/CheckOutForm";
import { createCategory } from "../../../api/category";
import CategoryForm from "./CategoryForm";
import { FormDataType } from "./CategoryForm";


function CreateCategory({modalId}:{modalId:string}) {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    description: "",
    image: null,
  });
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    createCategory(formData)
      .then((response) => {
        console.log(response.message);
        const element = (document.getElementById(modalId) as HTMLFormElement)
        if (element){
          element.close()
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  
  console.log(formData);

  return (
    <>
      <div className="text-center font-extrabold text-3xl text-txtColor-200 opacity-90">
        Add Category
      </div>
      <CategoryForm handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} />
      {loading && <Loading />}
    </>
  );
}

export default CreateCategory;
