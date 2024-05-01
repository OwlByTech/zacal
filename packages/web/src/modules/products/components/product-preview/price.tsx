import { Text, clx } from "@medusajs/ui"

import { PriceType } from "../product-actions"

export default function PreviewPrice({ price }: { price: PriceType }) {
  return (
    <>
      <div className="flex flex-col flex-grow ">
        {price.price_type === "sale" && (
          <div className="flex flex-row flex-grow justify-between">
            <p>
              <span className="line-through font-normal">
                {"$"}
                {price.original_price?.split("COP", 2)[1]}
              </span>
            </p>
            <span className="text-red-600 font-bold">
              -{price.percentage_diff}%
            </span>
          </div>
        )}
        <span
          className={clx("font-normal ", {
            "text-red-600 font-bold": price.price_type === "sale",
          })}
        >
          {"$"}
          {price.calculated_price.split("COP", 2)[1]}
        </span>
      </div>
    </>
  )
}
