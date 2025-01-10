import { useEffect, useState } from "react";
import { createCategory, getCategoryById, updateCategory } from "../../../api/category";
import Loading from "../../Loading";
import CategoryForm, { FormDataType } from "./CategoryForm";

interface EditCategoryProps {
  categoryId: string;
  setCategoryUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditCategory({ categoryId, setCategoryUpdated }: EditCategoryProps) {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    updateCategory({ categoryId, ...formData })
      .then((response) => {
        console.log(response.message);
        setCategoryUpdated((prevState) => !prevState);
        const element = document.getElementById(categoryId) as HTMLFormElement;
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

  useEffect(()=>{
    getCategoryById(categoryId)
    .then(categories=>setFormData(categories))
    .then(()=>setCategoryUpdated(prevState=>!prevState))
    .catch(error=>console.error(error))
    .finally(()=>setLoading(false))
  }, [])

  return (
    <>
      <div className="text-center font-extrabold text-3xl text-txtColor-200 opacity-90">
        Edit Category
      </div>
      <CategoryForm
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
      {loading && <Loading />}
    </>
  );
}

export default EditCategory;
