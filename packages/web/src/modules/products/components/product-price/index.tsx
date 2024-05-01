import {
  PricedProduct,
  PricedVariant,
} from "@medusajs/medusa/dist/types/pricing"
import { clx } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import { RegionInfo } from "types/global"

export default function ProductPrice({
  product,
  variant,
  region,
}: {
  product: PricedProduct
  variant?: PricedVariant
  region: RegionInfo
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
    region,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />
  }

  return (
    <div className="flex flex-col flex-grow ">
      {selectedPrice.price_type === "sale" && (
        <div className="flex flex-row flex-grow justify-between">
          <p>
            <span className="line-through">
              {"$"}
              {selectedPrice.original_price?.split("COP", 2)[1]}
            </span>
          </p>
          <span className="text-red-600 font-bold">
            -{selectedPrice.percentage_diff}%
          </span>
        </div>
      )}
      <span
        className={clx("text-lg font-bold", {
          "text-red-600": selectedPrice.price_type === "sale",
        })}
      >
        {"$"}
        {selectedPrice.calculated_price.split("COP", 2)[1]}
      </span>
    </div>
  )
}
