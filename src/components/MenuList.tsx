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
  const clearCart = useCart((state) => state.clear)

  return (
    <ItemGroup>
      <div className="text-2xl h-16 pt-2 text-center bold">Meny</div>
      {menu.items.map((item) => (
        <MenuListItem key={item.id} {...item} />
      ))}
      <div className="text-2xl h-16 pt-2 text-center">
        Totalt: <span className="bold">{total} kr</span>
      </div>
      <div className="flex flex-col gap-2">
        <SwishButton amount={total} onPaid={() => clearCart()} />
        <Button
          variant={'outline'}
          onClick={() => clearCart()}
          disabled={total === 0}
        >
          Rensa
        </Button>
      </div>
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
        {!!numberInCart && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => subFromCart(item)}
            disabled={!numberInCart}
          >
            <Minus />
          </Button>
        )}
        <span className="px-2 min-w-8 text-center">{numberInCart || ''}</span>
        <Button variant="outline" size="sm" onClick={() => addToCart(item)}>
          <Plus />
        </Button>
      </ItemActions>
      <ItemSeparator />
    </Item>
  )
}
