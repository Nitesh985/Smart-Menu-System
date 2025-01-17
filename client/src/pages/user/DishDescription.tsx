import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getDishById } from "../../api/dish";
import { Loading } from "../../components";

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
  const { dishId } = useParams();
  const [dish, setDish] = useState<DishType | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (dishId) {
      setLoading(true);
      getDishById(dishId)
        .then((res) => setDish(res.data))
        .finally(() => setLoading(false));
    }
  }, [dishId]);

  if (loading) return <Loading />;

  if (!dish) return <p>Dish not found.</p>;

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <CardWrapper>
      
      <DishContainer>
        <DishImage src={dish.image.url} alt={dish.name} />
        <DishDetails>
          <DishTitle>
            <Emoji>🍜</Emoji>
            {dish.name}
          </DishTitle>
          <DishPrice>8.95 £</DishPrice>
        </DishDetails>
        <DishDescription>{dish.description}</DishDescription>
        <ActionBar>
          <QuantityControl>
            <Button onClick={handleDecrease}>-</Button>
            <Quantity>{quantity}</Quantity>
            <Button onClick={handleIncrease}>+</Button>
          </QuantityControl>
        </ActionBar>
      </DishContainer>
  
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  color: white; 
  font-family: Arial, sans-serif;
  height: 90vh; /* Make the wrapper fill the full viewport height */
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
