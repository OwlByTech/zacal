import { ProductVariant } from "@medusajs/medusa"
import { Text } from "@medusajs/ui"

type LineItemOptionsProps = { variant: ProductVariant }

const LineItemOptions = ({ variant }: LineItemOptionsProps) => {
  return (
    <Text className="inline-block text-xs  w-full overflow-hidden text-ellipsis">
      Variante: {variant.title}
    </Text>
  )
}

export default LineItemOptions
