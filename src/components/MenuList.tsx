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
import type { MenuItem, ProductCategory } from '@/models/Menu'
import { useCart } from '@/hooks/useCart'
import { SwishButton } from './SwishButton'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import { useState } from 'react'
import React from 'react'
import { CATEGORIES } from '@/data/categories'
import { AddToTabButton } from './AddToTabButton'

const availableCategories = CATEGORIES

const allAvailableCategories = Object.keys(
  availableCategories,
) as ProductCategory[]

export function MenuList() {
  const menu = useMenu()
  const total = useCart((state) => state.total)
  const clearCart = useCart((state) => state.clear)
  const [selectedCategories, setSelectedCategories] = useState<
    ProductCategory[]
  >(allAvailableCategories)

  const handleCategorySelectionChanged = (value: ProductCategory[]) => {
    if (value.length === 0) {
      setSelectedCategories(allAvailableCategories)
      return
    }
    setSelectedCategories(value)
  }

  return (
    <ItemGroup>
      <div className="text-2xl h-16 pt-2 text-center bold">Meny</div>
      <ToggleGroup
        type="multiple"
        variant="outline"
        spacing={2}
        size="lg"
        className="self-center"
        onValueChange={handleCategorySelectionChanged}
      >
        {Object.entries(availableCategories).map(([category, label]) => (
          <ToggleGroupItem
            value={category}
            aria-label={`Toggle ${category}`}
            key={category}
            className="hover:cursor-pointer"
          >
            {label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {Object.entries(availableCategories)
        .filter(([category]) =>
          selectedCategories.includes(category as ProductCategory),
        )
        .map(([category, label]) => (
          <React.Fragment key={category}>
            <Item size="sm">
              <ItemContent>
                <ItemTitle className="text-md">{label}</ItemTitle>
              </ItemContent>
            </Item>
            {menu.items
              .filter((v) => v.category === category)
              .map((item) => (
                <MenuListItem key={item.id} {...item} />
              ))}
          </React.Fragment>
        ))}

      <div className="text-2xl h-16 pt-2 text-center">
        Totalt: <span className="bold">{total} kr</span>
      </div>
      <div className="flex flex-col gap-2">
        <SwishButton amount={total} onPaid={() => clearCart()} />
        {/* <AddToTabButton /> */}
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
