"use client"

import { LineItem, Region } from "@medusajs/medusa"
import { Text, clx } from "@medusajs/ui"

import CartItemSelect from "@modules/cart/components/cart-item-select"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import Thumbnail from "@modules/products/components/thumbnail"
import { updateLineItem } from "@modules/cart/actions"
import Spinner from "@modules/common/icons/spinner"
import { useState } from "react"
import ErrorMessage from "@modules/checkout/components/error-message"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ItemProps = {
  item: Omit<LineItem, "beforeInsert">
  region: Region
  type?: "full" | "preview"
}

const Item = ({ item, region, type = "full" }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { handle } = item.variant.product

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    const message = await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        return err.message
      })
      .finally(() => {
        setUpdating(false)
      })

    message && setError(message)
  }

  return (
    <div className="w-full flex flex-row gap-4  border-b-2 border-black pb-2">
      <div className="">
        <LocalizedClientLink
          href={`/products/${handle}`}
          className={clx("flex", {
            "w-16": type === "preview",
            "small:w-36 w-12": type === "full",
          })}
        >
          <Thumbnail thumbnail={item.thumbnail} size="square" />
        </LocalizedClientLink>
      </div>
      <div className="flex flex-row justify-between gap-2 flex-grow">
        <div className="text-left uppercase ">
          <Text className="font-bold">{item.title}</Text>
          <LineItemOptions variant={item.variant} />
          <div className="flex flex-row gap-1 items-center">
            <span className="text-xs">VALOR UNIDAD:</span>
            <LineItemUnitPrice item={item} region={region} />
          </div>
          <div className="flex flex-row gap-1 items-center">
            <span className="text-xs">TOTAL:</span>
            <LineItemPrice item={item} region={region} style="tight" />
          </div>
        </div>

        {type === "full" && (
          <div className="flex flex-col gap-4 ">
            <DeleteButton id={item.id} />
            <div className="flex flex-row gap-2  items-center   ">
              {updating && <Spinner />}
              <CartItemSelect
                value={item.quantity}
                onChange={(value) =>
                  changeQuantity(parseInt(value.target.value))
                }
                className="w-14 h-10 p-4"
              >
                {Array.from(
                  {
                    length: Math.min(
                      item.variant.inventory_quantity > 0
                        ? item.variant.inventory_quantity
                        : 10,
                      10
                    ),
                  },
                  (_, i) => (
                    <option value={i + 1} key={i}>
                      {i + 1}
                    </option>
                  )
                )}
              </CartItemSelect>
              <ErrorMessage error={error} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Item
