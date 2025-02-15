import { FaEdit } from "react-icons/fa";
import { Button, Modal } from "../..";
import React, { useState } from "react";
import { EditDish } from "..";

function EditDishBtn({dishId, setDishUpdated}:{dishId:string, setDishUpdated:React.Dispatch<React.SetStateAction<boolean>>}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleClick = () => {
    setIsModalOpen(true);
  }


  return (
    <>
      <Button onClick={handleClick} className="flex justify-center items-center bg-transparent rounded-full bg-yellow-400 hover:bg-yellow-300 border-none text-white ">
        <FaEdit size={20} />
      </Button>
      <Modal title="Edit Dish" isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} >
          <EditDish dishId={dishId} setDishUpdated={setDishUpdated} />
        </Modal>
    </>
  )
}

export default EditDishBtn