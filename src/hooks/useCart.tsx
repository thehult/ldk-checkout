import type { MenuItem, ProductNumber } from '@/models/Menu'
import { create } from 'zustand'
import { persist, type StorageValue } from 'zustand/middleware'

interface CartState {
  cart: Map<ProductNumber, number>
  menuItems: Map<ProductNumber, MenuItem>
  total: number
  addProduct: (menuItem: MenuItem) => void
  subProduct: (menuItem: MenuItem) => void
  removeProduct: (menuItem: MenuItem) => void
  clear: () => void
}

export function calculateTotal(
  cart: Map<ProductNumber, number>,
  menuItems: Map<ProductNumber, MenuItem>,
): number {
  let total = 0

  cart.forEach((quantity, productId) => {
    const menuItem = menuItems.get(productId)
    if (menuItem) {
      total += menuItem.price * quantity
    }
  })
  return total
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cart: new Map(),
      menuItems: new Map(),
      total: 0,
      addProduct: (menuItem: MenuItem) => {
        const newMenuItems = new Map(get().menuItems)
        newMenuItems.set(menuItem.id, menuItem)

        const currentQuantity = get().cart.get(menuItem.id) || 0
        const newCart = new Map(get().cart)
        newCart.set(menuItem.id, currentQuantity + 1)
        console.log(
          'Added product',
          menuItem.name,
          'New quantity:',
          currentQuantity + 1,
          'Cart:',
          newCart,
        )
        set({
          cart: newCart,
          menuItems: newMenuItems,
          total: calculateTotal(newCart, newMenuItems),
        })
      },
      subProduct: (menuItem: MenuItem) => {
        const currentQuantity = get().cart.get(menuItem.id) || 0
        const newCart = new Map(get().cart)
        if (currentQuantity > 1) {
          newCart.set(menuItem.id, currentQuantity - 1)
        } else {
          newCart.delete(menuItem.id)
        }
        set({
          cart: newCart,
          total: calculateTotal(newCart, get().menuItems),
        })
      },
      removeProduct: (menuItem: MenuItem) => {
        const newCart = new Map(get().cart)
        newCart.delete(menuItem.id)
        set({
          cart: newCart,
          total: calculateTotal(newCart, get().menuItems),
        })
      },
      clear: () =>
        set({
          cart: new Map(),
          menuItems: new Map(),
          total: 0,
        }),
    }),
    {
      name: 'cart-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name)
          if (!str) return null
          const existingValue = JSON.parse(str)
          return {
            ...existingValue,
            state: {
              ...existingValue.state,
              cart: new Map(existingValue.state.cart),
              menuItems: new Map(existingValue.state.menuItems),
            },
          }
        },
        setItem: (name, newValue: StorageValue<CartState>) => {
          // functions cannot be JSON encoded
          const str = JSON.stringify({
            ...newValue,
            state: {
              ...newValue.state,
              cart: Array.from(newValue.state.cart.entries()),
              menuItems: Array.from(newValue.state.menuItems.entries()),
            },
          })
          localStorage.setItem(name, str)
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
)
