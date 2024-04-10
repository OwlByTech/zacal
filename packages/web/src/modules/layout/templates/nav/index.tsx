import { Suspense } from "react"

import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
<<<<<<< HEAD
import SideMenu from "@modules/layout/components/side-menu"
import { divide } from "lodash"
import SearchModal from "@modules/search/templates/search-modal"
=======
import SearchModal from "@modules/search/templates/search-modal"
>>>>>>> feature-search

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)

  return (
    <header className="flex flex-row justify-between items-center py-1 sticky h-[70px] top-0 left-0 z-20 px-3 mx-auto border-b duration-200 w-screen bg-white shadow-md border-r sm:gap-2 sm:px-20">
      <div className="block md:hidden">
        <SideMenu />
      </div>
      <img
        src="/logo.png"
        alt=""
        className="h-12 w-12 small:h-16 small:w-16 medium:h-16 medium:w-16"
      />
      <div className="hidden md:flex flex-row items-end gap-1  sm:gap-5">
        <LocalizedClientLink
          className="hover:bg-[#F8CB56] text-black text-md p-2"
          href="/"
        >
          INICIO
        </LocalizedClientLink>

        <LocalizedClientLink
          className="hover:bg-[#F8CB56] text-black p-2"
          href="/categories"
        >
          CATEGORIAS
        </LocalizedClientLink>

        <LocalizedClientLink
          className="hover:bg-[#F8CB56] text-black p-2"
          href="/store"
        >
          TIENDA
        </LocalizedClientLink>
      </div>
      <div className="flex flex-row items-center gap-1 sm:gap-5">
        <LocalizedClientLink className="text-black" href="/account">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 101 101"
            id="user"
            className="w-[25px] h-[25px] md:w-9 md:h-9"
          >
            <path d="M50.4 54.5c10.1 0 18.2-8.2 18.2-18.2S60.5 18 50.4 18s-18.2 8.2-18.2 18.2 8.1 18.3 18.2 18.3zm0-31.7c7.4 0 13.4 6 13.4 13.4s-6 13.4-13.4 13.4S37 43.7 37 36.3s6-13.5 13.4-13.5zM18.8 83h63.4c1.3 0 2.4-1.1 2.4-2.4 0-12.6-10.3-22.9-22.9-22.9H39.3c-12.6 0-22.9 10.3-22.9 22.9 0 1.3 1.1 2.4 2.4 2.4zm20.5-20.5h22.4c9.2 0 16.7 6.8 17.9 15.7H21.4c1.2-8.9 8.7-15.7 17.9-15.7z"></path>
          </svg>
        </LocalizedClientLink>

      <SearchModal />
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
      </div>
    </header>
  )
}
