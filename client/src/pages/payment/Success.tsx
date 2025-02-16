import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {base64Decode} from "esewajs"
import axios from "axios";
import { Modal } from "../../components";
const Success = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  // Create a new URLSearchParams object using the search string from location
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("data");
  // Decode the JWT without verifying the signature
  const decoded = base64Decode(token);
  const verifyPaymentAndUpdateStatus = async () => {
    try {
      const response = await axios.post(
        "/api/v1/payment/payment-status",
        {
          orderId: decoded.transaction_uuid,
        }
      );
      if (response.status === 200) {
        setIsSuccess(true);
      }
    } finally {
      setIsModalOpen(true)
      setIsLoading(false);
    }
  };
  useEffect(() => {
    verifyPaymentAndUpdateStatus();
  }, []);
  if (isLoading) return <>Loading...</>;
  
  return (
    <div>
      <Modal isOpen={isModalOpen} title="Successful!" titleStyles="text-lg" showAcceptBtn={true} onClose={()=>{
        setIsModalOpen(false)
        navigate("/")
        }}
         handleAccept={()=>{
          setIsModalOpen(false)
          navigate("/")
          }}
          acceptLabel="Okay"
          >
        <p className="mt-4" >Thank you for your payment. Your transaction was successful.</p>
      </Modal>
    </div>
  );
};
export default Success;
