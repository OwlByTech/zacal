import { Text, clx } from "@medusajs/ui"

import { getCategoriesList, getCollectionsList } from "@lib/data"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    <footer className="flex flex-col border-t border-ui-border-base w-full bg-black h-[400px]">
      <div className="flex flex-row justify-between p-10">
        <p className="text-white font-bold text-2xl uppercase">
          what is your waiting for?
        </p>

        <LocalizedClientLink
          className="bg-[#F8CB56] text-black p-2"
          href="/account"
        >
          CREATE ACOUNT
        </LocalizedClientLink>
      </div>

      <div className="px-7 py-16">
        <small className="flex flex-row">
          <p className="text-white font-bold">&copy; 2024 zacal, </p>
          <a className="text-white" href="owlbytech.com">
            Made by OwlByTech
          </a>
        </small>
      </div>
    </footer>
  )
}
