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
    <div className="">
      <header className=" mx-auto border-b h-screen duration-200 bg-white flex flex-col p-4 gap-2 border-r">
        <div className="flex flex-col items-center justify-center flex-grow">
          <img src="/logo.png" alt="" width={200} height={200} />

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
    </div>
  )
}
