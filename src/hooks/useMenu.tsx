import type { Menu } from '@/models/Menu'

export const useMenu = (): Menu => {
  return {
    items: [
      {
        id: '0001',
        name: 'Öl',
        price: 40.0,
      },
      {
        id: '0002',
        name: 'Pizza',
        price: 100.0,
      },
      {
        id: '0003',
        name: 'Snacks',
        price: 15.0,
      },
    ],
  }
}
