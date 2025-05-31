import { RiDeleteBin6Fill } from "react-icons/ri";
import Button from "../../tagUtils/Button";
import { deleteCategory } from "../../../api/category";
import { useState } from "react";
import { Loading, Modal } from "../..";

interface RemoveCategoryBtnProps {
  categoryId: string;
  setCategoryUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

function RemoveCategoryBtn({
  categoryId,
  setCategoryUpdated,
}: RemoveCategoryBtnProps) {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDelete = () => {
    setLoading(true);
    deleteCategory(categoryId)
      .then(() => setCategoryUpdated((prevState) => !prevState))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Button
        className="flex btn btn-secondary bg-red-600 text-white rounded-full hover:bg-red-500 border-none"
        onClick={() => setIsModalOpen(true)}
      >
        <RiDeleteBin6Fill size={20} />
      </Button>
      <Modal
        title="Are You Sure?"
        titleStyles="text-xl"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        handleAccept={handleDelete}
        showAcceptRejectBtn={true}
      >
        <p className="text-lg mt-2 p-2">You want to delete this category</p>
      </Modal>
      {loading && <Loading />}
    </>
  );
}

export default RemoveCategoryBtn;
