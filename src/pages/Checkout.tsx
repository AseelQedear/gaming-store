
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import "../styles/Checkout.scss";
import { FaGamepad } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      const res = await fetch("http://localhost:5202/api/checkout", {
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
        <h2 className="pixel-title">Checkout</h2>

        {step === 1 && (
          <div className="step" data-aos="fade-up">
            <h5>1. Delivery details</h5>
            <div className="grid-2col">
              {Object.entries(delivery).map(([key, value]) => (
                <div key={key} className={key === "address" ? "full-width" : ""}>
                  {key === "country" ? (
                    <select value={value} onChange={(e) => setDelivery({ ...delivery, [key]: e.target.value })}>
                      <option value="">Select Country</option>
                      {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  ) : (
                    <input
                      placeholder={key.replace(/([A-Z])/g, " $1")}
                      value={value}
                      onChange={(e) => setDelivery({ ...delivery, [key]: e.target.value })}
                    />
                  )}
                  {deliveryErrors[key] && <small className="error">{deliveryErrors[key]}</small>}
                </div>
              ))}
            </div>
            <div className="button-row">
              <button onClick={handleBack}>Back</button>
              <button onClick={handleNext}>Next</button>
            </div>
          </div>
        )}

          {step === 2 && (
            <div className="step" data-aos="fade-up">
              <h5>2. Shipping</h5>
              {["Express", "Standard"].map((opt) => (
                <label key={opt} className="radio-label">
                  <input
                    type="radio"
                    checked={shippingOption === opt}
                    onChange={() => setShippingOption(opt)}
                  />
                  {opt} Shipping ${10}
                </label>
              ))}
              <div className="button-row">
                <button onClick={handleBack}>Back</button>
                <button disabled={!shippingOption} onClick={handleNext}>Next</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step" data-aos="fade-up">
              <h5>3. Payment</h5>

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
                  <small className="error">Card number must be exactly 16 digits</small>
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
                  <small className="error">Name must contain only letters and be max 30 characters</small>
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
                        ? "Expiry must be MM/YY"
                        : cardError.includes("Month must be between 01 and 12")
                        ? "Month must be between 01 and 12"
                        : "Card expiry date must be in the future"}
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
                    <small className="error">CVC must be exactly 3 digits</small>
                  )}
                </div>
              </div>

              <div className="button-row">
                <button onClick={handleBack}>Back</button>
                <button onClick={handleNext}>Continue to review</button>
              </div>
            </div>
          )}


        {step === 4 && (
          <div className="step review-step" data-aos="fade-up">
            <h5>4. Review & Confirm</h5>
            <div className="review-section">
              <h4>🚚 Delivery</h4>
              {Object.entries(delivery).map(([key, value]) => (
                <p key={key}>
                <strong>
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:
                </strong> {value}
              </p>
              
              ))}
            </div>
            <div className="review-section">
              <h4>💳 Payment</h4>
              <p><strong>Shipping Method:</strong> {shippingOption}</p>
              <p><strong>Total:</strong> <span className="highlighted-total">${total.toFixed(2)}</span></p>
            </div>
            <div className="button-row">
              <button onClick={handleBack}>Back</button>
              <button onClick={submitOrder}>Place Order</button>
            </div>
          </div>
        )}
      </div>

      <div className="checkout-summary col-md-5 p-4" data-aos="fade-left">
  <h3 className="pixel-title">Order – {cartItems.length} items</h3>
  <div className="cart-body">
    {cartItems.map((item, index) => (
      <div key={index} className="cart-item">
        <img src={item.image} alt={item.name} />
        <div className="item-details">
          <h5>{item.name}</h5>
          <span>{item.variant || "No variant"}</span>

          {/* Correct naming here */}
          <div className="price-info">
          {item.oldPrice && (
              <span className="old-price">${item.oldPrice.toFixed(2)}</span>
            )}
            <span className="current-price">${item.price.toFixed(2)}</span>
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
      <p>Subtotal: <span>${subtotal.toFixed(2)}</span></p>
      <p>Shipping: <span>${shippingCost.toFixed(2)}</span></p>
      <h5>Total: <span>${total.toFixed(2)}</span></h5>
    </div>

    <div className="cart-footer">
      <div className="discount-row">
        <input type="text" placeholder="Discount code" />
        <button className="apply-btn">Apply</button>
      </div>
    </div>
  </div>
</div>


    </div>
  );
};

export default Checkout;
