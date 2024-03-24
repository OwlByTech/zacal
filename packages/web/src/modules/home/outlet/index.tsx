"use client"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Arrow from "@modules/common/components/arrow"

export default function Outlet() {
  return (
    <section className="flex flex-col px-2 gap-5">
      <div>
        <p className="text-4xl">OUTLET</p>
        <p className="text-base">You must have today</p>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex gap-5">
          <LocalizedClientLink
            className="hover:bg-principal-950 hover:text-principal-0 bg-principal-0 border border-principal-950 text-principal-950 p-2.5"
            href="/"
          >
            NEWS
          </LocalizedClientLink>
          <LocalizedClientLink
            className="hover:bg-principal-950 hover:text-principal-0 bg-principal-0 border border-principal-950 text-principal-950 p-2.5"
            href="/"
          >
            COLECTION
          </LocalizedClientLink>
          <LocalizedClientLink
            className="hover:bg-principal-950 hover:text-principal-0 bg-principal-0 border border-principal-950 text-principal-950 p-2.5"
            href="/"
          >
            EXCLUCIVE MEMBERS
          </LocalizedClientLink>
        </div>
        <div className="flex flex-row gap-4">
          <Arrow onClick={() => {}} />
          <Arrow onClick={() => {}} direction />
        </div>
      </div>
    </section>
  )
}
