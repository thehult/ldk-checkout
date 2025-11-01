export type ProductNumber = string

export interface Menu {
  items: MenuItem[]
}

export interface MenuItem {
  id: ProductNumber
  name: string
  price: number
}
