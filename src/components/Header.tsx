import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from './ui/navigation-menu'
import { Link } from '@tanstack/react-router'
import { useIsMobile } from '@/hooks/use-mobile'

export default function Header() {
  const isMobile = useIsMobile()

  return (
    <>
      <header className="flex h-20 shrink-0 items-center gap-2 border-b px-4 bg-primary">
        {/* <h1 className="bold">Linköping Dartklubb</h1>
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        /> */}
        <div className="flex flex-1 justify-center">
          <NavigationMenu viewport={isMobile}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink>
                  <Link to="/">Meny</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              {/* <NavigationMenuItem>
                <NavigationMenuLink>
                  <Link to="/tabs">Notor</Link>
                </NavigationMenuLink>
              </NavigationMenuItem> */}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>
    </>
  )
}
