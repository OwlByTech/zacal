import { Metadata } from "next"

import InteractiveLink from "@modules/common/components/interactive-link"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi text-ui-fg-base">Pagina no funciona</h1>
      <p className="text-small-regular text-ui-fg-base">
        El carrito al que intentaste acceder no existe. Borra las cookies y
        vuelve a intentarlo.
      </p>
      <InteractiveLink href="/">Ir a inicio</InteractiveLink>
    </div>
  )
}
