import { Suspense } from "react"

import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function AdAccount() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow bg-black">
      <LocalizedClientLink className="text-white font-bold p-2" href="/account">
        Create tu cuenta y recibe un descuento del 30%.
      </LocalizedClientLink>
    </div>
  )
}
