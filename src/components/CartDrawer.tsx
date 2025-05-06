import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartItem } from "./CartContext";
import "../styles/CartDrawer.scss";
import { useTranslation } from "react-i18next";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onQuantityChange: (id: number, change: number) => void;
  onRemoveItem: (id: number) => void;
}

const CartDrawer = ({
  isOpen,
  onClose,
  cartItems,
  onQuantityChange,
  onRemoveItem,
}: CartDrawerProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.warning(t("cart_drawer.empty_toast"));
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
          <h3>{t("cart_drawer.title")}</h3>
          <button onClick={onClose}>&times;</button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <p className="empty-message">{t("cart_drawer.empty_message")}</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h5>{item.name}</h5>
                  <span>
                    {t(`products.offers.${item.offerKey || "default"}`, {
                      defaultValue: item.variant,
                    })}
                  </span>
                  <div className="price-info">
                    {item.discounted && item.oldPrice ? (
                      <>
                        <span className="old-price">
                          <span className="sr-symbol">﷼</span>{item.oldPrice.toFixed(2)}
                        </span>
                        <span className="current-price">
                          <span className="sr-symbol">﷼</span>{item.price.toFixed(2)}
                        </span>
                        {item.percent && (
                          <span className="percent-badge">-{item.percent.toFixed(0)}%</span>
                        )}
                      </>
                    ) : (
                      <span className="current-price">
                        <span className="sr-symbol">﷼</span>{item.price.toFixed(2)}
                      </span>
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
            <p>{t("cart_drawer.subtotal")}: <span><span className="sr-symbol">﷼</span>{subtotal.toFixed(2)}</span></p>
            <p>{t("cart_drawer.shipping")}: <span><span className="sr-symbol">﷼</span>0.00</span></p>
            <p>{t("cart_drawer.taxes")}: <span><span className="sr-symbol">﷼</span>0.00</span></p>
            <h5>{t("cart_drawer.total")}: <span><span className="sr-symbol">﷼</span>{subtotal.toFixed(2)}</span></h5>
          </div>

          <div className="cart-footer">
            <div className="discount-row">
              <input type="text" placeholder={t("cart_drawer.discount_placeholder")} />
              <button className="apply-btn">{t("cart_drawer.apply")}</button>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              {t("cart_drawer.checkout")}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
    </>
  );
};

export default CartDrawer;
