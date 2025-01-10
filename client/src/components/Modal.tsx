import { Button } from ".";
import { useEffect, useId, useRef, useState } from "react";

interface ModalProps {
  id: string;
  isOpen?: boolean;
  buttonStyles?: string;
  buttonLabel?: string;
  children?: React.ReactNode;
}

function Modal({ id, buttonStyles, buttonLabel, children }: ModalProps) {

  useEffect(() => {
    (document.getElementById(id) as HTMLFormElement)?.showModal();
  }, []);

  return (
    <>
      <dialog id={id} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {children}
          {buttonLabel && (
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <Button className={`btn ${buttonStyles}`}>{buttonLabel}</Button>
              </form>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}

export default Modal;
