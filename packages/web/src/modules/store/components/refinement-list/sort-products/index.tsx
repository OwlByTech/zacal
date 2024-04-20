"use client"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"
import { values } from "lodash"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: string) => void
}

const sortOptions = [
  {
    value: "created_at",
    label: "Mas recientes",
  },
  {
    value: "price_asc",
    label: "Precio: Menor -> Mayor",
  },
  {
    value: "price_desc",
    label: "Precio: Mayor -> Menor",
  },
]

const SortProducts = ({ sortBy, setQueryParams }: SortProductsProps) => {
  const handleChange = (e:string) => {
    setQueryParams("sortBy", e)
  }

  return (
    <div className="flex flex-col gap-2 py-4 ">
      {sortOptions.map((value) => (
        <button className="py-2 flex border-b flex-row justify-between uppercase" onClick={()=>{handleChange(value.value)}}>
          <p className={`px-4 ${sortBy===value.value&& "font-bold text-principal-500"}`}>{value.label}</p>
        </button>
      ))}
    </div>
  )
}

export default SortProducts
