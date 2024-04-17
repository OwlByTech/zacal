"use client"

import { ChangeEvent, useState } from "react"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"
import { colorShoe } from "@lib/data/colors"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  setQueryParams: (name: string, value: SortOptions) => void
}

const ColorProducts = ({ setQueryParams }: SortProductsProps) => {
  const handleChange = (e: ChangeEvent<HTMLButtonElement>) => {
    const newSortBy = e.target.value as SortOptions
    setQueryParams("sortBy", newSortBy)
  }
  const [colors, setColors] = useState([])

  const add = (color_new: string) => {
    if (colors.includes(color_new)) {
      remove(color_new)
    } else {
      setColors([...colors, color_new])
    }
  }
  const remove = (color: string) => {
    setColors(
      colors.filter((value) => {
        if (value !== color) {
          return value
        }
      })
    )
  }
  console.log(colors)
  return (
    <div className="grid grid-cols-8 gap-4">
      {Object.keys(colorShoe).map((key: string, index) => (
        <button
          key={index}
          className={` h-10 w-10 flex items-center ${
            colors.includes(key) && "border-2 border-black"
          } justify-center p-1 bg-white`}
          onClick={() => {
            //@ts-ignore
            add(key)
          }}
        >
          <div
            className={`h-8 w-8 border border-black`}
            //@ts-ignore
            style={{ backgroundColor: `${colorShoe[key]}` }}
          ></div>
        </button>
      ))}
    </div>
  )
}

export default ColorProducts
