import { getCategoriesList, getCollectionsList } from "@lib/data"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer({ customer }: { customer: any }) {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    <footer className="flex flex-col border-t border-ui-border-base w-full bg-black h-[400px]">
      {!customer && (
        <div className="flex flex-row justify-between p-5 sm:p-10 mx-7">
          <p className="text-white font-bold text-m sm:text-2xl uppercase">
            ¿Qué estás esperando?
          </p>

          <LocalizedClientLink
            className="bg-principal-400 text-black p-2 text-sm sm:text-xl"
            href="/account"
          >
            CREAR CUENTA
          </LocalizedClientLink>
        </div>
      )}
      <div className="px-7 py-16 h-full content-end">
        <small className="flex flex-row items-end content-end">
          <p className="text-white font-bold">&copy; 2024 zacal, </p>
          <a className="text-white" href="https://owlbytech.com/">
            Made by OwlByTech
          </a>
        </small>
      </div>
    </footer>
  )
}
