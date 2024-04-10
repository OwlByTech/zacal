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

  // disable scroll on body when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
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
                <div className="fixed top-0 left-0 flex w-screen h-screen flex-row  items-center justify-start z-[75] ">
                  <Popover.Panel className="flex flex-col sticky w-full sm:pr-0 sm:w-1/4 2xl:w-1/4 sm:min-w-min h-screen z-[75] top-0 text-sm text-ui-fg-on-color ">
                    <div className="flex flex-col h-full bg-white border-l border-black p-6">
                      <div className="flex w-full justify-end " id="xmark">
                        <button
                          className="text-black font-extrabold text-xl"
                          onClick={close}
                        >
                          X
                        </button>
                      </div>
                      <div className="flex flex-col justify-start">
                        <InstantSearch
                          indexName={SEARCH_INDEX_NAME}
                          searchClient={searchClient}
                        >
                          <MagnifyingGlassMini />
                          <SearchBox />
                          <div className="flex-1 mt-6">
                            <Hits hitComponent={Hit} />
                          </div>
                        </InstantSearch>
                      </div>
                    </div>
                  </Popover.Panel>

                  <div className="flex-grow w-full h-full bg-gray-700 opacity-50 " />
                </div>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}
