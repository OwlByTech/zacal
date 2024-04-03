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

export default function CategoryView({
  products,
  region,
  header,
  children,
}: {
  products: any
  region: Region
  header: any
  children: ReactNode
}) {
  const [index, setIndex] = useState(0)
  console.log(products)
  return (
    <>
      <section className="flex flex-row justify-between">
        <div>{children}</div>
        <div className="flex flex-row gap-4">
          <Arrow
            onClick={() => {
              setIndex(index - 3)
            }}
          />
          <Arrow
            onClick={() => {
              setIndex(index + 3)
            }}
            direction
          />
        </div>
      </section>

      <section className=" flex w-full flex-row justify-between overflow-scroll">
        <ul className="flex flex-grow  flex-row gap-x-6 gap-y-24 small:gap-y-36 ">
          {products[index] && (
            <li key={products[index]?.id} className="small:w-1/3 ">
              <ProductPreviewClient
                productPreview={products[index]}
                region={region}
                isFeatured
                header={header}
              />
            </li>
          )}

          {products[index + 1] && (
            <li key={products[index + 1]?.id} className="small:w-1/3 ">
              <ProductPreviewClient
                productPreview={products[index + 1]}
                region={region}
                isFeatured
                header={header}
              />
            </li>
          )}
          {products[index + 2] && (
            <li key={products[index + 2]?.id} className="small:w-1/3 ">
              <ProductPreviewClient
                productPreview={products[index + 2]}
                region={region}
                isFeatured
                header={header}
              />
            </li>
          )}
        </ul>
      </section>
    </>
  )
}
