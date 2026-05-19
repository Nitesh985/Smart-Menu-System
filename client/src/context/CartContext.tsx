import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<null | {
  cartItems: CartProps[];
  setCartItems: React.Dispatch<React.SetStateAction<CartProps[]>>;
  hasActiveOrder: boolean;
  setHasActiveOrder: React.Dispatch<React.SetStateAction<boolean>>;
  getCartTotal: () => string;
  getNoOfItems: () => number;
  getDishQuantity: (itemId: string) => number;
  addToCart: (item: CartProps) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  editCartItem: ({ _id, ...updates }: { _id: string }) => void;
}>(null);

interface CartProps {
  _id: string;
  price: number;
  name: string;
  image: {
    url: string;
    public_id: string;
  };
  quantity: number;
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartProps[]>(() => {
    return JSON.parse(localStorage.getItem("CART") || "[]");
  });

  // Track if there is an active order waiting for delivery
  const [hasActiveOrder, setHasActiveOrder] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem("HAS_ACTIVE_ORDER") || "false");
  });

  const getCartTotal = () => {
    const total = cartItems?.reduce((total, cart) => total + cart.price * cart.quantity, 0);
    return total.toFixed(2);
  };

  const getNoOfItems = () => {
    return cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;
  };

  const editCartItem = ({ _id, ...updates }: { _id: string }) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item._id === _id) {
          return { ...item, ...updates };
        }
        return item;
      })
    );
  };

  const getDishQuantity = (itemId: string) => {
    const item = cartItems.find((item) => item._id === itemId);
    return item?.quantity ? item.quantity : 0;
  };

  const addToCart = (item: CartProps) => {
    // Avoid duplicates if item already exists
    setCartItems((prevItems) => {
      const exists = prevItems.find((i) => i._id === item._id);
      if (exists) return prevItems;
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Sync cart items to localStorage
  useEffect(() => {
    localStorage.setItem("CART", JSON.stringify(cartItems));
  }, [cartItems]);

  // Sync active order status to localStorage
  useEffect(() => {
    localStorage.setItem("HAS_ACTIVE_ORDER", JSON.stringify(hasActiveOrder));
  }, [hasActiveOrder]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        hasActiveOrder,
        setHasActiveOrder,
        getCartTotal,
        getNoOfItems,
        getDishQuantity,
        addToCart,
        removeFromCart,
        clearCart,
        editCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}