import { Suspense } from "react"

import { getCustomer, listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)
  const customer = await getCustomer()

  return (
    <header className="flex flex-row justify-between items-center py-1 sticky h-[75px] small:h-[90px] top-0 left-0 z-20 px-3 mx-auto duration-200 w-screen bg-principal-950 shadow-md sm:gap-2 small:px-10">
      <div className="block md:hidden w-1/3">
        <SideMenu />
      </div>
      <div className="w-1/3 md:w-auto flex flex-row justify-center items-center mx-5">
        <LocalizedClientLink href="/">
          <img
            src="/logo.png"
            alt=""
            className="h-12 w-14 small:h-[70px] small:w-[80px]"
          />
        </LocalizedClientLink>
      </div>
      <div className="hidden md:flex  h-full flex-row justify-center items-center text-sm font-semibold gap-1 sm:gap-5">
        <LocalizedClientLink
          className="hover:bg-principal-400 hover:text-principal-950 text-principal-0 p-2"
          href="/"
        >
          INICIO
        </LocalizedClientLink>

        <LocalizedClientLink
          className="hover:bg-principal-400 hover:text-principal-950 text-principal-0 p-2"
          href="/categories"
        >
          CATEGORIAS
        </LocalizedClientLink>

        <LocalizedClientLink
          className="hover:bg-principal-400 hover:text-principal-950 text-principal-0 p-2"
          href="/store"
        >
          TIENDA
        </LocalizedClientLink>
      </div>
      <div className="flex flex-row items-center h-full justify-end gap-2 md:gap-6 w-1/3 md:w-auto py-1 mx-5">
        <LocalizedClientLink
          className="text-principal-0 flex flex-row h-full items-center "
          href="/search"
        >
          <img src="/search.svg" className="w-5 h-5" />
        </LocalizedClientLink>

        <Suspense
          fallback={
            <LocalizedClientLink
              className="hover:text-ui-fg-base flex flex-row items-end gap-2"
              href="/cart"
            >
              Cart (0)
            </LocalizedClientLink>
          }
        >
          <CartButton />
        </Suspense>
        <LocalizedClientLink
          className="text-black flex flex-row h-full items-center "
          href="/account"
        >
          <img src="/user.svg" className="w-[18px] h-[18px]" />
          {customer && (
            <span className="hidden md:block font-normal text-principal-950 p-1 text-xs bg-principal-500 rounded-xl">
              {customer.first_name}
            </span>
          )}
        </LocalizedClientLink>
      </div>
    </header>
  )
}
