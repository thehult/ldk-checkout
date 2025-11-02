export type ProductNumber = string
export type ProductType =
  | 'food'
  | 'snack'
  | 'beer'
  | 'wine'
  | 'liquor'
  | 'soda'
  | 'dartgear'
  | 'merch'
  | 'wearable'
export type ProductCategory = 'food' | 'drink' | 'darts' | 'ldk'
export interface Menu {
  items: MenuItem[]
}

export interface MenuItem {
  id: ProductNumber
  name: string
  type: ProductType
  category: ProductCategory
  unit?: string
  price: number
}
