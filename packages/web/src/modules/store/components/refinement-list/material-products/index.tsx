"use client"

import { ChangeEvent, useEffect, useState } from "react"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"

type SortProductsProps = {
  setQueryParams: (name: string, value: string) => void
}

const materials_array: string[] = [
  "Cuero",
  "Gamuza",
  "Textil",
  "Sintéticos",
  "Goma",
  "Malla",
  "Cuero sintético",
  "Fibra de carbono",
  "Caucho",
  "Poliuretano",
  "Nylon",
  "Poliéster",
  "Algodón",
  "Lino",
  "Seda",
]
const MaterialProducts = ({ setQueryParams }: SortProductsProps) => {
  const [materials, setMaterials] = useState([])

  const add = (material_new: string) => {
    if (materials.includes(material_new)) {
      remove(material_new)
    } else {
      setMaterials([...materials, material_new])
    }
  }
  const remove = (material: string) => {
    setMaterials(
      materials.filter((value) => {
        if (value !== material) {
          return value
        }
      })
    )
  }
  useEffect(() => {
    setQueryParams("material", JSON.stringify(materials))
  }, [materials])

  return (
    <div className="grid  grid-cols-2 lg:grid-cols-3 py-4 px-2 gap-4">
      {materials_array.map((value: string, index) => (
        <button
          value={index}
          className={`  border font-medium text-xs border-black flex items-center ${
            materials.includes(value)
              ? "bg-black text-white"
              : "bg-white text-black"
          } justify-center p-1 `}
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

export default MaterialProducts
