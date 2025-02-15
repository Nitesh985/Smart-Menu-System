import { TiTick } from "react-icons/ti";
import Button from "../../Button";
import React, { useState } from "react";
import Modal from "../../Modal";
import { updateOrder } from "../../../api/order";

function AcceptBtn({_id, isEditing, table_no, setOrdersUpdated}:{_id:string, isEditing:boolean, table_no:string, setOrdersUpdated:React.Dispatch<React.SetStateAction<boolean>>}) {
  const [loading, setLoading] = useState(false);
  const [isOpen , setIsOpen] = useState(false)
  const [message, setMessage] = useState("")

  const handleAccept = () => {
    setLoading(true)
    if (isEditing){
        setLoading(false)
      alert(`The table no:${table_no} is currently updating the orders`)
      return
    }
    updateOrder(_id, {status:"ACCEPTED"})
    .then(()=>{
        setMessage("The order is accepted")
        setIsOpen(true)
    })
    .finally(()=>setLoading(false))
  }

  return (
    <>
      <Button className="green-submit-button" onClick={handleAccept}>
        {loading ? (
          <p className="font-bold">...Please Wait</p>
        ) : (
          <>
            <TiTick size={25} />
            <p className="font-bold">Accept</p>
          </>
        )}
      </Button>
      <Modal
        title="Hurray!"
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

export default AcceptBtn;
