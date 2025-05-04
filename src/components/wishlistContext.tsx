import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface WishlistContextType {
  wishlist: number[];
  toggleWishlist: (deviceId: number) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "null") || JSON.parse(sessionStorage.getItem("user") || "null");
      if (!user?.token) return;

      try {
        const res = await fetch("https://gaming-store-production.up.railway.app/api/favorite", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        const ids = data.map((fav: any) => fav.device.id);
        setWishlist(ids);
      } catch (err) {
        console.error("Failed to fetch favorites", err);
      }
    };

    fetchFavorites();
  }, []);

  const toggleWishlist = async (deviceId: number) => {
    const user = JSON.parse(localStorage.getItem("user") || "null") || JSON.parse(sessionStorage.getItem("user") || "null");
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
       
        setWishlist((prev) =>
          !isFavorite ? prev.filter((id) => id !== deviceId) : [...prev, deviceId]
        );
        console.error("Failed to toggle favorite", res.status);
      }
    } catch (err) {
      
      console.error("Error in toggleWishlist", err);
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
