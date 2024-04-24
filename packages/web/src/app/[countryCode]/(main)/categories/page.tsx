import PrincipalCategory from "@modules/categories/templates/principal"
import { Metadata } from "next"
export const metadata: Metadata = {
  title: "Categorias",
}
export default function Page() {
  return <PrincipalCategory />
}
