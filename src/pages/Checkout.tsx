import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import "../styles/Checkout.scss";
import { FaGamepad } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const countries = ["Saudi Arabia", "United States", "Canada", "Germany", "France", "Japan"];

const Checkout: React.FC = () => {
  const { cartItems, updateQuantity, removeItem, clearCart, cartLoaded } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [step, setStep] = useState(1);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  const [delivery, setDelivery] = useState({
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    city: "",
    country: "",
    phone: "",
  });
  const [deliveryErrors, setDeliveryErrors] = useState<{ [key: string]: string }>({});
  const [shippingOption, setShippingOption] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState<"number" | "name" | "expiry" | "cvc" | undefined>(undefined);
  const [cardError, setCardError] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = shippingOption ? 10 : 0;
  const total = subtotal + shippingCost;

  const onQuantityChange = (id: number, delta: number) => updateQuantity(id, delta);
  const onRemoveItem = (id: number) => removeItem(id);

  useEffect(() => {
    if (cartLoaded && cartItems.length === 0 && !checkingAuth) navigate("/");
  }, [cartItems, checkingAuth, cartLoaded, navigate]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      const token = user?.token;

      if (!token) {
        navigate("/login");
        return;
      }

      const decoded = JSON.parse(atob(token.split(".")[1]));
      const exp = decoded.exp * 1000;

      if (Date.now() >= exp) {
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
        navigate("/login");
        return;
      }

      const fetchProfile = async () => {
        try {
          const res = await fetch("https://gaming-store-production.up.railway.app/api/user/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) throw new Error("Failed to fetch user profile");

          const profile = await res.json();
          setUserProfile(profile);
          setDelivery({
            firstName: profile.firstName,
            lastName: profile.lastName,
            address: "",
            postalCode: "",
            city: "",
            country: profile.country || "",
            phone: profile.phone,
          });
        } catch (err) {
          console.error("Profile fetch error:", err);
          navigate("/login");
        } finally {
          setCheckingAuth(false);
        }
      };

      fetchProfile();
    } catch (e) {
      console.error("Invalid token or JSON:", e);
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);

  if (checkingAuth) return <div className="loading-spinner">{t("checkout_page.loading")}</div>;

  const validateDelivery = () => {
    const errors: { [key: string]: string } = {};
    if (!/^[A-Za-z\s]+$/.test(delivery.firstName)) errors.firstName = t("checkout_page.errors.first_name");
    if (!/^[A-Za-z\s]+$/.test(delivery.lastName)) errors.lastName = t("checkout_page.errors.last_name");
    if (!delivery.address) errors.address = t("checkout_page.errors.address");
    if (!delivery.city) errors.city = t("checkout_page.errors.city");
    if (!delivery.country) errors.country = t("checkout_page.errors.country");
    if (!/^\d{5}$/.test(delivery.postalCode)) errors.postalCode = t("checkout_page.errors.postal_code");
    if (!/^\d{10,15}$/.test(delivery.phone)) errors.phone = t("checkout_page.errors.phone");

    setDeliveryErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateCard = () => {
    const errors: string[] = [];
    const cleanNumber = cardNumber.replace(/\s/g, "");
    if (!cleanNumber || cleanNumber.length !== 16 || !/^\d+$/.test(cleanNumber)) errors.push("Invalid card number");
    if (!name || !/^[a-zA-Z\s]+$/.test(name) || name.length > 30) errors.push("Invalid name");
    if (!expiry || !/^\d{2}\/\d{2}$/.test(expiry)) errors.push("Invalid expiry");
    else {
      const [monthStr, yearStr] = expiry.split("/");
      const month = parseInt(monthStr, 10);
      const year = parseInt(`20${yearStr}`, 10);
      const now = new Date();
      const expiryDate = new Date(year, month);
      if (month < 1 || month > 12) errors.push("Month must be between 01 and 12");
      else if (expiryDate <= now) errors.push("Card expiry must be in the future");
    }
    if (!cvc || cvc.length !== 3) errors.push("Invalid CVC");
    setCardError(errors);
    return errors.length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !validateDelivery()) return;
    if (step === 2 && !shippingOption) {
      toast.warning(t("checkout_page.select_shipping"));
      return;
    }
    if (step === 3 && !validateCard()) return;
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const submitOrder = async () => {
    const token = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "null")?.token;
    const payload = {
      shippingMethod: shippingOption,
      total,
      items: cartItems.map((item) => ({
        deviceId: Number(item.id) || 0,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        variant: item.variant || "",
      })),
    };

    try {
      const res = await fetch("https://gaming-store-production.up.railway.app/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed");
      toast.success(t("checkout_page.success"));
      clearCart();
      localStorage.removeItem("cart");
      setTimeout(() => navigate("/"), 2000);
      setShowToast(true);
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error(t("checkout_page.failed"));
    }
  };
  

  return (
    
    <div className="checkout-summary col-md-5 p-4" data-aos="fade-left">
  <h3 className="pixel-title">{t("checkout_page.order_summary", { count: cartItems.length })}</h3>
  <div className="cart-body">
    {cartItems.map((item, index) => (
      <div key={index} className="cart-item">
        <img src={item.image} alt={item.name} />
        <div className="item-details">
          <h5>{item.name}</h5>
          <span>{item.variant || t("checkout_page.no_variant")}</span>

          <div className="price-info">
            {item.oldPrice && (
              <span className="old-price">
                <span className="sr-symbol">{t("currency_symbol")}</span>{item.oldPrice.toFixed(2)}
              </span>
            )}
            <span className="current-price">
              <span className="sr-symbol">{t("currency_symbol")}</span>{item.price.toFixed(2)}
            </span>
            {item.percent && (
              <span className="percent-badge">-{item.percent.toFixed(0)}%</span>
            )}
          </div>

          <div className="qty">
            <button onClick={() => onQuantityChange(item.id, -1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => onQuantityChange(item.id, 1)}>+</button>
            <button className="delete" onClick={() => onRemoveItem(item.id)}>🗑</button>
          </div>
        </div>
      </div>
    ))}

    <div className="cart-summary">
      <p>{t("checkout_page.subtotal")}: <span><span className="sr-symbol">{t("currency_symbol")}</span>{subtotal.toFixed(2)}</span></p>
      <p>{t("checkout_page.shipping")}: <span><span className="sr-symbol">{t("currency_symbol")}</span>{shippingCost.toFixed(2)}</span></p>
      <h5>{t("checkout_page.total")}: <span><span className="sr-symbol">{t("currency_symbol")}</span>{total.toFixed(2)}</span></h5>
    </div>

    <div className="cart-footer">
      <div className="discount-row">
        <input type="text" placeholder={t("checkout_page.discount_placeholder")} />
        <button className="apply-btn">{t("checkout_page.apply_discount")}</button>
      </div>
    </div>
  </div>
</div>

  );
};

export default Checkout;
