"use client"
import { Text } from "@medusajs/ui"

import { ProductPreviewType } from "types/global"

import { getProductPrice } from "@lib/util/get-product-price"
import { Region } from "@medusajs/medusa"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { retrievePricedProductById } from "@lib/data/index-client"
import { useEffect, useState } from "react"

export default function ProductPreviewClient({
  productPreview,
  isFeatured,
  region,
  header,
}: {
  productPreview: ProductPreviewType
  isFeatured?: boolean
  region: Region
  header?: any
}) {
  const [price, setPrice] = useState(null)
  const [priceCheapest, setPriceCheapest] = useState(null)

  useEffect(() => {
    const dataFetch = async () => {
      const pricedProduct = await retrievePricedProductById({
        id: productPreview.id,
        regionId: region.id,
        header,
      }).then((product) => product)

      setPrice(pricedProduct)
      const { cheapestPrice } = getProductPrice({
        product: pricedProduct,
        region,
      })
      setPriceCheapest(cheapestPrice)
    }
    dataFetch()
  }, [])

  return (
    <LocalizedClientLink
      href={`/products/${productPreview.handle}`}
      className="group"
    >
      <div className="border border-black p-4 group-hover:shadow-elevation-card-hover transition-shadow ease-in-out duration-150">
        <Thumbnail
          thumbnail={productPreview.thumbnail}
          size="full"
          isFeatured={isFeatured}
        />
        <div className=" p-2 flex txt-compact-medium mt-4 justify-between ">
          <Text className="text-ui-fg-subtle lg:text-xl">
            {productPreview.title}
          </Text>
          <div className="flex items-center gap-x-2">
            {priceCheapest && <PreviewPrice price={priceCheapest} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}