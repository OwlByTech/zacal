"use client"

import { Popover, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Region } from "@medusajs/medusa"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"

import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "../refinement-list/sort-products"

const FilterMenu = ({
  sortBy,
  colors,
  size,
  material,
  maxPrice,
  minPrice,
}: {
  sortBy: SortOptions
  colors?: string[]
  size?: string[]
  material?: string[]
  minPrice?: number
  maxPrice?: number
}) => {
  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button className="relative h-full flex items-center p-2 border-2 border-black transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base text-xs md:text-sm">
                  Filtrar y ordenar
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom=""
                enterTo=" "
                leave="transition ease-in duration-150"
                leaveFrom=" "
                leaveTo="opacity-0"
              >
                <div className="fixed top-0 left-0 flex w-screen h-screen flex-row  items-end justify-end z-50 ">
                  <div className="hidden md:flex md:flex-grow w-full h-full bg-gray-700 opacity-50 " />
                  <Popover.Panel className="flex flex-col sticky w-screen sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-screen z-30 top-0 text-sm text-ui-fg-on-color ">
                    <div className="flex flex-col h-full bg-white ">
                      <div
                        className="flex justify-between flex-row border-b p-4 text-black"
                        id="xmark"
                      >
                        <p className="font-semibold text-xl ">
                          Filtrar y ordenar
                        </p>
                        <button
                          className="text-black font-extrabold text-xl"
                          onClick={close}
                        >
                          <img src="/close.svg" className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="h-full max-h-full flex flex-col justify-between ">
                        <RefinementList
                          sortBy={sortBy}
                          size={size}
                          material={material}
                          colors={colors}
                          minPrice={minPrice}
                          maxPrice={maxPrice}
                        />
                        <button
                          className="bg-black font-bold rounded-none mb-4  mx-4 h-10 font-raleway text-lg"
                          onClick={close}
                        >
                          Aplicar
                        </button>
                      </div>
                    </div>
                  </Popover.Panel>
                </div>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default FilterMenu
