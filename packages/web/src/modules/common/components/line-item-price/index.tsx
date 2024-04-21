import { formatAmount } from "@lib/util/prices"
import { LineItem, Region } from "@medusajs/medusa"
import { clx } from "@medusajs/ui"

import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { CalculatedVariant } from "types/medusa"

type LineItemPriceProps = {
  item: Omit<LineItem, "beforeInsert">
  region: Region
  style?: "default" | "tight"
}

const LineItemPrice = ({
  item,
  region,
  style = "default",
}: LineItemPriceProps) => {
  const originalPrice =
    (item.variant as CalculatedVariant).original_price * item.quantity
  const hasReducedPrice = (item.total || 0) < originalPrice

  return (
    <div className="flex flex-col gap-x-2 text-gray-700 text-sm">
      <div className="text-left">
        {hasReducedPrice && (
          <>
            <p>
              {style === "default" && <span className="">Original: </span>}
              <span className="line-through ">
                {"$ " + originalPrice.toLocaleString() || 0}
              </span>
            </p>
            {style === "default" && (
              <span className=" interactive">
                -{getPercentageDiff(originalPrice, item.total || 0)}%
              </span>
            )}
          </>
        )}
        <span
          className={clx("text-base-regular", {
            "text-ui-fg-interactive": hasReducedPrice,
          })}
        >
          {"$ " + item.total?.toLocaleString() || 0}
        </span>
      </div>
    </div>
  )
}

export default LineItemPrice
