import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export interface CartItem {
  id: number;
  name: string;
  variant: string;
  price: number;
  image: string;
  quantity: number;
  discounted?: boolean;
  oldPrice?: number;
  percent?: number;
  offer?: string;          
  offerKey?: string;       
}

interface CartContextType {
  isDrawerOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  cartItems: CartItem[];
  updateQuantity: (id: number, change: number) => void;
  removeItem: (id: number) => void;
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
  cartLoaded: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartLoaded, setCartLoaded] = useState(false);

  const { t } = useTranslation(); // ✅ translation hook

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          const fixedItems: CartItem[] = parsed.map((item: any) => ({
            ...item,
            id: Number(item.id),
          }));
          setCartItems(fixedItems);
        }
      } catch (err) {
        console.error("Failed to parse cart from localStorage", err);
      }
    }
    setCartLoaded(true);
  }, []);

  useEffect(() => {
    if (cartLoaded) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, cartLoaded]);

  const openCart = () => setIsDrawerOpen(true);
  const closeCart = () => setIsDrawerOpen(false);

  const updateQuantity = (id: number, change: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.id === newItem.id && item.variant === newItem.variant
      );
      if (existingItem) {
        toast.info(t("cart_drawer.updated")); // 👈 Optional example
        return prev.map((item) =>
          item.id === newItem.id && item.variant === newItem.variant
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success(t("cart_drawer.added")); // 👈 Optional example
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        isDrawerOpen,
        openCart,
        closeCart,
        cartItems,
        cartLoaded,
        updateQuantity,
        removeItem,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
