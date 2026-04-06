import { createContext, useContext, useState, ReactNode } from "react";
import { Vendor, VendorPackage } from "@/data/mockData";

export interface CartItem {
  vendor: Vendor;
  package: VendorPackage;
}

interface CartContextType {
  items: CartItem[];
  addItem: (vendor: Vendor, pkg: VendorPackage) => void;
  removeItem: (vendorId: string, packageId: string) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (vendor: Vendor, pkg: VendorPackage) => {
    setItems(prev => {
      const exists = prev.some(i => i.vendor.id === vendor.id && i.package.id === pkg.id);
      if (exists) return prev;
      return [...prev, { vendor, package: pkg }];
    });
  };

  const removeItem = (vendorId: string, packageId: string) => {
    setItems(prev => prev.filter(i => !(i.vendor.id === vendorId && i.package.id === packageId)));
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, itemCount: items.length }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
