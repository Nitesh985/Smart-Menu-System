import { TiTick } from "react-icons/ti";
import Button from "../../Button";
import React, { useState } from "react";
import Modal from "../../Modal";
import { FaRunning } from "react-icons/fa";
import { updateOrder } from "../../../api/order";

function AcceptOrderBtn({_id, setOrdersUpdated}:{_id:string; isEditing:boolean, table_no:string, setOrdersUpdated:React.Dispatch<React.SetStateAction<boolean>>}) {
  const [loading, setLoading] = useState(false);
  const [isOpen , setIsOpen] = useState(false)
  const [message, setMessage] = useState("")

  const handleAccept = () => {
    setLoading(true)
    updateOrder(_id, {status:"READY"})
    .then(()=>{
      setIsOpen(true)
      setMessage("The order is ready!")
    })
    .finally(()=>setLoading(false))
  }

  return (
    <>
      <Button className="green-submit-button bg-purple-500 border-purple-500 hover:border-purple-500 hover:text-purple-500 hover:bg-white px-8" onClick={handleAccept}>
        {loading ? (
          <p className="font-bold">...Please Wait</p>
        ) : (
          <>
            <FaRunning size={25} />
            <p className="font-bold">Ready</p>
          </>
        )}
      </Button>
      <Modal
        title="Ready"
        titleStyles="text-xl"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
          setOrdersUpdated(prevState=>!prevState)
        }}
        handleAccept={()=>{
          setIsOpen(false)
          setOrdersUpdated(prevState=>!prevState)
        }}
        showAcceptBtn={true}
        acceptLabel="Okay"
      >
        <p className="text-lg mt-2 p-2">{message}</p>
      </Modal>
    </>
  );
}

export default AcceptOrderBtn;
