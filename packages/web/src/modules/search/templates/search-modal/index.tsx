"use client"

import { InstantSearch } from "react-instantsearch-hooks-web"
import { useRouter } from "next/navigation"
import { MagnifyingGlassMini } from "@medusajs/icons"
import { Popover, Transition } from "@headlessui/react"
import { Popover, Transition } from "@headlessui/react"
import { SEARCH_INDEX_NAME, searchClient } from "@lib/search-client"
import Hit from "@modules/search/components/hit"
import Hits from "@modules/search/components/hits"
import SearchBox from "@modules/search/components/search-box"
import { useEffect, useRef } from "react"
import { Region } from "@medusajs/medusa"

export default function SearchModal({
  header,
  region,
}: {
  header: any
  region: Region
}) {
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

  return (
    <div className="relative z-[75]">
      <div className="fixed inset-0 small:bg-opacity-75 backdrop-blur-md small:opacity-100 h-screen w-screen" />
      <div
        className="fixed bg-white small:bg-transparent inset-0 px-5 sm:p-0 w-screen h-screen"
        ref={searchRef}
      >
        <div className="flex flex-col justify-center h-fit transform p-5 items-center text-left align-middle transition-all bg-white small:bg-transparent shadow-none">
          <InstantSearch
            indexName={SEARCH_INDEX_NAME}
            searchClient={searchClient}
          >
            <div className="flex flex-col  small:h-fit  bg-white p-4  small:border small:border-black w-screen max-h-screen small:max-h-[90vh] small:w-[800px]">
              <button
                className="flex justify-end pb-4"
                onClick={() => {
                  router.back()
                }}
              >
                <img src="/close.svg" className="h-4 w-4" />
              </button>
              <div className="w-full pl-2 flex items-center gap-x-1  border border-black text-ui-fg-on-color backdrop-blur-2xl rounded-none">
                <img src="/search.svg" className="h-6 w-6" />
                <SearchBox />
              </div>
              <div className="flex-1 mt-6 overflow-auto">
                <Hits hitComponent={Hit} header={header} region={region} />
              </div>
            </div>
          </InstantSearch>
        </div>
      </div>
    </div>
  )
}
