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
import { useTranslation } from "react-i18next";


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
  const [userInfo, setUserInfo] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [editMode, setEditMode] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const { t } = useTranslation();

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
        const res = await axios.get("https://gaming-store-production.up.railway.app/api/user/profile", {
          headers: { Authorization: `Bearer ${user.token}` },
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
          shippingMethod: order.shippingMethod || t("profile_page.standard_shipping"),
          total: order.devices.reduce((sum: number, d: any) => sum + d.orderPrice, 0),
          orderItems: order.devices.map((d: any, i: number) => ({
            id: i,
            quantity: d.quantity,
            price: d.orderPrice,
            variant: d.variant || "",
            device: { ...d, specs: d.specifications },
          })),
        }));
        setOrders(ordersFromProfile);

        const validFavorites = (res.data.favorites || [])
        .map((f: { device?: Device; Device?: Device }) => ({
          device: f.device || f.Device
        }))
        .filter((f: { device?: Device }) => !!f.device)
                setFavorites(validFavorites);
      } catch {
        setError(t("profile_page.fetch_error"));
      }
    };

    fetchProfile();
  }, [isAuthenticated, user, navigate, t]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?:com|net|org|edu|sa)$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;

    if (!emailRegex.test(emailInput)) newErrors.email = t("profile_page.invalid_email");
    if (!phoneRegex.test(phoneInput)) newErrors.phone = t("profile_page.invalid_phone");
    if (newPassword && !passwordRegex.test(newPassword)) newErrors.newPassword = t("profile_page.weak_password");
    if (newPassword && !currentPassword) newErrors.currentPassword = t("profile_page.require_current");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      await axios.put("https://gaming-store-production.up.railway.app/api/user/profile", {
        email: emailInput,
        phone: phoneInput,
        currentPassword: currentPassword || null,
        newPassword: newPassword || null,
      }, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      setUserInfo((prev: UserInfo | null) =>
        prev ? { ...prev, email: emailInput, phone: phoneInput } : prev
      );
      
      setEditMode(false);
      toast.success(t("profile_page.update_success"));
      setErrors({});
    } catch (err: any) {
      toast.error(err?.response?.data || t("profile_page.update_failed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="profile-page py-5">
      <h1>{t("profile_page.greeting", { name: `${userInfo?.firstName} ${userInfo?.lastName}` })}</h1>

      <h2 className="section-title" data-aos="fade-up">👤 {t("profile_page.personal_info")}</h2>
      <div className="profile-info" data-aos="fade-up">
        {!editMode ? (
          <>
            <p><strong>{t("profile_page.email")}:</strong> {userInfo?.email}</p>
            <p><strong>{t("profile_page.phone")}:</strong> {userInfo?.phone}</p>
            <button onClick={() => setEditMode(true)}>{t("profile_page.edit_btn")}</button>
          </>
        ) : (
          <form onSubmit={handleProfileUpdate} noValidate>
            <label>{t("profile_page.email")}
              <input type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className={errors.email ? "is-invalid" : ""} />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </label>
            <label>{t("profile_page.phone")}
              <input type="text" value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} className={errors.phone ? "is-invalid" : ""} />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </label>
            <label>{t("profile_page.current_password")}
              <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className={errors.currentPassword ? "is-invalid" : ""} />
              {errors.currentPassword && <div className="invalid-feedback">{errors.currentPassword}</div>}
            </label>
            <label>{t("profile_page.new_password")}
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={errors.newPassword ? "is-invalid" : ""} />
              {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
            </label>
            <div className="form-actions">
              <button type="submit" disabled={isSubmitting}>{t("profile_page.save")}</button>
              <button type="button" onClick={() => setEditMode(false)}>{t("profile_page.cancel")}</button>
            </div>
          </form>
        )}
      </div>

      <section className="orders-section" data-aos="fade-up">
        <h2 className="section-title">🛒 {t("profile_page.orders")}</h2>
        {orders.length === 0 ? (
          <p className="no-data-message">{t("profile_page.no_orders")}</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-block">
                <h5>{t("profile_page.order")} #{order.id}</h5>
                <p>{t("profile_page.ordered_on")}: {new Date(order.orderDate).toLocaleDateString()}</p>
                <p>{t("profile_page.shipping")}: {order.shippingMethod}</p>
                <p>{t("profile_page.total")}: ${order.total.toFixed(2)}</p>
                <div className="order-items-row">
                {order.orderItems.map((item: OrderItem) => (
                    <div className="product-summary" key={item.id}>
                      <img src={item.device.image} alt={item.device.name} />
                      <p className="name">{item.device.name}</p>
                      <p>{t("profile_page.qty")}: {item.quantity}</p>
                      <p><span className="sr-symbol">$</span>{item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="favorites-section" data-aos="fade-up">
        <h2 className="section-title">❤️ {t("profile_page.favorites")}</h2>
        {favorites.length === 0 ? (
          <p className="no-data-message">{t("profile_page.no_favorites")}</p>
        ) : (
          <div className="favorites-list">
            {favorites.map((fav) => (
              <div className="favorite-tile" key={fav.device.id}>
                <div className="tile-header">
                  <span className={`wishlist-icon ${wishlist.includes(fav.device.id) ? "active" : ""}`} onClick={() => toggleWishlist(fav.device.id)}>♥</span>
                </div>
                <img src={fav.device.image} alt={fav.device.name} />
                <div className="info">
                  <h5>{fav.device.name}</h5>
                  <p className="variant">{fav.device.offer}</p>
                  <div className="price-line">
                    {fav.device.oldPrice && <span className="old"><span className="sr-symbol">$</span>{fav.device.oldPrice.toFixed(2)}</span>}
                    <span className="current"><span className="sr-symbol">$</span>{fav.device.price.toFixed(2)}</span>
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
                    {t("product_card.add_to_cart")}
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
