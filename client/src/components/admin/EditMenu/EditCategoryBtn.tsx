import React, { useState } from "react";
import { Button, Modal } from "../..";
import { FaEdit } from "react-icons/fa";
import EditCategory from "./EditCategory";

interface EditCategoryBtnProps {
  categoryId:string;
  setCategoryUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  
}

function EditCategoryBtn({
    categoryId,
    setCategoryUpdated
}: EditCategoryBtnProps) {
    const [showCategoryForm, setShowCategoryForm] = useState(false);

    const handleClick = () => {
        setShowCategoryForm(true);
    }

  return (
    <>
        <Button
          className={`flex justify-center items-center rounded-full bg-yellow-400 hover:bg-yellow-300 border-none text-white`}
          onClick={handleClick}
        >
          <FaEdit size={20} />
        </Button>
        {showCategoryForm && (
        <Modal isOpen={showCategoryForm} title="Edit Category" onClose={()=>setShowCategoryForm(false)}>
          <EditCategory
            categoryId={categoryId}
            setCategoryUpdated={setCategoryUpdated}
          />
        </Modal>
      )}
    </>
  );
}

export default EditCategoryBtn;
