import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartItem } from "./CartContext";
import "../styles/CartDrawer.scss";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onQuantityChange: (id: number, change: number) => void;
  onRemoveItem: (id: number) => void;
}

const CartDrawer = ({ isOpen, onClose, cartItems, onQuantityChange, onRemoveItem }: CartDrawerProps) => {
  const navigate = useNavigate();
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.warning("🛒 Your cart is empty!");
      return;
    }
    onClose();
    setTimeout(() => {
      navigate("/checkout");
    }, 400);
  };

  return (
    <>
      {isOpen && <div className="cart-backdrop" onClick={onClose} style={{ pointerEvents: "auto" }} />}
      <div className={`cart-drawer ${isOpen ? "open" : ""}`} style={{ pointerEvents: "auto" }}>
        <div className="cart-header">
          <h3>Cart</h3>
          <button onClick={onClose}>&times;</button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <p className="empty-message">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h5>{item.name}</h5>
                  <span>{item.variant}</span>
                  <div className="price-info">
                    {item.discounted && item.oldPrice ? (
                      <>
                        <span className="old-price"><span className="sr-symbol">$</span>{item.oldPrice.toFixed(2)}</span>
                        <span className="current-price"><span className="sr-symbol">$</span>{item.price.toFixed(2)}</span>
                        {item.percent && <span className="percent-badge">-{item.percent.toFixed(0)}%</span>}
                      </>
                    ) : (
                      <span className="current-price"><span className="sr-symbol">$</span>{item.price.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="qty">
                    <button onClick={() => onQuantityChange(item.id, -1)} disabled={item.quantity <= 1}>–</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onQuantityChange(item.id, 1)}>+</button>
                    <button className="delete" onClick={() => onRemoveItem(item.id)}>🗑</button>
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="cart-summary">
            <p>Subtotal: <span><span className="sr-symbol">$<span></span>{subtotal.toFixed(2)}</span></p>
            <p>Shipping: <span><span className="sr-symbol">$</span>0.00</span></p>
            <p>Taxes: <span><span className="sr-symbol">$</span>0.00</span></p>
            <h5>Total: <span><span className="sr-symbol">$</span>{subtotal.toFixed(2)}</span></h5>
          </div>

          <div className="cart-footer">
            <div className="discount-row">
              <input type="text" placeholder="Discount code" />
              <button className="apply-btn">Apply</button>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
    </>
  );
};

export default CartDrawer;
