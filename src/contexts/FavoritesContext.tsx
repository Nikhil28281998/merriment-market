import React, { createContext, useContext, useState, useEffect } from "react";

interface FavoritesContextType {
  liked: string[];
  favorited: string[];
  savedForLater: string[];
  toggleLike: (vendorId: string) => void;
  toggleFavorite: (vendorId: string) => void;
  toggleSaveForLater: (vendorId: string) => void;
  isLiked: (vendorId: string) => boolean;
  isFavorited: (vendorId: string) => boolean;
  isSavedForLater: (vendorId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [liked, setLiked] = useState<string[]>([]);
  const [favorited, setFavorited] = useState<string[]>([]);
  const [savedForLater, setSavedForLater] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedLiked = localStorage.getItem("eventzhubz.liked");
    const savedFavorited = localStorage.getItem("eventzhubz.favorited");
    const savedForLater = localStorage.getItem("eventzhubz.savedForLater");

    if (savedLiked) setLiked(JSON.parse(savedLiked));
    if (savedFavorited) setFavorited(JSON.parse(savedFavorited));
    if (savedForLater) setSavedForLater(JSON.parse(savedForLater));
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("eventzhubz.liked", JSON.stringify(liked));
  }, [liked]);

  useEffect(() => {
    localStorage.setItem("eventzhubz.favorited", JSON.stringify(favorited));
  }, [favorited]);

  useEffect(() => {
    localStorage.setItem("eventzhubz.savedForLater", JSON.stringify(savedForLater));
  }, [savedForLater]);

  const toggleLike = (vendorId: string) => {
    setLiked((prev) =>
      prev.includes(vendorId) ? prev.filter((id) => id !== vendorId) : [...prev, vendorId]
    );
  };

  const toggleFavorite = (vendorId: string) => {
    setFavorited((prev) =>
      prev.includes(vendorId) ? prev.filter((id) => id !== vendorId) : [...prev, vendorId]
    );
  };

  const toggleSaveForLater = (vendorId: string) => {
    setSavedForLater((prev) =>
      prev.includes(vendorId) ? prev.filter((id) => id !== vendorId) : [...prev, vendorId]
    );
  };

  const isLiked = (vendorId: string) => liked.includes(vendorId);
  const isFavorited = (vendorId: string) => favorited.includes(vendorId);
  const isSavedForLater = (vendorId: string) => savedForLater.includes(vendorId);

  return (
    <FavoritesContext.Provider
      value={{
        liked,
        favorited,
        savedForLater,
        toggleLike,
        toggleFavorite,
        toggleSaveForLater,
        isLiked,
        isFavorited,
        isSavedForLater,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
};
