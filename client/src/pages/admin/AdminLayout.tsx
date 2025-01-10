import { Outlet } from "react-router-dom";
import { SideBarItemsProps } from "../../components/SideBarItem";
import SideBar from "../../components/SideBar";
import { MdOutlineFoodBank } from "react-icons/md";
import { RiEditCircleFill } from "react-icons/ri";
import { HiOutlineLogout } from "react-icons/hi";
import { MdSpaceDashboard } from "react-icons/md";


const itemsList: SideBarItemsProps[] = [
  { name: "Dashboard", item: <MdSpaceDashboard className="sidebar-icon"  />, params:"./dashboard" },
  { name: "Orders", item: <MdOutlineFoodBank className="sidebar-icon"  />, params:"./orders" },
  { name: "Edit Menu", item: <RiEditCircleFill className="sidebar-icon" />, params:"./edit-menu" },
  { name: "LogOut", item: <HiOutlineLogout className="sidebar-icon" />, params:"./logout" },
];

function AdminLayout() {
  return (
    <>
      <SideBar itemsList={itemsList} >
        <Outlet />
      </SideBar>
    </>
  );
}

export default AdminLayout;
