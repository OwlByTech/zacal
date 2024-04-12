import { ProductVariant } from "@medusajs/medusa"
import { Container, Text } from "@medusajs/ui"

import Thumbnail from "@modules/products/components/thumbnail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

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
}

const Hit = ({ hit }: HitProps) => {
  return (
    <LocalizedClientLink href={`/products/${hit.handle}`}>
      <Container
        key={hit.id}
        className="flex flex-col gap-2 w-full p-2 shadow-elevation-card-rest hover:shadow-elevation-card-hover  sm:justify-center border border-black rounded-none"
      >
        <Thumbnail
          thumbnail={hit.thumbnail}
          size="square"
          className="group h-4 w-4 sm:h-6 sm:w-6"
        />
        <div className="flex flex-col  justify-between group">
          <div className="flex flex-col">
            <Text className="text-ui-fg-subtle">{hit.title}</Text>
          </div>
        </div>
      </Container>
    </LocalizedClientLink>
  )
}

export default Hit
