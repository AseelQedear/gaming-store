import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../components/AuthContext";
import { useCart } from "../components/CartContext";
import { useWishlist } from "../components/wishlistContext";
import "../styles/Profile.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface Device {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  percent: number;
  image: string;
  type: string;
  offer: string;
  available: boolean;
  bestDeal: boolean;
  discounted: boolean;
  specs: string[];
}

interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  variant: string;
  device: Device;
}

interface Order {
  id: number;
  orderDate: string;
  total: number;
  shippingMethod: string;
  orderItems: OrderItem[];
}

interface Favorite {
  device: Device;
}

const Profile: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [editMode, setEditMode] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updateMsg, setUpdateMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  useEffect(() => {
    if (!isAuthenticated || !user?.token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const token = user.token;
        const res = await axios.get("http://localhost:5202/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserInfo({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          phone: res.data.phone,
        });

        setEmailInput(res.data.email);
        setPhoneInput(res.data.phone);

        const ordersFromProfile = (res.data.orders || []).map((order: any) => ({
          id: order.id,
          orderDate: order.orderDate,
          shippingMethod: order.shippingMethod || "Standard",
          total: order.devices.reduce((sum: number, d: any) => sum + d.orderPrice, 0),
          orderItems: order.devices.map((d: any, i: number) => ({
            id: i,
            quantity: d.quantity,
            price: d.orderPrice,
            variant: d.variant || "",
            device: {
              id: d.id,
              name: d.name,
              price: d.price,
              oldPrice: d.oldPrice,
              percent: d.percent,
              image: d.image,
              type: d.type,
              offer: d.offer,
              available: d.available,
              bestDeal: d.bestDeal,
              discounted: d.discounted,
              specs: d.specifications,
            },
          })),
        }));
        setOrders(ordersFromProfile);

        const validFavorites = (res.data.favorites || [])
          .map((f: { device?: Device; Device?: Device }) => ({
            device: f.device || f.Device,
          }))
          .filter((f: { device?: Device }): f is Favorite => !!f.device);
        setFavorites(validFavorites);
      } catch (err) {
        setError("Failed to fetch profile data.");
      }
    };

    fetchProfile();
  }, [isAuthenticated, user, navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?:com|net|org|edu|sa)$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;

    if (!emailRegex.test(emailInput)) newErrors.email = "Invalid email format.";
    if (!phoneRegex.test(phoneInput)) newErrors.phone = "Phone must be 10-15 digits.";
    if (newPassword && !passwordRegex.test(newPassword)) newErrors.newPassword = "Password must be at least 8 characters, with uppercase, number, and special character.";
    if (newPassword && !currentPassword) newErrors.currentPassword = "Current password required to change password.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setUpdateMsg(null);

    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const res = await axios.put("http://localhost:5202/api/user/profile", {
        email: emailInput,
        phone: phoneInput,
        currentPassword: currentPassword || null,
        newPassword: newPassword || null,
      }, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
    
      const msg = res.data?.message || "Profile updated.";
      setUserInfo(prev => prev ? { ...prev, email: emailInput, phone: phoneInput } : prev);
      setEditMode(false);
      toast.success(msg);
      setErrors({});
    } catch (err: any) {
      toast.error(err?.response?.data || "Update failed.");
    } finally {
      setIsSubmitting(false);
    }}
    

  return (
    <div className="profile-page py-5">
      <h1>Welcome, {userInfo?.firstName} {userInfo?.lastName}</h1>

      <h2 className="section-title" data-aos="fade-up">👤 Personal Information</h2>
      <div className="profile-info" data-aos="fade-up">
        {!editMode ? (
          <>
            <p><strong>Email:</strong> {userInfo?.email}</p>
            <p><strong>Phone:</strong> {userInfo?.phone}</p>
            <button onClick={() => setEditMode(true)} style={{ backgroundColor: '#5C469C', borderRadius: '7px' }}>Edit Profile</button>
          </>
        ) : (
          <form onSubmit={handleProfileUpdate} noValidate>
            <label>Email:
              <input type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className={errors.email ? "is-invalid" : ""} />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </label>
            <label>Phone:
              <input type="text" value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} className={errors.phone ? "is-invalid" : ""} />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </label>
            <label>Current Password:
              <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className={errors.currentPassword ? "is-invalid" : ""} />
              {errors.currentPassword && <div className="invalid-feedback">{errors.currentPassword}</div>}
            </label>
            <label>New Password:
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={errors.newPassword ? "is-invalid" : ""} />
              {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
            </label>
            <div className="form-actions">
              <button type="submit" disabled={isSubmitting}>Save</button>
              <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
            </div>
            {updateMsg && <p className="update-message">{updateMsg}</p>}
          </form>
        )}
      </div>

      <section className="orders-section" data-aos="fade-up">
        <h2 className="section-title" >🛒 Orders</h2>
        {orders.length === 0 ? (
          <p className="no-data-message">No orders found.</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-block">
                <h5>Order #{order.id}</h5>
                <p>Ordered on: {new Date(order.orderDate).toLocaleDateString()}</p>
                <p>Shipping: {order.shippingMethod}</p>
                <p>Total: ${order.total.toFixed(2)}</p>
                <div className="order-items-row">
                  {order.orderItems.map((item) => (
                    <div className="product-summary" key={item.id}>
                      <img src={item.device.image} alt={item.device.name} />
                      <p className="name">{item.device.name}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="favorites-section" data-aos="fade-up">
        <h2 className="section-title">❤️ Favorite Products</h2>
        {favorites.length === 0 ? (
          <p className="no-data-message">No favorites yet.</p>
        ) : (
          <div className="favorites-list">
            {favorites.map((fav) => (
              <div className="favorite-tile" key={fav.device.id}>
                <div className="tile-header">
                  <span
                    className={`wishlist-icon ${wishlist.includes(fav.device.id) ? "active" : ""}`}
                    onClick={() => toggleWishlist(fav.device.id)}
                  >
                    ♥
                  </span>
                </div>
                <img src={fav.device.image} alt={fav.device.name} />
                <div className="info">
                  <h5>{fav.device.name}</h5>
                  <p className="variant">{fav.device.offer}</p>
                  <div className="price-line">
                    {fav.device.oldPrice && <span className="old">${fav.device.oldPrice.toFixed(2)}</span>}
                    <span className="current">${fav.device.price.toFixed(2)}</span>
                    {fav.device.percent && <span className="badge">-{fav.device.percent.toFixed(0)}%</span>}
                  </div>
                  <button
                    className="fav-btn"
                    onClick={() =>
                      addToCart({
                        id: fav.device.id,
                        name: fav.device.name,
                        variant: fav.device.offer,
                        price: fav.device.price,
                        image: fav.device.image,
                        quantity: 1,
                        discounted: fav.device.discounted,
                        oldPrice: fav.device.oldPrice,
                        percent: fav.device.percent,
                      })
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
