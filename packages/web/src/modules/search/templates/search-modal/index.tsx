"use client"

import { InstantSearch } from "react-instantsearch-hooks-web"
import { useParams, useRouter } from "next/navigation"
import { MagnifyingGlassMini } from "@medusajs/icons"
import { Popover, Transition } from "@headlessui/react"
import { SEARCH_INDEX_NAME, searchClient } from "@lib/search-client"
import Hit from "@modules/search/components/hit"
import Hits from "@modules/search/components/hits"
import SearchBox from "@modules/search/components/search-box"
import { Fragment, useEffect, useRef, useState } from "react"
import { useToggleState } from "@medusajs/ui"

export default function SearchModal() {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)
  const itemRef = useRef<number>(0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  return (
    <div
      className="h-full z-30"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <div className="flex items-end h-full">
        <Popover className="h-full relative">
          <>
            <div className="flex h-full flex-row items-center">
              <Popover.Button className="relative  transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base text-sm">
                <img src="/search.svg" className="w-5 h-5" />
              </Popover.Button>
            </div>

            <Transition
              show={cartDropdownOpen}
              as={Fragment}
              enter="transition ease-out duration-150"
              enterFrom=""
              enterTo=" "
              leave="transition ease-in duration-150"
              leaveFrom=" "
              leaveTo="opacity-0"
            >
              <Popover.Panel
                static
                className="shadow-lg small:block absolute top-[calc(100%+1px)] right-0 bg-white border border-black w-[500px] text-ui-fg-base"
              >
                <div className="flex flex-col p-6">
                  <div className="flex flex-col justify-start gap-5">
                    <InstantSearch
                      indexName={SEARCH_INDEX_NAME}
                      searchClient={searchClient}
                    >
                      <SearchBox />
                      <Hits hitComponent={Hit} />
                    </InstantSearch>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        </Popover>
      </div>
    </div>
  )
}
