import { Suspense } from "react"

import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

type Props = { onClick: any; direction?: boolean }

export default async function Arrow({ onClick, direction }: Props) {
  return (
    <button
      className={` border border-black bg-white p-1 ${
        direction && "rotate-180"
      }`}
      onClick={onClick}
    >
      <img className="" src="/Vector.svg" alt="" />
    </button>
  )
}
