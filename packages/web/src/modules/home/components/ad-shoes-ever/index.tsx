import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function AdShoesEver({ customer }: { customer: any }) {
  return (
    <section className="flex flex-row justify-between items-center bg-principal-400 border-y border-principal-950 h-24 p-2 sm:p-7">
      <div>
        <p className="sm:text-2xl mx-7">LOS MEJORES ZAPATOS</p>
      </div>
      <div>
        {!customer && (
          <LocalizedClientLink
            className="bg-principal-0 border border-principal-950 text-principal-950 p-2 text-xs sm:text-base mx-7"
            href="/account"
          >
            CREAR CUENTA
          </LocalizedClientLink>
        )}
      </div>
    </section>
  )
}
