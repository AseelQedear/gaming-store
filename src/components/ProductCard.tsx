// ProductCard.tsx
import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ProductProps {
  product: {
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
  };
  isWishlistActive: boolean;
  toggleWishlist: (id: number) => void;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductProps> = ({
  product,
  isWishlistActive,
  toggleWishlist,
  onAddToCart,
}) => {
  return (
    <div
      className={`product-card-style2 p-3 h-100 shadow-sm rounded ${
        !product.available ? "sold-out" : ""
      }`}
    >
      {/* Wishlist Icon */}
      <span
        className={`wishlist-icon ${isWishlistActive ? "active" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        title="Add to Wishlist"
      >
        {isWishlistActive ? <FaHeart /> : <FaRegHeart />}
      </span>

      {product.bestDeal && <div className="best-deal-badge">⭐ Best Value</div>}
      {product.discounted && (
        <div className="discount-badge">-{product.percent.toFixed(0)}%</div>
      )}

      <div className="device-img">
        <Link to={`/product/${encodeURIComponent(product.name)}`}>
          <img src={product.image} alt={product.name} className="img-fluid" />
        </Link>
      </div>

      <h5 className="mt-3">
        <Link
          to={`/product/${encodeURIComponent(product.name)}`}
          className="text-decoration-none text-light"
        >
          {product.name}
        </Link>
      </h5>

      <div className="price-info text-end">
        <div className="current-price">${product.price}</div>
        {product.discounted && (
          <div className="old-price">${product.oldPrice}</div>
        )}
      </div>
      <p className="offer-line mt-2">{product.offer}</p>

      <div className="mt-3">
        {product.available ? (
          <button
            className="btn btn-outline-light w-100"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart();
            }}
          >
            Add to Cart
          </button>
        ) : (
          <button className="btn btn-outline-secondary w-100" disabled>
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
