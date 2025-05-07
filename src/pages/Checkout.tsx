
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

  const { t } = useTranslation();

const onQuantityChange = (id: number, delta: number) => {
  updateQuantity(id, delta);
};

const onRemoveItem = (id: number) => {
  removeItem(id);
};

  useEffect(() => {
    if (cartLoaded && cartItems.length === 0 && !checkingAuth) {
      navigate("/");
    }
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
          phone: profile.phone
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


  if (checkingAuth) return <div className="loading-spinner">Loading...</div>;

  const validateDelivery = () => {
    const errors: { [key: string]: string } = {};
    if (!/^[A-Za-z\s]+$/.test(delivery.firstName)) errors.firstName = "First name should contain only letters";
    if (!/^[A-Za-z\s]+$/.test(delivery.lastName)) errors.lastName = "Last name should contain only letters";
    if (!delivery.address) errors.address = "Address is required";
    if (!delivery.city) errors.city = "City is required";
    if (!delivery.country) errors.country = "Select a country";
    if (!/^\d{5}$/.test(delivery.postalCode)) errors.postalCode = "Postal code must be 5 digits";
    if (!/^\d{10,15}$/.test(delivery.phone)) errors.phone = "Phone number must be 10 to 15 digits";
    setDeliveryErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateCard = () => {
    const errors: string[] = [];
  
    const cleanNumber = cardNumber.replace(/\s/g, "");
    if (!cleanNumber || cleanNumber.length !== 16 || !/^\d+$/.test(cleanNumber)) {
      errors.push("Invalid card number");
    }
  
    if (!name || !/^[a-zA-Z\s]+$/.test(name) || name.length > 30) {
      errors.push("Invalid name");
    }
  
    if (!expiry || !/^\d{2}\/\d{2}$/.test(expiry)) {
      errors.push("Invalid expiry");
    } else {
      const [monthStr, yearStr] = expiry.split("/");
      const month = parseInt(monthStr, 10);
      const year = parseInt(`20${yearStr}`, 10);
      const now = new Date();
      const expiryDate = new Date(year, month);
  
      if (month < 1 || month > 12) {
        errors.push("Month must be between 01 and 12");
      } else if (expiryDate <= now) {
        errors.push("Card expiry must be in the future");
      }
    }
  
    if (!cvc || cvc.length !== 3) {
      errors.push("Invalid CVC");
    }
  
    setCardError(errors);
    return errors.length === 0;
  };
  

  const handleNext = () => {
    if (step === 1 && !validateDelivery()) return;
    if (step === 2 && !shippingOption) {
      toast.warning("Select a shipping method.");
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
        variant: item.variant || ""
      })),
    };
  
    try {
      const res = await fetch("https://gaming-store-production.up.railway.app/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) throw new Error("Failed");
      toast.success("Order placed successfully!");
      clearCart();
      localStorage.removeItem("cart");
      setTimeout(() => navigate("/"), 2000);
      setShowToast(true);
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Checkout failed.");
    }
  };
  

  return (
    
    <div className="checkout-page d-flex flex-wrap">

<div className="back-home-icon" onClick={() => navigate("/")}>
    <FaGamepad size={40} />
  </div>

      <div className="checkout-form col-md-7 p-4">
      <h2 className="pixel-title">{t("checkout_page.title")}</h2>

        {step === 1 && (
          <div className="step" data-aos="fade-up">
            <h5>{t("checkout_page.step1_title")}</h5>
            <div className="grid-2col">
              {Object.entries(delivery).map(([key, value]) => (
                <div key={key} className={key === "address" ? "full-width" : ""}>
                  {key === "country" ? (
                    <select value={value} onChange={(e) => setDelivery({ ...delivery, [key]: e.target.value })}>
                      <option value="">{t("checkout_page.select_country")}</option>
                      {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  ) : (
                    <input
                      placeholder={t(`checkout_page.${key}`)}
                      value={value}
                      onChange={(e) => setDelivery({ ...delivery, [key]: e.target.value })}
                    />
                  )}
                  {deliveryErrors[key] && <small className="error">{t(`checkout_page.delivery_errors.${key}`)}</small>}
                </div>
              ))}
            </div>
            <div className="button-row">
              <button onClick={handleBack}>{t("checkout_page.back")}</button>
              <button onClick={handleNext}>{t("checkout_page.next")}</button>
            </div>

          </div>
        )}

          {step === 2 && (
            <div className="step" data-aos="fade-up">
              <h5>{t("checkout_page.step2_title")}</h5>
              {["Express", "Standard"].map((opt) => (
                <label key={opt} className="radio-label">
                  <input
                    type="radio"
                    checked={shippingOption === opt}
                    onChange={() => setShippingOption(opt)}
                  />
                   {t(`checkout_page.${opt.toLowerCase()}_shipping`)} <span className="sr-symbol">$</span>{10}
                </label>
              ))}
              <div className="button-row">
                <button onClick={handleBack}>{t("checkout_page.back")}</button>
                <button disabled={!shippingOption} onClick={handleNext}>
                  {t("checkout_page.next")}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step" data-aos="fade-up">
              <h5>{t("checkout_page.step3_title")}</h5>

              {/* Card Preview */}
              <Cards
                number={cardNumber}
                name={name}
                expiry={expiry.replace("/", "")}
                cvc={cvc}
                focused={focus}
              />

              {/* Card Number */}
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Card number"
                  value={cardNumber}
                  maxLength={19}
                  onChange={(e) => {
                    let input = e.target.value.replace(/\D/g, "");
                    if (input.length > 16) input = input.slice(0, 16);
                    const formatted = input.replace(/(.{4})/g, "$1 ").trim();
                    setCardNumber(formatted);
                  }}
                  onFocus={() => setFocus("number")}
                />
                {cardError.includes("Invalid card number") && (
                  <small className="error">{t("checkout_page.card_errors.invalid_card_number")}</small>
                )}

              </div>

              {/* Name */}
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Name on Card"
                  value={name}
                  maxLength={30}
                  onChange={(e) => setName(e.target.value.replace(/[^A-Za-z\s]/g, ""))}
                  onFocus={() => setFocus("name")}
                />
                {cardError.includes("Invalid name") && (
                  <small className="error">{t("checkout_page.card_errors.invalid_name")}</small>
                )}

              </div>

              {/* Expiry and CVC */}
              <div className="grid-2col">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    maxLength={5}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, "");
                      if (val.length > 4) val = val.slice(0, 4);
                      if (val.length >= 3) val = `${val.slice(0,2)}/${val.slice(2)}`;
                      setExpiry(val);
                    }}
                    onFocus={() => setFocus("expiry")}
                  />
                  {(cardError.includes("Invalid expiry") || cardError.includes("Month must be between 01 and 12") || cardError.includes("Card expiry must be in the future")) && (
                    <small className="error">
                      {cardError.includes("Invalid expiry")
                        ? t("checkout_page.card_errors.invalid_expiry")
                        : cardError.includes("Month must be between 01 and 12")
                        ? t("checkout_page.card_errors.invalid_month")
                        : t("checkout_page.card_errors.expired")}
                    </small>
                  )}
                </div>

                <div className="input-group">
                  <input
                    type="text"
                    placeholder="CVC"
                    value={cvc}
                    maxLength={3}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))}
                    onFocus={() => setFocus("cvc")}
                  />
                 {cardError.includes("Invalid CVC") && (
                    <small className="error">{t("checkout_page.card_errors.invalid_cvc")}</small>
                  )}

                </div>
              </div>

              <div className="button-row">
                <button onClick={handleBack}>{t("checkout_page.back")}</button>
                <button onClick={handleNext}>{t("checkout_page.continue_review")}</button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="step review-step" data-aos="fade-up">
              <h5>{t("checkout_page.step4_title")}</h5>

              {/* Delivery Section */}
              <div className="review-section">
                <h4>{t("checkout_page.delivery_details")}</h4>
                <ul className="delivery-info">
                  {Object.entries(delivery).map(([key, value]) => (
                    <li key={key}>
                      <strong>{t(`review_labels.${key}`)}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Payment Section */}
              <div className="review-section">
                <h4>{t("checkout_page.payment_details")}</h4>
                <ul className="payment-info">
                  <li>
                    <strong>{t("review_labels.shippingMethod")}:</strong>{" "}
                    {t(`checkout_page.${shippingOption.toLowerCase()}_shipping`)}
                  </li>
                  <li>
                    <strong>{t("review_labels.total")}:</strong>{" "}
                    <span className="highlighted-total">
                      <span className="sr-symbol">$</span>
                      {total.toFixed(2)}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="button-row">
                <button onClick={handleBack}>{t("checkout_page.back")}</button>
                <button onClick={submitOrder}>{t("checkout_page.place_order")}</button>
              </div>
            </div>
)}

          
      </div>

      <div className="checkout-summary col-md-5 p-4" data-aos="fade-left">
      <h3 className="pixel-title">
        {t("checkout_page.order_summary", { count: cartItems.length })}
      </h3>

      <div className="cart-body">
  {cartItems.map((item, index) => (
    <div key={index} className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="item-details">
        <h5>{item.name}</h5>

        {/* Translated Offer Line */}
        <span>
          {item.offerKey
            ? t(`products.offers.${item.offerKey}`, {
                defaultValue: item.offer || t("checkout_page.no_variant"),
              })
            : item.offer || t("checkout_page.no_variant")}
        </span>

        {/* Price Information */}
        <div className="price-info">
          {item.oldPrice && (
            <span className="old-price">
              <span className="sr-symbol">$</span>
              {item.oldPrice.toFixed(2)}
            </span>
          )}
          <span className="current-price">
            <span className="sr-symbol">$</span>
            {item.price.toFixed(2)}
          </span>
          {item.percent && (
            <span className="percent-badge">-{item.percent.toFixed(0)}%</span>
          )}
        </div>

        {/* Quantity Controls */}
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
        <p>{t("checkout_page.subtotal")}: <span><span className="sr-symbol">$</span>{subtotal.toFixed(2)}</span></p>
        <p>{t("checkout_page.shipping")}: <span><span className="sr-symbol">$</span>{shippingCost.toFixed(2)}</span></p>
        <h5>{t("checkout_page.total")}: <span><span className="sr-symbol">$</span>{total.toFixed(2)}</span></h5>
      </div>

      <div className="cart-footer">
        <div className="discount-row">
        <input type="text" placeholder={t("checkout_page.discount_placeholder")} />
        <button className="apply-btn">{t("checkout_page.apply_discount")}</button>
        </div>
      </div>
    </div>
  </div>


      </div>
    );
  };

export default Checkout;
