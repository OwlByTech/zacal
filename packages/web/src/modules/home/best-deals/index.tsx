"use client"
import { Suspense } from "react"

import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Arrow from "@modules/common/components/arrow"

export default function BestDeals() {
  return (
    <section className="mx-10 flex flex-row justify-between">
      <div>
        <p className="text-4xl">TODAY BEST DEALS</p>
        <p className="text-base">You must have today</p>
      </div>
      <div className="flex flex-row gap-4">
        <Arrow onClick={() => {}} />
        <Arrow onClick={() => {}} direction />
      </div>
    </section>
  )
}
