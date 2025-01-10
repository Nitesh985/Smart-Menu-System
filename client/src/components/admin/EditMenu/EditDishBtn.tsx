import { FaEdit } from "react-icons/fa";
import { Button, Modal } from "../..";
import { useId, useState } from "react";
import { EditDish } from "..";

function EditDishBtn({dishId, setDishUpdated}:{dishId:string, setDishUpdated:Function}) {
  const editDishId = useId()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleClick = () => {
    setIsModalOpen(true);
    (document.getElementById(editDishId) as HTMLFormElement).showModal()
  }


  return (
    <>
      <Button onClick={handleClick} className="flex justify-center items-center rounded-full bg-yellow-400 hover:bg-yellow-300 border-none">
        <FaEdit size={20} />
      </Button>
      {isModalOpen && <Modal id={editDishId}>
          <EditDish dishId={dishId} setDishUpdated={setDishUpdated} />
        </Modal>}
    </>
  )
}

export default EditDishBtn