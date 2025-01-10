import { Button, CreateCategory, Modal, Select, Table } from "../../components";

import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

import useModalContext from "../../context/ModalContext";
import { useEffect, useId, useState } from "react";
import { getAllCategories } from "../../api/category";
import { AddDish, CategoryList, DishList } from "../../components/admin";

function EditMenu() {
  const [showDishForm, setShowDishForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const [selectedOption, setSelectedOption] = useState('category')

  const dishId = useId();
  const categoryId = useId();

  const handleDishClick = () => {
    setShowDishForm(true);
    (document.getElementById(dishId) as HTMLFormElement).showModal();
  };

  const handleCategoryClick = () => {
    setShowCategoryForm(true);
    (document.getElementById(categoryId) as HTMLFormElement).showModal();
  };




  return (
    <>
      <h1 className="text-center font-bold text-3xl mt-3">Edit Menu</h1>
      <div className="flex justify-between mt-5">
        <Select options={["category", "dish"]} className="max-w-xs ml-3" onChange={(e)=>setSelectedOption(e.currentTarget.value)} />
        <div className="flex justify-end space-x-4 mr-4">
          <Button
            onClick={handleDishClick}
            className="green-submit-button border-none"
          >
            <FaPlus size={25} />
            <p>Add Dish</p>
          </Button>

          <Button
            onClick={handleCategoryClick}
            className="green-submit-button border-none"
          >
            <FaPlus size={25} />
            <p>Add Category</p>
          </Button>
        </div>
      </div>

      {selectedOption==="category" && <CategoryList />}
      {selectedOption==="dish" && <DishList />}

      {showDishForm && (
        <Modal id={dishId}>
          <AddDish modalId={dishId} />
        </Modal>
      )}
      {showCategoryForm && (
        <Modal id={categoryId}>
          <CreateCategory modalId={categoryId} />
        </Modal>
      )}
    </>
  );
}

export default EditMenu;
