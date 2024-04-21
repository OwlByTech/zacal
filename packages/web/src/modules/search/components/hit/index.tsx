import { ProductVariant } from "@medusajs/medusa"
import { Container, Text } from "@medusajs/ui"

import Thumbnail from "@modules/products/components/thumbnail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useEffect, useState } from "react"
import { retrievePricedProductById } from "@lib/data/index-client"
import PreviewPrice from "@modules/products/components/product-preview/price"
import { getProductPrice } from "@lib/util/get-product-price"

export type ProductHit = {
  id: string
  title: string
  handle: string
  description: string | null
  thumbnail: string | null
  variants: ProductVariant[]
  collection_handle: string | null
  collection_id: string | null
}

type HitProps = {
  hit: ProductHit
  header: any
  region: any
}

const Hit = ({ hit, header, region }: HitProps) => {
  const [price, setPrice] = useState(null)
  const [priceCheapest, setPriceCheapest] = useState(null)

  useEffect(() => {
    const dataFetch = async () => {
      const pricedProduct = await retrievePricedProductById({
        id: hit.id,
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
    <LocalizedClientLink href={`/products/${hit.handle}`}>
      <Container
        key={hit.id}
        className="flex flex-col gap-2 w-full p-2 shadow-elevation-card-rest hover:shadow-elevation-card-hover  sm:justify-center border border-black rounded-none"
      >
        <Thumbnail
          thumbnail={hit.thumbnail}
          size="full"
          className="group h-7 w-4 sm:h-9 sm:w-6"
        />
        <div className="flex flex-col  justify-between group">
          <div className="flex flex-col">
            <Text className="text-ui-fg-subtle">{hit.title}</Text>
            <div className="flex items-center gap-x-2">
              {priceCheapest && <PreviewPrice price={priceCheapest} />}
            </div>
          </div>
        </div>
      </Container>
    </LocalizedClientLink>
  )
}

export default Hit
