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
        (document.getElementById(categoryId) as HTMLFormElement).showModal();
    }

  return (
    <>
        <Button
          className={`flex justify-center items-center rounded-full bg-yellow-400 hover:bg-yellow-300 border-none`}
          onClick={handleClick}
        >
          <FaEdit size={20} />
        </Button>
        {showCategoryForm && (
        <Modal id={categoryId}>
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
