import React, { useEffect, useId } from "react";
import { Button } from ".";
import CheckOutForm from "./CheckOutForm/CheckOutForm";

interface DrawerProps{
    children: React.ReactNode;
    drawerId?: string;
}

function Drawer({children}:DrawerProps) {
    const drawerId = useId()
    
  return (
    <div className="drawer drawer-end">
      <input id={drawerId} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {children}
        <label htmlFor={drawerId} className="drawer-button btn btn-primary">
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor={drawerId}
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-[460px] flex justify-center items-center p-4">
          {/* Sidebar content here */}
          {/* <li>
            <Button>+</Button>
            <Button>-</Button>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li> */}
          <CheckOutForm />
        </ul>
      </div>
    </div>
  );
}

export default Drawer;
