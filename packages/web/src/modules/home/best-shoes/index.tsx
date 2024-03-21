"use client"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Arrow from "@modules/common/components/arrow"

export default function BestShoes() {
  return (
    <div
      style={{ backgroundSize: "100% 100%" }}
      className="flex flex-col justify-between felx-grow bg-[url('/shoeOne.png')] h-[250px] 2xl:h-[400px] m-7"
    >
      <LocalizedClientLink
        className="bg-principal-0 w-40 text-center border border-principal-950 text-principal-950 p-2"
        href="/"
      >
        Titulo del zapato
      </LocalizedClientLink>
      <div className="flex flex-row justify-between px-4">
        <Arrow onClick={() => {}} />
        <Arrow onClick={() => {}} direction />
      </div>
      <div className="flex justify-end felx-row text-right">
        <div className="bg-principal-0 w-40 border border-principal-950 text-principal-950 text-center p-2.5">
          SECONDARY
        </div>
        <div className="bg-principal-400  w-40 border border-principal-950 text-center text-principal-950 p-2.5">
          PRIMARY
        </div>
      </div>
    </div>
  )
}
