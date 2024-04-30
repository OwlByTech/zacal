"use client"

import { Popover, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Region } from "@medusajs/medusa"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"

const SideMenuItems = {
  Inicio: "/",
  Categorias: "/categories",
  Tienda: "/store",
  Cuenta: "/account",
}

const SideMenu = ({}) => {
  const toggleState = useToggleState()

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    width="20px"
                    height="20px"
                    fill="#FFFFFF"
                  >
                    <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z" />
                  </svg>
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo=""
                leave="transition ease-in duration-150"
                leaveFrom=""
                leaveTo="opacity-0"
              >
                <Popover.Panel className="flex flex-col fixed w-full sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-screen z-50 inset-x-0 text-sm text-ui-fg-on-color top-0">
                  <div className="flex flex-col h-full bg-principal-950 justify-between p-6">
                    <div className="flex justify-end" id="xmark">
                      <button
                        className="text-principal-0 font-bold text-xl"
                        onClick={close}
                      >
                        <img src="/close.svg" height={20} width={20} />
                      </button>
                    </div>
                    <ul className="flex flex-col w-full gap-6 items-start justify-start">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        return (
                          <li key={name} className="w-full">
                            <LocalizedClientLink
                              href={href}
                              className="text-md leading-10 hover:text-ui-fg-disabled text-principal-0"
                              onClick={close}
                            >
                              <p> {name}</p>
                            </LocalizedClientLink>
                          </li>
                        )
                      })}
                    </ul>
                    <div className="flex flex-col gap-y-6">
                      <div
                        className="flex justify-between"
                        onMouseEnter={toggleState.open}
                        onMouseLeave={toggleState.close}
                      >
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            toggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                      <Text className="flex justify-between txt-compact-small text-principal-0">
                        © {new Date().getFullYear()} Zacal reserved.
                      </Text>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
