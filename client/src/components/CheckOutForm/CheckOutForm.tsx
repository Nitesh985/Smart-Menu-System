import styled from "styled-components";
import { DishProps } from "../user/Home/DishCard";
import { Image } from '..'
import { useEffect, useRef, useState } from "react";
import DishItem from "./DishItem";

export type OrderType = {
  table_no: string;
  tip: string;
  dishes: DishType[];
  total: number;
};

export type DishType = {
  _id: string;
  name: string;
  image: {
    url: string;
    public_id: string;
  };
  description: string;
  quantity: number;
};

const dishes = [
  {
    _id: "1",
    name: "Spaghetti Carbonara",
    image: {
      url: "https://images.pexels.com/photos/20406164/pexels-photo-20406164/free-photo-of-cloud-over-lake-bled-in-slovenia.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      public_id: "smart-menu-system/spaghetti-carbonara_v2_i8w9o2",
    },
    description:
      "Spaghetti carbonara is a classic Italian pasta dish made with whole wheat flour, egg, and tomato sauce. It is often served with a side of marinated meat or vegetables.",
    price: 12.99,
    quantity: 1,
  },
  {
    _id: "2",
    name: "Spaghetti Carbonara",
    image: {
      url: "https://images.pexels.com/photos/20406164/pexels-photo-20406164/free-photo-of-cloud-over-lake-bled-in-slovenia.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      public_id: "smart-menu-system/spaghetti-carbonara_v2_i8w9o2",
    },
    description:
      "Spaghetti carbonara is a classic Italian pasta dish made with whole wheat flour, egg, and tomato sauce. It is often served with a side of marinated meat or vegetables.",
    price: 12.99,
    quantity: 1,
  },
];

const CheckOutForm = () => {

  const [order, setOrder] = useState<OrderType>({
    table_no: "D1",
    tip: "15%",
    dishes,
    total: dishes.reduce((acc, curr) => acc + curr.price * curr.quantity, 0),
  })



  return (
    <StyledWrapper>
      <div className="master-container">
        <div className="card cart">
          <label className="title">Your cart</label>
          <div className="products">
            {order?.dishes && order?.dishes.length > 0 &&
              order?.dishes.map((dish) => (
                <DishItem setOrder={setOrder} dish={dish}  />
              ))}
          </div>
        </div>
        <div className="card coupons">
          <label className="title">Apply coupons</label>
          <form className="form">
            <input
              type="text"
              placeholder="Apply your coupons here"
              className="input_field"
            />
            <button>Apply</button>
          </form>
        </div>
        <div className="card checkout">
          <label className="title">Checkout</label>
          <div className="details">
            <span>Your cart subtotal:</span>
            <span>${order.total}</span>
            <span>Discount through applied coupons:</span>
            <span>$0.00</span>
          </div>
          <div className="checkout--footer">
            <label className="price">
              <sup>$</sup>{order.total}
            </label>
            <button className="checkout-btn">Checkout</button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .master-container {
    display: grid;
    grid-template-columns: auto;
    gap: 5px;
  }

  .card {
    width: 400px;
    background: #ffffff;
    box-shadow:
      0px 187px 75px rgba(0, 0, 0, 0.01),
      0px 105px 63px rgba(0, 0, 0, 0.05),
      0px 47px 47px rgba(0, 0, 0, 0.09),
      0px 12px 26px rgba(0, 0, 0, 0.1),
      0px 0px 0px rgba(0, 0, 0, 0.1);
  }

  .title {
    width: 100%;
    height: 40px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 20px;
    border-bottom: 1px solid #efeff3;
    font-weight: 700;
    font-size: 11px;
    color: #63656b;
  }

  /* cart */
  .cart {
    border-radius: 19px 19px 7px 7px;
  }

  .cart .products {
    display: flex;
    flex-direction: column;
    padding: 10px;
  }

  .cart .products .product {
    display: grid;
    grid-template-columns: 60px 1fr 80px 1fr;
    gap: 10px;
  }

  .cart .products .product span {
    font-size: 13px;
    font-weight: 600;
    color: #47484b;
    margin-bottom: 8px;
    display: block;
  }

  .cart .products .product p {
    font-size: 11px;
    font-weight: 600;
    color: #7a7c81;
  }

  .cart .quantity {
    height: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: auto;
    background-color: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 7px;
    filter: drop-shadow(0px 1px 0px #efefef)
      drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  }

  .cart .quantity label {
    width: 20px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 2px;
    font-size: 15px;
    font-weight: 700;
    color: #47484b;
  }

  .cart .quantity button {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    outline: none;
    background-color: transparent;
    padding-bottom: 2px;
  }

  .card .small {
    font-size: 15px;
    margin: 0 0 auto auto;
  }

  .card .small sup {
    font-size: px;
  }

  /* coupons */
  .coupons {
    border-radius: 7px;
  }

  .coupons form {
    display: grid;
    grid-template-columns: 1fr 80px;
    gap: 10px;
    padding: 10px;
  }

  .input_field {
    width: auto;
    height: 36px;
    padding: 0 0 0 12px;
    border-radius: 5px;
    outline: none;
    border: 1px solid #e5e5e5;
    filter: drop-shadow(0px 1px 0px #efefef)
      drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
  }

  .input_field:focus {
    border: 1px solid transparent;
    box-shadow: 0px 0px 0px 2px #242424;
    background-color: transparent;
  }

  .coupons form button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 18px;
    gap: 10px;
    width: 100%;
    height: 36px;
    background: linear-gradient(180deg, #4480ff 0%, #115dfc 50%, #0550ed 100%);
    box-shadow:
      0px 0.5px 0.5px #efefef,
      0px 1px 0.5px rgba(239, 239, 239, 0.5);
    border-radius: 5px;
    border: 0;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: #ffffff;
  }

  /* Checkout */
  .checkout {
    border-radius: 9px 9px 19px 19px;
  }

  .checkout .details {
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 10px;
    gap: 5px;
  }

  .checkout .details span {
    font-size: 13px;
    font-weight: 600;
  }

  .checkout .details span:nth-child(odd) {
    font-size: 11px;
    font-weight: 700;
    color: #707175;
    margin: auto auto auto 0;
  }

  .checkout .details span:nth-child(even) {
    font-size: 13px;
    font-weight: 600;
    color: #47484b;
    margin: auto 0 auto auto;
  }

  .checkout .checkout--footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px 10px 20px;
    background-color: #efeff3;
  }

  .price {
    position: relative;
    font-size: 22px;
    color: #2b2b2f;
    font-weight: 900;
  }

  .price sup {
    font-size: 13px;
  }

  .price sub {
    width: fit-content;
    position: absolute;
    font-size: 11px;
    color: #5f5d6b;
    bottom: 5px;
    display: inline-block;
  }

  .checkout .checkout-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 36px;
    background: linear-gradient(180deg, #4480ff 0%, #115dfc 50%, #0550ed 100%);
    box-shadow:
      0px 0.5px 0.5px #efefef,
      0px 1px 0.5px rgba(239, 239, 239, 0.5);
    border-radius: 7px;
    border: 0;
    outline: none;
    color: #ffffff;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
  }
`;

export default CheckOutForm;
