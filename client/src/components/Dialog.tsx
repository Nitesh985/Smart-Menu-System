import { useRef, useEffect } from "react";

interface ModalProps{
    title: string;
    text?: string;
    children: React.ReactNode;
    visible: boolean;
    onClose?: () => void;
}


function Modal({title, children, visible, onClose}:ModalProps) {
    const modalRef = useRef(null);
  
    useEffect(() => {
      if (!modalRef.current) {
        return;
      }
      if (visible) {
        (modalRef.current as HTMLDialogElement).showModal();
        return
    } 
    (modalRef.current as HTMLDialogElement).close();  
    }, [visible]);

  
    const handleClose = () => {
      if (onClose) {
        onClose();
      }
    }
  

  
    return (
      <>
        <dialog ref={modalRef} className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="py-4">{children}</p>
            <div className="modal-action">
              <button onClick={handleClose} className="btn">Close</button>
            </div>
          </form>
        </dialog>
      </>
    );
  }


export default Modal;