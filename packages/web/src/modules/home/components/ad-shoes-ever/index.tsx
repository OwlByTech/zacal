import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function AdShoesEver() {
  return (
    <section className="flex flex-row justify-between bg-principal-400 border-y border-principal-950 h-24 p-7">
      <div>
        <p className="text-2xl">LOS MEJORES ZAPATOS</p>
      </div>
      <div>
        <LocalizedClientLink
          className="bg-principal-0 border border-principal-950 text-principal-950 p-2.5"
          href="/account"
        >
          CREAR CUENTA
        </LocalizedClientLink>
      </div>
    </section>
  )
}
