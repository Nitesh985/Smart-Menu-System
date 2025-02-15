import { RxCross2 } from "react-icons/rx"
import Button from "../../Button"
import { useState } from "react"
import { deleteOrder } from "../../../api/order"
import Modal from "../../Modal"

function RejectBtn({_id, setOrdersUpdated}:{_id:string, setOrdersUpdated:React.Dispatch<React.SetStateAction<boolean>>}) {
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleRejectBtn = () => {
    setLoading(true)
     deleteOrder(_id)
     .then(()=>setOrdersUpdated(prevState=>!prevState))
     .finally(()=>{
      setLoading(false)
    })
  }

  return (
    <>
      <Button onClick={()=>setIsOpen(true)} className="red-reject-button">
      {loading?
      <p className="font-bold" >...Please Wait</p>:
      <>
        <RxCross2 size={25} />
        <p className="font-bold" >Reject</p>
      </>}
      </Button>
      <Modal
        title="Are You Sure?"
        titleStyles="text-xl"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        handleAccept={handleRejectBtn}
        showAcceptRejectBtn={true}
      >
        <p className="text-lg mt-2 p-2">You want to reject this order</p>
      </Modal>
    </>
  )
}

export default RejectBtn