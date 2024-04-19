"use client"

import { ChangeEvent, useEffect, useState } from "react"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"

type SortProductsProps = {
  setQueryParams: (name: string, value: string) => void
}

const sizes_array: string[] = ["35", "36", "38", "39", "40", "41", "42"]
const SizeProducts = ({ setQueryParams }: SortProductsProps) => {
  const [sizes, setsizes] = useState([])

  const add = (size_new: string) => {
    if (sizes.includes(size_new)) {
      remove(size_new)
    } else {
      setsizes([...sizes, size_new])
    }
  }
  const remove = (size: string) => {
    setsizes(
      sizes.filter((value) => {
        if (value !== size) {
          return value
        }
      })
    )
  }
  useEffect(() => {
    setQueryParams("size", JSON.stringify(sizes))
  }, [sizes])

  console.log(sizes)
  return (
    <div className="grid grid-cols-8 gap-4">
      {sizes_array.map((value: string, index) => (
        <button
          value={index}
          className={`  border font-medium text-xs border-black flex items-center ${
            sizes.includes(value)
              ? "bg-black text-white"
              : "bg-white text-black"
          } justify-center p-2 `}
          onClick={() => {
            //@ts-ignore
            add(value)
          }}
        >
          {value}
        </button>
      ))}
    </div>
  )
}

export default SizeProducts
