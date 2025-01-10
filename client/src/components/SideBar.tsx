import SideBarItem, { SideBarItemsProps } from "./SideBarItem";
import { FaBars } from "react-icons/fa6";

interface SideBarProps {
  children: React.ReactNode;
  itemsList: SideBarItemsProps[];
}



function SideBar({ children, itemsList }: SideBarProps) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-2"
          className="btn text-orange-500 drawer-button drawer-overlay lg:hidden m-0"
          > 
          <FaBars className="w-8 h-8" />
        </label>
          {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {/* // TODO:Check this as well after the tailwind.config.js one */}
        <ul className="flex flex-col bg-base-300 rounded-box text-base-content min-h-full w-72 p-10 space-y-3">
          {itemsList.map((item) => (
            <SideBarItem key={item.name} {...item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
