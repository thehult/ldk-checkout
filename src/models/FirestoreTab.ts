import type { MenuItem, ProductNumber } from './Menu'

export interface FirestoreTab {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date

  cart: Map<ProductNumber, number>
  menuItems: Map<ProductNumber, MenuItem>
}
