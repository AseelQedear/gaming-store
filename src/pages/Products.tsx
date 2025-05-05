import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useWishlist } from "../components/wishlistContext";
import { useCart } from "../components/CartContext";
import { useTranslation } from "react-i18next";
import "../styles/Products.scss";

const Products: React.FC = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [devices, setDevices] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState("default");

  const queryParams = new URLSearchParams(location.search);
  const filterQuery = queryParams.get("filter") || "all";
  const searchQuery = queryParams.get("search") || "";
  const [filterType, setFilterType] = useState(filterQuery);

  useEffect(() => {
    setFilterType(filterQuery);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filterQuery]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get("https://gaming-store-production.up.railway.app/api/device");
        setDevices(response.data);
      } catch (err) {
        setError(t("home.error_loading_products"));
      }
    };

    fetchDevices();
  }, [t]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilterType(value);
    navigate(`/products?filter=${value}`);
  };

  const filteredByType = devices.filter(
    (p) =>
      filterType === "all" ||
      p.type?.toLowerCase().trim() === filterType.toLowerCase().trim()
  );

  const normalizedSearch = searchQuery
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/lenovogo|lenovo/g, "go");

  const filtered = filteredByType.filter((p) =>
    p.name.toLowerCase().replace(/\s+/g, "").includes(normalizedSearch)
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortOption === "price-high") return b.price - a.price;
    if (sortOption === "price-low") return a.price - b.price;
    return 0;
  });

  return (
    <section className="products-page py-5 container fade-in">
      {error && <p>{error}</p>}

      <div className="filters-bar d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2 fade-slide-down">
        <select onChange={handleFilterChange} value={filterType} className="form-select">
          <option value="all">{t("products.all_devices")}</option>
          <option value="Steam Deck">{t("products.steam_deck")}</option>
          <option value="ROG Ally">{t("products.rog_ally")}</option>
          <option value="Lenovo Go">{t("products.lenovo_go")}</option>
          <option value="MSI Claw">{t("products.msi_claw")}</option>
        </select>

        <select onChange={(e) => setSortOption(e.target.value)} value={sortOption} className="form-select">
          <option value="default">{t("products.sort_default")}</option>
          <option value="price-high">{t("products.sort_price_high")}</option>
          <option value="price-low">{t("products.sort_price_low")}</option>
        </select>
      </div>

      <div className="row g-4">
        {sorted.map((product, i) => (
          <div className="col-md-3 col-sm-6 fade-in-up" key={i}>
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
