"use client"

import { ChangeEvent, useEffect, useState } from "react"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"
import { colorShoe } from "@lib/data/colors"

type SortProductsProps = {
  setQueryParams: (name: string, value: any) => void
}

const ColorProducts = ({ setQueryParams }: SortProductsProps) => {
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
  useEffect(() => {
    setQueryParams("color", JSON.stringify(colors))
  }, [colors])

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
