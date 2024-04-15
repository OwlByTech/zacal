import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import { CartWithCheckoutStep } from "types/global"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { Customer } from "@medusajs/medusa"
import { Heading } from "@medusajs/ui"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: CartWithCheckoutStep | null
  customer: Omit<Customer, "password_hash"> | null
}) => {
  return (
    <div className="py-12 md:px-20">
      <div className="content-container">
        {cart?.items.length ? (
          <div className="flex flex-col">
            <Heading className="text-[2rem] leading-[2.75rem] text-center pb-4">
              Carrito de Compras
            </Heading>
            <div className="grid grid-cols-1 small:grid-cols-2 gap-x-10">
              <div className="flex flex-col bg-white py-6 gap-y-6">
                <ItemsTemplate region={cart?.region} items={cart?.items} />
              </div>
              <div className="relative small:border-l-4 small:pl-10 border-gray-500">
                <div className="flex flex-col gap-y-8 sticky top-12">
                  {cart && cart.region && (
                    <>
                      <div className="bg-white py-6">
                        <Summary cart={cart} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
