import { Suspense } from "react"

import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import image from "/public/logo.png"
import Image from "next/image"

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)

  return (
    <header className="sticky top-0 left-0 z-20 mx-auto border-b duration-200 w-screen bg-white items-center justify-between flex flex-row py-4 px-20 shadow-md  gap-2 border-r">
      <img src="/logo.png" alt="" width={80} height={80} />

      <div className="flex flex-row gap-5">
        <LocalizedClientLink
          className="hover:bg-[#F8CB56] text-black p-2"
          href="/"
        >
          Home
        </LocalizedClientLink>

        <LocalizedClientLink
          className="hover:bg-[#F8CB56] text-black p-2"
          href="/categories"
        >
          CATEGORIES
        </LocalizedClientLink>

        <LocalizedClientLink
          className="hover:bg-[#F8CB56] text-black p-2"
          href="/"
        >
          ON SALE
        </LocalizedClientLink>

        <LocalizedClientLink
          className="hover:bg-[#F8CB56] text-black p-2"
          href="/account"
        >
          ACOUNT
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
