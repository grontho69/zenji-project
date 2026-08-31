import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, ProductSize } from '@/data/products';

export interface CartItem {
  product: Product;
  selectedSize: ProductSize;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  
  // Modal / Drawer actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Cart operations
  addItem: (product: Product, size: ProductSize) => void;
  removeItem: (id: string, size: ProductSize) => void;
  updateQuantity: (id: string, size: ProductSize, delta: number) => void;
  clearCart: () => void;

  // Computed Selectors / Helpers
  getCartTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product: Product, size: ProductSize) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product.id === product.id && item.selectedSize === size
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            const currentItem = updated[existingIndex];
            const nextQty = currentItem.quantity + 1;
            // Respect stock count limit
            if (nextQty <= product.stockCount) {
              updated[existingIndex] = {
                ...currentItem,
                quantity: nextQty,
              };
            }
            return { items: updated, isOpen: true };
          }

          return {
            items: [...state.items, { product, selectedSize: size, quantity: 1 }],
            isOpen: true,
          };
        });
      },

      removeItem: (id: string, size: ProductSize) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product.id === id && item.selectedSize === size)
          ),
        }));
      },

      updateQuantity: (id: string, size: ProductSize, delta: number) => {
        set((state) => {
          const updated = state.items
            .map((item) => {
              if (item.product.id === id && item.selectedSize === size) {
                const newQty = item.quantity + delta;
                if (newQty <= 0) return null;
                if (newQty > item.product.stockCount) return item;
                return { ...item, quantity: newQty };
              }
              return item;
            })
            .filter((item): item is CartItem => item !== null);

          return { items: updated };
        });
      },

      clearCart: () => set({ items: [] }),

      getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'zenji-cart-storage',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      })),
      partialize: (state) => ({ items: state.items }), // Persist cart items only, not open drawer state
    }
  )
);
