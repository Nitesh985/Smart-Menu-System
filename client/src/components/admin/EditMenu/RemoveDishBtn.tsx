import { RiDeleteBin6Fill } from "react-icons/ri";
import { Button, Loading } from "../..";
import { deleteDish } from "../../../api/dish";
import { useState } from "react";

interface RemoveDishProps{
  dishId: string;
  setDishUpdated: React.Dispatch<React.SetStateAction<boolean>>
}

function RemoveDish({dishId, setDishUpdated}:RemoveDishProps) {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    deleteDish(dishId)
     .then(()=>{
      setDishUpdated(prevState=>!prevState)
     }).catch ((error)=> {
      console.error(error);
    }).finally(()=>{
      setLoading(false)
    })
  };

  return (
    <>
      <Button
        onClick={handleClick}
       className="flex btn btn-secondary bg-red-600 text-white rounded-full">
        <RiDeleteBin6Fill size={20} />
      </Button>
      {loading && <Loading />}
    </>
  );
}

export default RemoveDish;
