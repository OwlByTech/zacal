"use client"

import { InstantSearch } from "react-instantsearch-hooks-web"
import { useRouter } from "next/navigation"
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
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 -0.5 21 21"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs></defs>
                  <g
                    id="Page-1"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      id="Dribbble-Light-Preview"
                      transform="translate(-419.000000, -240.000000)"
                      fill="#000000"
                    >
                      <g
                        id="icons"
                        transform="translate(56.000000, 160.000000)"
                      >
                        <polygon
                          id="close-[#1511]"
                          points="375.0183 90 384 98.554 382.48065 100 373.5 91.446 364.5183 100 363 98.554 371.98065 90 363 81.446 364.5183 80 373.5 88.554 382.48065 80 384 81.446"
                        ></polygon>
                      </g>
                    </g>
                  </g>
                </svg>
              </button>
              <div className="w-full pl-2 flex items-center gap-x-1  border border-black text-ui-fg-on-color backdrop-blur-2xl rounded-none">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
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
