import { useState, useContext, createContext } from "react";

const Cartcontext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  return (
    <Cartcontext.Provider value={[cart, setCart]}>
      {children}
    </Cartcontext.Provider>
  );
};
// custom hook
const useCart = () => useContext(Cartcontext);

export { useCart, CartProvider };
