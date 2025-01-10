import { RiDeleteBin6Fill } from "react-icons/ri";
import Button from "../../Button";
import { deleteCategory } from "../../../api/category";
import { useState } from "react";
import { Loading } from "../..";

interface RemoveCategoryBtnProps {
  categoryId: string;
  setCategoryUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

function RemoveCategoryBtn({ categoryId, setCategoryUpdated }: RemoveCategoryBtnProps) {
    const [loading, setLoading] = useState(false)
    const handleClick = () => {
        setLoading(true)
    deleteCategory(categoryId)
    .then(()=>setCategoryUpdated(prevState=>!prevState))
    .catch(error=>console.log(error))
    .finally(()=>setLoading(false))
  };

  return (
    <>
        <Button
        className="flex btn btn-secondary bg-red-600 text-white rounded-full"
        onClick={handleClick}
        >
          <RiDeleteBin6Fill size={20} />
        </Button>
        {loading && <Loading />}
    </>
  );
}

export default RemoveCategoryBtn;
