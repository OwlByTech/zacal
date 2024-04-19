"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

import SortProducts, { SortOptions } from "./sort-products"
import ColorProducts from "./color-products"
import MaterialProducts from "./material-products"
import SizeProducts from "./size-products"
import Accordion from "@modules/products/components/product-tabs/accordion"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
}

const RefinementList = ({ sortBy }: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  return (
    <div className="flex flex-col gap-12 py-4 mb-8 small:px-0 w-screen overflow-scroll h-[90vh] sm:w-[450px] text-black ">
      <Accordion type="multiple">
        <Accordion.Item
          key={1}
          title="Material"
          headingSize="medium"
          value="Material"
          className="text-black py-2"
        >
          <MaterialProducts setQueryParams={setQueryParams} />
        </Accordion.Item>
        <div className="flex flex-col gap-2">
          <p className="font-bold pb-1 border-b border-black">Color</p>
          <div className="px-2">
            <ColorProducts setQueryParams={setQueryParams} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold pb-1 border-b border-black">Talla</p>
          <div className="px-2">
            <SizeProducts setQueryParams={setQueryParams} />
          </div>
        </div>

        <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} />
      </Accordion>
    </div>
  )
}

export default RefinementList
