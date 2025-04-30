// import React, { useState } from "react";
// import CartDrawer from "../components/CartDrawer.tsx";
// import { productData } from "../components/ProductData.tsx";
// import "./Cart.scss";
// import type { CartItem } from "../components/CartDrawer.tsx"; 


// const Cart = () => {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   // Cart state by product name
//   const [cart, setCart] = useState<{ name: string; quantity: number }[]>([
//     { name: "Steam Deck OLED 512GB", quantity: 1 },
//     { name: "Legion Go 1TB", quantity: 2 },
//   ]);

//   // Convert to full CartItem[]
//   const cartItems = cart
//   .map(({ name, quantity }) => {
//     const product = productData.find((p) => p.name === name);
//     if (!product) return null;

//     return {
//       id: name,
//       name: product.name,
//       variant: product.offer,
//       price: product.price,
//       image: product.image,
//       quantity,
//     };
//   })
//   .filter((item): item is CartItem => item !== null); 


//   // Quantity control
//   const handleQuantityChange = (id: string, change: number) => {
//     setCart((prev) =>
//       prev.map((item) =>
//         item.name === id
//           ? { ...item, quantity: Math.max(1, item.quantity + change) }
//           : item
//       )
//     );
//   };

//   // Remove item
//   const handleRemoveItem = (id: string) => {
//     setCart((prev) => prev.filter((item) => item.name !== id));
//   };

//   return (
//     <div className="cart-page">
//       <button onClick={() => setIsDrawerOpen(true)}>🛒 Open Cart</button>

//       <CartDrawer
//         isOpen={isDrawerOpen}
//         onClose={() => setIsDrawerOpen(false)}
//         cartItems={cartItems}
//         onQuantityChange={handleQuantityChange}
//         onRemoveItem={handleRemoveItem}
//       />
//     </div>
//   );
// };

// export default Cart;
