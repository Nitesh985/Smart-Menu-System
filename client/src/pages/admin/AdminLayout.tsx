import { Outlet } from "react-router-dom";
import { SideBarItemsProps } from "../../components/SideBarItem";
import SideBar from "../../components/SideBar";
import { MdOutlineFoodBank, MdQrCodeScanner, MdRateReview } from "react-icons/md";
import { RiEditCircleFill } from "react-icons/ri";
import { HiOutlineLogout } from "react-icons/hi";
import { MdSpaceDashboard } from "react-icons/md";
import { useEffect } from "react";
import { TbToolsKitchen3 } from "react-icons/tb";
import { FaKitchenSet } from "react-icons/fa6";


const itemsList: SideBarItemsProps[] = [
  {name: "Kitchen", item: <FaKitchenSet   className="sidebar-icon" />, params:"./kitchen" },
  { name: "Orders", item: <MdOutlineFoodBank className="sidebar-icon"  />, params:"./orders" },
  { name: "Edit Menu", item: <RiEditCircleFill className="sidebar-icon" />, params:"./edit-menu" },
  { name: "QR Codes", item: <MdQrCodeScanner  className="sidebar-icon"  />, params:"./qr-codes" },
  { name: "Feedbacks", item: <MdRateReview className="sidebar-icon" />, params:"./feedbacks" },
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
