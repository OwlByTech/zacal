import { Metadata } from "next"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { LineItem } from "@medusajs/medusa"

import { enrichLineItems } from "@modules/cart/actions"
import Wrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { getCart } from "@lib/data"
import { Heading } from "@medusajs/ui"

export const metadata: Metadata = {
  title: "Checkout",
}

const fetchCart = async () => {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) {
    return notFound()
  }

  const cart = await getCart(cartId).then((cart) => cart)

  if (cart?.items.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id)
    cart.items = enrichedItems as LineItem[]
  }

  return cart
}

export default async function Checkout() {
  const cart = await fetchCart()

  if (!cart) {
    return notFound()
  }

  return (
    <section>
      <Heading className="text-[2rem] leading-[2.75rem] text-center pb-4">
        Pedido
      </Heading>
      <div className="grid grid-cols-1 small:grid-cols-[520px_1fr] content-container gap-x-40 py-12">
        <Wrapper cart={cart}>
          <CheckoutSummary />
        </Wrapper>
        <div className="relative small:border-l-4 small:pl-10 border-gray-500">
          <CheckoutForm />
        </div>
      </div>
    </section>
  )
}
