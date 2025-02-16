import React, { useState } from 'react'
import { initiatePayment } from '../../../api/payment';
import { useNavigate } from 'react-router-dom';
import { Button, SelectPayment } from '../..';


const paymentOptions = [
    {
      img:"https://republicaimg.nagariknewscdn.com/shared/web/uploads/media/esewa_20200118185351.jpg",
      label: "Esewa",
      value:'ESEWA'
    },
    {
      img:"https://i.pinimg.com/736x/02/7e/b5/027eb52220026b111177c0f4882cb662.jpg",
      label:"Cash on Hand",
      value:"CASH"
    }
  ]

function PaymentGateway({orderId, totalPrice}:{orderId:string, totalPrice:number}) {
    const [paymentType, setPaymentType] = useState<"ESEWA"|"CASH">("CASH");
    const navigate = useNavigate()

    
    const handleSubmit = () => {
        console.log(totalPrice)
        initiatePayment(totalPrice, orderId, paymentType)
        .then(res=>{
            if (paymentType==="CASH"){
              navigate("/")
              return
          }
          if (res){
              window.location.href = res.url
            }
          })
      }
      
      return (
        <div className="flex flex-col justify-center sm:flex-none items-center" >
            <div className="flex justify-center" >
                <SelectPayment paymentOptions={paymentOptions} setPaymentType={setPaymentType} />
            </div>
            <Button onClick={handleSubmit} className="green-submit-button px-16" >Pay Now</Button>
        </div>
  
    );
}


export default PaymentGateway