import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useWishlist } from "../components/wishlistContext";
import { useCart } from "../components/CartContext";
import { useTranslation } from "react-i18next";
import "../styles/Home.scss";

const Home: React.FC = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [devices, setDevices] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get("https://gaming-store-production.up.railway.app/api/device");
        setDevices(response.data);
      } catch (err) {
        setError(t("error_loading_products"));
      }
    };

    fetchDevices();
  }, [t]);

  const filteredProducts = devices
    .filter((product) => product.discounted && product.available)
    .sort((a, b) => b.percent - a.percent);

  const handleFilterRedirect = (type: string) => {
    navigate(`/products?filter=${encodeURIComponent(type)}`);
  };

  return (
    <div className="home-page">
      {/* 🎥 Hero Section */}
      <div className="hero-banner">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="/media/banner.mp4" type="video/mp4" />
        </video>

        <div className="hero-overlay">
          <img
            src="/media/Animated GIF.gif"
            alt="Pixel Gamer"
            className="hero-sprite d-none d-md-block"
          />
          <div className="text-zone">
            <h1 className="hero-title">{t("hero_title")}</h1>
            <p className="hero-subtitle typewriter">{t("hero_subtitle")}</p>
            <a href="/products" className="btn btn-cta mt-4">
              {t("hero_cta")}
            </a>
          </div>
        </div>
      </div>

      {/* 🕹️ Featured Devices */}
      <section className="categories-section text-center py-5">
        <h2 className="section-title mb-5" data-aos="fade-up">
          🔹 {t("explore_devices")}
        </h2>
        <div className="row gx-4 gy-4 px-4">
          {[
            { img: "/media/STEAMDECKLOGO.png", type: "Steam Deck" },
            { img: "/media/ROGALLYLOGO.png", type: "ROG Ally" },
            { img: "/media/LENOVOGOLOGO (1).png", type: "Lenovo Go" },
            { img: "/media/MSICLAWLOGO.png", type: "MSI Claw" },
          ].map((device, i) => (
            <div className="col-md-3 col-sm-6" data-aos="fade-up" key={i}>
              <div
                className="device-box h-100"
                onClick={() => handleFilterRedirect(device.type)}
                style={{ cursor: "pointer" }}
              >
                <img src={device.img} className="img-fluid rounded" alt={device.type} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" data-aos="fade-up"></div>

      {/* 🔥 Popular Deals */}
      <section className="popular-section container py-5">
        <h2 className="text-center mb-5 section-title" data-aos="fade-up">
          🔥 {t("popular_deals")}
        </h2>
        <div className="row g-4">
          {filteredProducts.slice(0, 4).map((product, i) => (
            <div className="col-md-3 col-sm-6" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
              <Link
                to={`/product/${encodeURIComponent(product.name)}`}
                className="text-decoration-none text-reset"
              >
                <ProductCard
                  product={product}
                  isWishlistActive={wishlist.includes(product.id)}
                  toggleWishlist={() => toggleWishlist(product.id)}
                  onAddToCart={() =>
                    addToCart({
                      id: product.id,
                      name: product.name,
                      variant: product.offer,
                      price: product.price,
                      image: product.image,
                      quantity: 1,
                      discounted: product.discounted,
                      oldPrice: product.oldPrice,
                      percent: product.percent,
                    })
                  }
                />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider2" data-aos="fade-up"></div>

      {/* 💡 Why Choose Us */}
      <section className="why-choose-modern py-5 text-center" data-aos="fade-up">
        <div className="container">
          <h2 className="section-title mb-4">💡 {t("why_choose_title")}</h2>
          <div className="row g-4 justify-content-center" data-aos="fade-up">
            {[
              {
                icon: "🚚",
                title: t("why_fast_delivery"),
                desc: t("why_fast_delivery_desc"),
              },
              {
                icon: "🎮",
                title: t("why_top_brands"),
                desc: t("why_top_brands_desc"),
              },
              {
                icon: "🔐",
                title: t("why_secure_payment"),
                desc: t("why_secure_payment_desc"),
              },
              {
                icon: "⭐",
                title: t("why_loved_by_gamers"),
                desc: t("why_loved_by_gamers_desc"),
              },
            ].map((item, index) => (
              <div className="col-md-3 col-sm-6" key={index}>
                <div className="reason-box">
                  <div className="circle-icon">
                    <span>{item.icon}</span>
                    <div className="badge-number">
                      {(index + 1).toString().padStart(2, "0")}
                    </div>
                  </div>
                  <h5 className="reason-title mt-3">{item.title}</h5>
                  <p className="reason-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
