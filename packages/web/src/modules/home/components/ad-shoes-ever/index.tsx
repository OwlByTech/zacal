import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function AdShoesEver() {
  return (
    <section className="flex flex-row justify-between items-center bg-principal-400 border-y border-principal-950 h-24 p-4 sm:p-7">
      <div>
        <p className=" sm:text-2xl">LOS MEJORES ZAPATOS</p>
      </div>
      <div>
        <LocalizedClientLink
          className="bg-principal-0 border border-principal-950 text-principal-950 p-2.5 text-sm sm:text-base"
          href="/account"
        >
          CREAR CUENTA
        </LocalizedClientLink>
      </div>
    </section>
  )
}
