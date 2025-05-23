import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useWishlist } from "../components/wishlistContext";
import { useCart } from "../components/CartContext";
import { useTranslation } from "react-i18next";
import "../styles/ProductDetails.scss";
import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";

const ProductDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [product, setProduct] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!name) {
        setError(t("product_details.missing_name"));
        return;
      }

      try {
        const response = await axios.get(
          `https://gaming-store-production.up.railway.app/api/device/name/${encodeURIComponent(name)}`
        );
        setProduct(response.data);
      } catch {
        setError(t("product_details.error_loading"));
      }
    };

    fetchProduct();
  }, [name, t]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (error) {
    return <div className="container py-5">{error}</div>;
  }

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      variant: product.offer,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  return (
    <div className="product-details container py-5 fade-in">
      <div className="row g-4 align-items-start">
        {/* 📸 Image Section */}
        <div className="col-lg-6 fade-in-up">
          <div className="product-image-box mb-4 position-relative">
            {product.discounted && (
              <span className="discount-badge">-{product.percent.toFixed(0)}%</span>
            )}
            {product.bestDeal && (
              <span className="best-deal-badge">{t("product_details.best_deal")}</span>
            )}
            <img src={product.image} alt={product.name} />
          </div>
        </div>

        {/* ℹ️ Info Section */}
        <div className="col-lg-6 fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="product-info-box">
            <div className="title-row mb-3">
              <h2 className="product-title mb-0">{product.name}</h2>
              <div className="product-actions">
                <span
                  className={`wishlist-icon ${wishlist.includes(product.id) ? "active" : ""}`}
                  onClick={() => toggleWishlist(product.id)}
                >
                  {wishlist.includes(product.id) ? <FaHeart /> : <FaRegHeart />}
                </span>
                <FaShareAlt className="share-icon" />
              </div>
            </div>

            <div className="price-info mb-3 text-center">
              <div className="current-price">
                <span className="sr-symbol">$</span>
                {product.price}
              </div>
              {product.discounted && product.oldPrice && (
                <div className="old-price">
                  <span className="sr-symbol">$</span>
                  {product.oldPrice}
                </div>
              )}
              <div className="offer-line">
                {t(`products.offers.${product.offerKey || "default"}`, {
                  defaultValue: product.offer,
                })}
              </div>
            </div>

            {product.available ? (
              <button className="btn add-to-cart" onClick={handleAddToCart}>
                {t("product_details.add_to_cart")}
              </button>
            ) : (
              <span className="out-of-stock-label">
                {t("product_details.out_of_stock")}
              </span>
            )}

            {product.specifications?.length > 0 && (
              <div className="product-specs mt-5">
                <h4 className="section-title mb-3">
                  {t("product_details.specifications")}
                </h4>
                <ul className="specs-list">
                  {product.specifications.map((spec: string, index: number) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
