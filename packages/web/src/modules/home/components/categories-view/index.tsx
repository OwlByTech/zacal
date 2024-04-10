"use client"
import { ReactNode, Suspense, useState } from "react"

import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Arrow from "@modules/common/components/arrow"
import ProductPreview from "@modules/products/components/product-preview"
import { Region } from "@medusajs/medusa"
import ProductPreviewClient from "@modules/products/components/product-preview-client"

import styles from "../../../../styles/globals.css"

export default function CategoryView({
  products,
  region,
  header,
  children,
  identificator,
}: {
  products: any
  region: Region
  header: any
  identificator: string
  children: ReactNode
}) {
  const [index, setIndex] = useState(0)
  const scrollToSection = (id) => {
    const image = document.getElementById(id)
    image?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    })
  }

  return (
    <div className="flex flex-col gap-8 mx-5 sm:mx-10 md:mx-12 lg:mx-20">
      <section className="flex flex-row justify-between">
        <div>{children}</div>
        <div className=" hidden small:relative small:flex flex-row gap-4 items-end">
          <Arrow
            onClick={() => {
              scrollToSection(`${identificator}image1`)
            }}
          />
          <Arrow
            onClick={() => {
              scrollToSection(`${identificator}image${products.length}`)
            }}
            direction
          />
        </div>
      </section>

      <section className="flex w-full flex-row justify-between">
        <ul
          className={`category flex flex-row w-full justify-start items-center gap-x-6 px-2 pb-6 overflow-x-scroll`}
        >
          {products.map((product, index) => (
            <li
              key={product.id}
              id={`${identificator}image${index + 1}`}
              className="small:w-1/4"
            >
              <ProductPreviewClient
                productPreview={product}
                region={region}
                isFeatured
                header={header}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
