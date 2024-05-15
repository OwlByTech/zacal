"use client"
import { Button } from "@medusajs/ui"
import { useState } from "react"
import CategoryView from "../components/categories-view"
import { Region } from "@medusajs/medusa"

export default function Outlet({
  new_products,
  exclusive_products,
  colection_products,
  header,
  region,
}: {
  new_products: any
  exclusive_products: any
  colection_products: any
  header: any
  region: Region
}) {
  const [button, setButton] = useState(0)
  const [products, setProducts] = useState(new_products)
  return (
    <CategoryView
      products={products}
      header={header}
      region={region}
      identificator={`outlet${button}`}
    >
      <section className="flex flex-col px-2 gap-5">
        <div>
          <p className="text-2xl sm:text-4xl">OUTLET</p>
          <p className="text-sm sm:text-base">Lo debes tener hoy</p>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex gap-5">
            <Button
              onClick={() => {
                setButton(0)
                setProducts(new_products)
              }}
              className={`hover:bg-principal-950 font-bold text-[10px] sm:text-[16px] hover:text-principal-0 ${
                button === 0
                  ? "bg-black text-white"
                  : "bg-principal-0 text-principal-950 "
              } rounded-none border border-principal-950 p-2.5`}
            >
              NUEVO
            </Button>
            <Button
              onClick={() => {
                setButton(1)
                setProducts(colection_products)
              }}
              className={`hover:bg-principal-950 font-bold text-[10px] sm:text-[16px] hover:text-principal-0 ${
                button === 1
                  ? "bg-black text-white"
                  : "bg-principal-0 text-principal-950"
              } rounded-none border border-principal-950  p-2.5`}
            >
              COLECCIÓN
            </Button>
            <Button
              onClick={() => {
                setButton(2)
                setProducts(exclusive_products)
              }}
              className={`hover:bg-principal-950 font-bold text-[10px] sm:text-[16px] hover:text-principal-0 ${
                button === 2
                  ? "bg-black text-white"
                  : "bg-principal-0 text-principal-950"
              } rounded-none border border-principal-950  p-2.5`}
            >
              MIEMBROS EXCLUSIVOS
            </Button>
          </div>
        </div>
      </section>
    </CategoryView>
  )
}
