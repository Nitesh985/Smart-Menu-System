import { RiDeleteBin6Fill } from "react-icons/ri";
import { Button, Loading, Modal } from "../..";
import { deleteDish } from "../../../api/dish";
import { useState } from "react";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

interface RemoveDishProps {
  dishId: string;
  setDishUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

function RemoveDish({ dishId, setDishUpdated }: RemoveDishProps) {
  const [loading, setLoading] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    deleteDish(dishId)
      .then(() => {
        setDishUpdated((prevState) => !prevState);
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
      <Button
        onClick={() => setIsWarningOpen(true)}
        className="flex btn btn-secondary bg-red-600 text-white rounded-full hover:bg-red-500 border-transparent hover:border-transparent"
      >
        <RiDeleteBin6Fill size={20} />
      </Button>
      <Modal
        title="Are You Sure?"
        titleStyles="text-xl"
        isOpen={isWarningOpen}
        onClose={() => setIsWarningOpen(false)}
        handleAccept={handleDelete}
        showAcceptRejectBtn={true}
      >
        <p className="text-lg mt-2 p-2">You want to delete this dish</p>
      </Modal>
      {loading && <Loading />}
    </>
  );
}

export default RemoveDish;
