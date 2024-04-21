import { Product } from "@medusajs/medusa"
import { Metadata } from "next"

import {
  getCollectionsList,
  getCustomer,
  getProductsList,
  getRegion,
} from "@lib/data"
import FeaturedProducts from "@modules/home/featured-products"
import { ProductCollectionWithPreviews } from "types/global"
import { cache } from "react"
import AdShoesEver from "@modules/home/components/ad-shoes-ever"
import BestShoes from "@modules/home/components/best-shoes"
import BestDealsCategory from "@modules/home/templates/best-deals"
import OutletCategory from "@modules/home/templates/outlet"
import OnSaleCategory from "@modules/home/templates/on-sale"

export const metadata: Metadata = {
  title: "Zacal",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const region = await getRegion(countryCode)
  const customer = await getCustomer()
  if (!region) {
    return null
  }

  return (
    <>
      <div className="flex flex-col gap-6 sm:gap-20">
        <BestShoes />
        <div className="flex flex-col ">
          <BestDealsCategory region={region} />
        </div>
        <AdShoesEver customer={customer} />
        <div className="flex flex-col gap-5 sm:gap-20">
          <OutletCategory region={region} />
        </div>
      </div>
    </>
  )
}
