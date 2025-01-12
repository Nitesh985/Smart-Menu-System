import { useState } from "react";

interface ConfirmBoxProps{
    text:string;
    fn: ()=>void;
    boxId: string;
}


function ConfirmBox({text, fn}:ConfirmBoxProps) {
    const [showBox, setShowBox] = useState(true)

    const handleAccept = () => {
        fn()
        setShowBox(false)
    }

    const handleDeny = () => {
        setShowBox(false) 
    }
  
    return (
    <div role="alert" className={`alert ${showBox?"block":"hidden"}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-info h-6 w-6 shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>{text}</span>
      <div>
        <button className="btn btn-sm" onClick={handleDeny} >Deny</button>
        <button className="btn btn-sm btn-primary" onClick={handleAccept} >Accept</button>
      </div>
    </div>
  );
}

export default ConfirmBox;
