import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

export interface SideBarItemsProps {
  name: string;
  item: React.ReactNode;
  params: string;
}

function SideBarItems({ item, name, params }: SideBarItemsProps) {
    

  return (
    <NavLink className={({isActive})=>isActive?"bg-slate-400 text-txtColor-300 rounded-lg h-[45px] bg-opacity-70 mt-3":"mt-3 text-txtColor-200"} to={params}>
      <li className="flex items-center space-x-3 hover:bg-slate-400 hover:bg-opacity-20 transition-all duration-300 rounded-lg w-full h-[45px] group">
        <div className="ml-2">{item}</div>
        <h1 className="sidebar-label group-hover:text-blue-800">{name}</h1>
      </li>
    </NavLink>
  );
}

export default SideBarItems;
