import { getMedusaHeaders, getRegion } from "@lib/data"
import SearchModal from "@modules/search/templates/search-modal"

export default async function SearchModalRoute() {
  const header = getMedusaHeaders(["products"])
  const region = await getRegion("co")
  return <SearchModal header={header} region={region} />
}
