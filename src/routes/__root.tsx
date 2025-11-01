import { Outlet, createRootRoute } from '@tanstack/react-router'
import Header from '../components/Header'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <div className="mx-auto px-4 w-1/1 md:w-160">
        <Outlet />
      </div>
    </>
  ),
})
