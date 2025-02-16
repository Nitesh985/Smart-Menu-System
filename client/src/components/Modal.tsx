import { Button } from ".";
import { useEffect, useId, useRef, useState } from "react";
import { showModal } from "./utils/Modal";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";

interface ModalProps {
  isOpen: boolean;
  title?:string;
  titleStyles?:string;
  children: React.ReactNode;
  onClose?:()=>void;
  showAcceptRejectBtn?: boolean;
  showAcceptBtn?:boolean;
  handleAccept?:()=>void;
  acceptLabel?: string;
  rejectLabel?: string;
}


function Modal({  title, titleStyles, children, isOpen, onClose, showAcceptRejectBtn=false, showAcceptBtn=false, handleAccept, acceptLabel="Yes", rejectLabel="No" }: ModalProps) {
  const modalRef = useRef(null);
  
  useEffect(() => {
    if (!modalRef.current) {
      return;
    }
    if (isOpen) {
      (modalRef.current as HTMLDialogElement).showModal();
      return
  } 
  (modalRef.current as HTMLDialogElement).close();  
  }, [isOpen]);


  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  }

    
  return (
    <>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <form method="dialog ">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm text-sm btn-circle btn-ghost absolute right-4 top-3" onClick={handleClose}>
              ✕
            </button>
          </form>
          {title && <h3 className={`text-center font-extrabold text-3xl text-txtColor-200 opacity-90 ${titleStyles}`}>
            {title}
          </h3>}
          {children}
          {(showAcceptRejectBtn || showAcceptBtn) && <div className={showAcceptBtn?`mt-4 flex justify-end py-1 px-5`:`mt-4 flex justify-between py-1 px-5`} >
                    {!showAcceptBtn && <Button className="btn bg-red-600 hover:bg-red-500 border-none px-12" onClick={onClose}>
                      <RxCross2 size={23} />
                      <p>{rejectLabel}</p>
                      </Button>}
                    <Button onClick={handleAccept} className="btn px-11 border-none">
                      <TiTick size={23} />
                      <p>{acceptLabel}</p>
                      </Button>
                  </div>}
        </div>
      </dialog>
    </>
  );
}

export default Modal;
