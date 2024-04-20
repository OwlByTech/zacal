"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

import SortProducts, { SortOptions } from "./sort-products"
import ColorProducts from "./color-products"
import MaterialProducts from "./material-products"
import SizeProducts from "./size-products"
import Accordion from "@modules/products/components/product-tabs/accordion"
import Slider from "./slider"
import { Button } from "@medusajs/ui"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  colors?: string[]
  material?: string[]
  size?: string[]
  minPrice?: number
  maxPrice?: number
}

const RefinementList = ({
  sortBy,
  colors,
  material,
  size,
  maxPrice,
  minPrice,
}: RefinementListProps) => {
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
    <div className="flex flex-col gap-12 pt-4  small:px-0 w-screen overflow-auto h-full max-h-[80vh] sm:w-[450px] text-black ">
      <Accordion
        type="multiple"
        defaultValue={[
          sortBy && "sortBy",
          colors && colors.length > 0 ? "color" : "1",
          material && material.length > 0 ? "material" : "2",
          size && size.length > 0 ? "size" : "4",
          minPrice && maxPrice ? "price" : "3",
        ]}
      >
        <Accordion.Item
          key={1}
          title="ORDENAR POR"
          headingSize="medium"
          value="sortBy"
          className="text-black py-2"
          classNameTitle="pl-4 font-bold uppercase text-black text-md"
        >
          <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} />
        </Accordion.Item>

        <Accordion.Item
          key={1}
          title="Material"
          headingSize="medium"
          value="material"
          className="text-black py-2"
          classNameTitle="pl-4 font-bold uppercase text-black text-md"
        >
          <MaterialProducts
            setQueryParams={setQueryParams}
            material={material}
          />
        </Accordion.Item>
        <Accordion.Item
          key={1}
          title="Color"
          headingSize="medium"
          value="color"
          className="text-black py-2"
          classNameTitle="pl-4 font-bold uppercase text-black text-md"
        >
          <ColorProducts setQueryParams={setQueryParams} colors_={colors} />
        </Accordion.Item>
        <Accordion.Item
          key={1}
          title="Talla"
          headingSize="medium"
          value="size"
          className="text-black py-2"
          classNameTitle="pl-4 font-bold uppercase text-black text-md"
        >
          <SizeProducts setQueryParams={setQueryParams} size={size} />
        </Accordion.Item>
        <Accordion.Item
          key={1}
          title="Precio"
          headingSize="medium"
          value="price"
          className="text-black py-2"
          classNameTitle="pl-4 font-bold uppercase text-black text-md"
        >
          <Slider
            setQueryParams={setQueryParams}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default RefinementList
