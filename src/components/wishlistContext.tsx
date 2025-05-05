import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface WishlistContextType {
  wishlist: number[];
  toggleWishlist: (deviceId: number) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchFavorites = async () => {
      const user =
        JSON.parse(localStorage.getItem("user") || "null") ||
        JSON.parse(sessionStorage.getItem("user") || "null");
      if (!user?.token) return;

      try {
        const res = await fetch("https://gaming-store-production.up.railway.app/api/favorite", {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (!res.ok) throw new Error(`Status ${res.status}`);

        const data = await res.json();
        const ids = data.map((fav: any) => fav.device.id);
        setWishlist(ids);
      } catch (err) {
        console.error(t("wishlist.fetch_error"), err);
      }
    };

    fetchFavorites();
  }, [t]);

  const toggleWishlist = async (deviceId: number) => {
    const user =
      JSON.parse(localStorage.getItem("user") || "null") ||
      JSON.parse(sessionStorage.getItem("user") || "null");
    if (!user?.token) return;

    const isFavorite = wishlist.includes(deviceId);

    setWishlist((prev) =>
      isFavorite ? prev.filter((id) => id !== deviceId) : [...prev, deviceId]
    );

    const url = `https://gaming-store-production.up.railway.app/api/favorite${isFavorite ? `/${deviceId}` : ""}`;
    const method = isFavorite ? "DELETE" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: method === "POST" ? JSON.stringify(deviceId) : null,
      });

      if (!res.ok) {
        // rollback on failure
        setWishlist((prev) =>
          !isFavorite ? prev.filter((id) => id !== deviceId) : [...prev, deviceId]
        );
        console.error(t("wishlist.toggle_failed"), res.status);
      }
    } catch (err) {
      console.error(t("wishlist.toggle_error"), err);
      setWishlist((prev) =>
        !isFavorite ? prev.filter((id) => id !== deviceId) : [...prev, deviceId]
      );
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
};
