import type { MenuItem, ProductNumber } from '@/models/Menu'
import { create } from 'zustand'

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

export const useCart = create<CartState>()((set) => ({
  cart: new Map(),
  menuItems: new Map(),
  total: 0,
  addProduct: (menuItem: MenuItem) =>
    set((state) => {
      const newMenuItems = new Map(state.menuItems)
      newMenuItems.set(menuItem.id, menuItem)

      const currentQuantity = state.cart.get(menuItem.id) || 0
      const newCart = new Map(state.cart)
      newCart.set(menuItem.id, currentQuantity + 1)

      return {
        cart: newCart,
        menuItems: newMenuItems,
        total: calculateTotal(newCart, newMenuItems),
      }
    }),
  subProduct: (menuItem: MenuItem) =>
    set((state) => {
      const currentQuantity = state.cart.get(menuItem.id) || 0
      const newCart = new Map(state.cart)
      if (currentQuantity > 1) {
        newCart.set(menuItem.id, currentQuantity - 1)
      } else {
        newCart.delete(menuItem.id)
      }
      return { cart: newCart, total: calculateTotal(newCart, state.menuItems) }
    }),
  removeProduct: (menuItem: MenuItem) =>
    set((state) => {
      const newCart = new Map(state.cart)
      newCart.delete(menuItem.id)
      return { cart: newCart, total: calculateTotal(newCart, state.menuItems) }
    }),
  clear: () =>
    set(() => ({
      cart: new Map(),
      menuItems: new Map(),
      total: 0,
    })),
}))
