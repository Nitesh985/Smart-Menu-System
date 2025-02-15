import React, { useEffect, useState } from "react";
import { Button, FileInput, Input, Loader, LoaderUpstairs, Loading, TextArea } from "../..";
import CheckOutForm from "../../CheckOutForm/CheckOutForm";
import { createCategory } from "../../../api/category";
import CategoryForm from "./CategoryForm";
import { FormDataType } from "./CategoryForm";


function CreateCategory({setShowModal}:{setShowModal:React.Dispatch<React.SetStateAction<boolean>>}) {
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
      .then((res) => {
        if (res.success){
          setShowModal(false)
          setFormData({
            name: "",
            description: "",
            image: null,
          });
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
      <CategoryForm handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} />
      {loading && <Loading />}
    </>
  );
}

export default CreateCategory;
