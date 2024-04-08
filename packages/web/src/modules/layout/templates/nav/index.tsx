import { Suspense } from "react"

import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)

  return (
    <header className="flex flex-row justify-between sticky items-center h-20 top-0 left-0 z-20 px-3 mx-auto border-b duration-200 w-screen bg-white shadow-md border-r sm:gap-2 sm:px-20">
      <img src="/logo.png" alt="" width={75} height={75} />

      <div className="flex flex-row gap-1 sm:gap-5">
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

        <LocalizedClientLink
          className="hover:bg-[#F8CB56] text-black p-2"
          href="/account"
        >
          CUENTA
        </LocalizedClientLink>
      </div>
      <Suspense
        fallback={
          <LocalizedClientLink
            className="hover:text-ui-fg-base flex gap-2"
            href="/cart"
          >
            Cart (0)
          </LocalizedClientLink>
        }
      >
        <CartButton />
      </Suspense>
    </header>
  )
}
