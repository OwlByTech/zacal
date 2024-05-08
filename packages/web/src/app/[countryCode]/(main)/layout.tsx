import { Metadata } from "next"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import AdAccount from "@modules/layout/templates/ad-account"
import { getCustomer } from "@lib/data"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  const customer = await getCustomer()
  return (
    <section className="flex flex-col">
      <Nav />
      {!customer && <AdAccount />}
      <div className="flex-grow">
        {props.children}
        <Footer customer={customer} />
      </div>
    </section>
  )
}
