import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getDishById } from "../../api/dish";
import { Loading } from "../../components";
import useCartContext from "../../context/CartContext";

type DishType = {
  _id: string;
  name: string;
  image: {
    url: string;
    public_id: string;
  };
  description: string;
  quantity: number;
};

function DishDescriptionPage() {
  
  const { addToCart, editCartItem, getDishQuantity } = useCartContext();
  const [dish, setDish] = useState<DishType | null>(null);
   const [quantity, setQuantity] = useState<number>(getDishQuantity(dish?._id) || 0);
   const { dishId } = useParams();
   const [loading, setLoading] = useState(true);
   
    const handleCartAdd = () => {
      setQuantity(1);
      const {_id, name, image, price} = dish
      addToCart({ _id, name, image, price, quantity: 1 });
    };
    
    const addQuantity = () => {
      setQuantity((prevQuantity) => prevQuantity + 1);
    };
  
    const subQuantity = () => {
      setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
    };
    
    useEffect(() => {
      editCartItem({ _id:dish?._id, quantity });
    }, [quantity]);
    
    
    
    useEffect(() => {
      if (dishId) {
        setLoading(true);
        getDishById(dishId)
        .then((res) => setDish(res.data))
        .finally(() => setLoading(false));
    }
  }, [dishId]);
  
  if (loading) return <Loading />;


 
  return (
    <div onSubmit={handleCartAdd}>
      <CardWrapper>
      
        <DishContainer>
          <DishImage src={dish.image.url} alt={dish.name} />
          <DishDetails>
            <DishTitle>
              <Emoji>🍜</Emoji>
              {dish.name}
            </DishTitle>
            <DishPrice>${dish.price}</DishPrice>
          </DishDetails>
          <DishDescription className="h-screen" >{dish.description}</DishDescription>
          <ActionBar>
            {quantity?(<QuantityControl>
              <Button className="red-reject-button" onClick={subQuantity}>-</Button>
              <Quantity>{quantity}</Quantity>
              <Button className="green-submit-button" onClick={addQuantity}>+</Button>
            </QuantityControl>):
            <button
            onClick={handleCartAdd}
            className="mt-4 rounded-md bg-blue-600 p-2 text-white hover:bg-blue-500"
            // "transition-transform transform duration-300 ease-in-out group-hover:transform group-hover:translate-y-10 "
          >
            Order Now
          </button>}
          </ActionBar>
        </DishContainer>
      </CardWrapper>
    </div>
  );
}

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  color: white; 
  font-family: Arial, sans-serif;
  height: 100vh; /* Make the wrapper fill the full viewport height */
  width: 100%;
  overflow: hidden; /* Prevent unnecessary scrolling */
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: white;
  padding: 10px 20px;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const MenuIcon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
`;

const DishContainer = styled.div`
  background-color: white;
  color: black;
  width: 95%;
  max-width: 500px;
  border-radius: 15px;
  overflow: hidden;
  margin-top: 20px;
  margin-bottom:30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  flex: 1; /* Ensure this element takes up available space */
  display: flex;
  flex-direction: column; /* Stack children vertically */
`;

const DishImage = styled.img`
  width: 100%;
  height: auto;
`;

const DishDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

const DishTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
`;

const Emoji = styled.span`
  margin-right: 5px;
`;

const DishPrice = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const DishDescription = styled.div`
  padding: 10px;
  font-size: 0.9rem;
  color: #555;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  background-color:black;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const Quantity = styled.div`
  margin: 0 10px;
  font-size: 1rem;
`;


const OrderStatus = styled.div`
  font-size: 1rem;
`;

export default DishDescriptionPage;
