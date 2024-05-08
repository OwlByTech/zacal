import { Dialog, Transition } from "@headlessui/react"
import {
  PricedProduct,
  PricedVariant,
} from "@medusajs/medusa/dist/types/pricing"
import { Button, clx } from "@medusajs/ui"
import React, { Fragment, useMemo } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import ChevronDown from "@modules/common/icons/chevron-down"
import X from "@modules/common/icons/x"

import { getProductPrice } from "@lib/util/get-product-price"
import { Region } from "@medusajs/medusa"
import OptionSelect from "../option-select"

type MobileActionsProps = {
  product: PricedProduct
  variant?: PricedVariant
  region: Region
  options: Record<string, string>
  updateOptions: (update: Record<string, string>) => void
  inStock?: boolean
  handleAddToCart: () => void
  isAdding?: boolean
  show: boolean
}

const MobileActions: React.FC<MobileActionsProps> = ({
  product,
  variant,
  region,
  options,
  updateOptions,
  inStock,
  handleAddToCart,
  isAdding,
  show,
}) => {
  const { state, open, close } = useToggleState()

  const price = getProductPrice({
    product: product,
    variantId: variant?.id,
    region,
  })

  const selectedPrice = useMemo(() => {
    if (!price) {
      return null
    }
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  return (
    <>
      <div
        className={clx("lg:hidden inset-x-0 bottom-0 fixed z-10", {
          "pointer-events-none": !show,
        })}
      >
        <Transition
          as={Fragment}
          show={show}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-white flex flex-col gap-y-3 justify-center items-center text-large-regular p-4 h-full w-full border-t border-gray-200 ">
            <div className="flex flex-row justify-between gap-x-2">
              <span>{product.title}</span>
              <span>—</span>

              {selectedPrice ? (
                <div className="flex flex-col flex-grow text-sm gap-x-2">
                  {selectedPrice.price_type === "sale" && (
                    <div className="flex flex-row flex-grow  gap-2 justify-between">
                      <p>
                        <span className="line-through">
                          {"$"}
                          {selectedPrice.original_price?.split("COP", 2)[1]}
                        </span>
                      </p>
                      <span className="text-red-600 font-bold">
                        -{selectedPrice.percentage_diff}%
                      </span>
                    </div>
                  )}
                  <span
                    className={clx("font-bold", {
                      "text-red-600": selectedPrice.price_type === "sale",
                    })}
                  >
                    {"$"}
                    {selectedPrice.calculated_price.split("COP", 2)[1]}
                  </span>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="grid grid-cols-2 w-full gap-x-4">
              <Button
                onClick={open}
                variant="secondary"
                className="w-full rounded-none"
              >
                <div className="flex items-center justify-between w-full">
                  <span>
                    {variant ? Object.values(options).join(" / ") : "Opciones"}
                  </span>
                  <ChevronDown />
                </div>
              </Button>
              <Button
                onClick={handleAddToCart}
                disabled={!inStock || !variant}
                className="w-full rounded-none bg-principal-400 text-principal-950 hover:text-principal-0"
                isLoading={isAdding}
              >
                {!variant
                  ? "Seleccionar Variante"
                  : !inStock
                  ? "Sin Stock"
                  : "Añadir al carrito"}
              </Button>
            </div>
          </div>
        </Transition>
      </div>
      <Transition appear show={state} as={Fragment}>
        <Dialog as="div" className="relative z-[75]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-700 bg-opacity-75 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed bottom-0 inset-x-0">
            <div className="flex min-h-full h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel className="w-full h-full transform overflow-hidden text-left flex flex-col gap-y-3">
                  <div className="w-full flex justify-end pr-6">
                    <button
                      onClick={close}
                      className="bg-white w-12 h-12 rounded-full text-ui-fg-base flex justify-center items-center"
                    >
                      <X />
                    </button>
                  </div>
                  <div className="bg-white px-6 py-12">
                    {product.variants.length > 1 && (
                      <div className="flex flex-col gap-y-6">
                        {(product.options || []).map((option) => {
                          return (
                            <div key={option.id}>
                              <OptionSelect
                                option={option}
                                current={options[option.id]}
                                updateOption={updateOptions}
                                title={option.title}
                              />
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileActions
