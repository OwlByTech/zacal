import { medusaClient } from "@lib/config"
import { cache } from "react"

export const retrievePricedProductById = cache(async function ({
  id,
  regionId,
  header,
}: {
  id: string
  regionId: string
  header?: any
}) {
  return medusaClient.products
    .retrieve(`${id}?region_id=${regionId}`, header)
    .then(({ product }) => product)
    .catch((err) => {
      return null
    })
})
