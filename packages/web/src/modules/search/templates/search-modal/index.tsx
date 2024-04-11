"use client"

import { InstantSearch } from "react-instantsearch-hooks-web"
import { useRouter } from "next/navigation"
import { MagnifyingGlassMini } from "@medusajs/icons"
import { Popover, Transition } from "@headlessui/react"
import { SEARCH_INDEX_NAME, searchClient } from "@lib/search-client"
import Hit from "@modules/search/components/hit"
import Hits from "@modules/search/components/hits"
import SearchBox from "@modules/search/components/search-box"
import { Fragment, useEffect, useRef } from "react"
import { useToggleState } from "@medusajs/ui"

export default function SearchModal() {
  const router = useRouter()
  const searchRef = useRef(null)

  // close modal on outside click
  const handleOutsideClick = (event: MouseEvent) => {
    if (event.target === searchRef.current) {
      router.back()
    }
  }

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick)
    // cleanup
    return () => {
      window.removeEventListener("click", handleOutsideClick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // on escape key press, close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.back()
      }
    }
    window.addEventListener("keydown", handleEsc)

    // cleanup
    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const toggleState = useToggleState()

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button className="relative  transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base text-sm">
                  <img src="/search.svg" height={20} width={20} />
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
                <div className="fixed top-0 left-0 flex w-screen h-screen flex-row items-center justify-start z-[75] ">
                  <Popover.Panel className="flex flex-col sticky bg-principal-0 w-full h-full p-8 z-[75] top-0 text-sm text-ui-fg-on-color overflow-auto">
                    <div className="flex flex-col border border-black p-6">
                      <div className="flex w-full justify-end " id="xmark">
                        <button
                          className="text-black font-extrabold text-xl"
                          onClick={close}
                        >
                          X
                        </button>
                      </div>
                      <div className="flex flex-col justify-start gap-5">
                        <InstantSearch
                          indexName={SEARCH_INDEX_NAME}
                          searchClient={searchClient}
                        >
                          <MagnifyingGlassMini />
                          <SearchBox />
                          <Hits hitComponent={Hit} />
                        </InstantSearch>
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
