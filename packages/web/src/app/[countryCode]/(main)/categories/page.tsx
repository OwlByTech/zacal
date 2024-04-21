import { readItems } from "@directus/sdk"
import directus from "@lib/data/directus"
import PrincipalCategory from "@modules/categories/templates/principal"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Metadata } from "next"
export const metadata: Metadata = {
  title: "Categorias",
}
export default function Page() {
  return <PrincipalCategory />
}
