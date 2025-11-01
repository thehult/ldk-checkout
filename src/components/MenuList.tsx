import { useMenu } from '@/hooks/useMenu'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from './ui/item'
import { Button } from './ui/button'
import { Minus, Plus } from 'lucide-react'
import type { MenuItem } from '@/models/Menu'
import { useCart } from '@/hooks/useCart'
import { SwishButton } from './SwishButton'

export function MenuList() {
  const menu = useMenu()
  const total = useCart((state) => state.total)

  return (
    <ItemGroup>
      {menu.items.map((item) => (
        <>
          <MenuListItem key={item.id} {...item} />
          <ItemSeparator />
        </>
      ))}
      <div className="text-2xl h-16 pt-2 text-center">
        Totalt: <span className="bold">{total} kr</span>
      </div>
      <Button className="w-full">Betala med Swish</Button>
      <SwishButton />
    </ItemGroup>
  )
}

export function MenuListItem(item: MenuItem) {
  const numberInCart = useCart((state) => state.cart.get(item.id))
  const addToCart = useCart((state) => state.addProduct)
  const subFromCart = useCart((state) => state.subProduct)

  return (
    <Item size="sm">
      <ItemContent>
        <ItemTitle className="text-xl">{item.name}</ItemTitle>
        <ItemDescription>{item.price.toFixed(2)} kr</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          variant="outline"
          size="sm"
          onClick={() => subFromCart(item)}
          disabled={!numberInCart}
        >
          <Minus />
        </Button>
        <span className="px-2 min-w-8 text-center">{numberInCart || '-'}</span>
        <Button variant="outline" size="sm" onClick={() => addToCart(item)}>
          <Plus />
        </Button>
      </ItemActions>
    </Item>
  )
}
