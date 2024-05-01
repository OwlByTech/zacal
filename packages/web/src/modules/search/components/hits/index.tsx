import { clx } from "@medusajs/ui"
import React from "react"
import {
  UseHitsProps,
  useHits,
  useSearchBox,
} from "react-instantsearch-hooks-web"

import { ProductHit } from "../hit"
import ShowAll from "../show-all"
import { Region } from "@medusajs/medusa"

type HitsProps<THit> = React.ComponentProps<"div"> &
  UseHitsProps & {
    hitComponent: (props: {
      hit: THit
      header: any
      region: Region
    }) => JSX.Element
    header: any
    region: Region
  }

const Hits = ({
  hitComponent: Hit,
  className,
  header,
  region,
  ...props
}: HitsProps<ProductHit>) => {
  const { query } = useSearchBox()
  const { hits } = useHits(props)

  console.log(hits)
  return (
    <div
      className={clx(
        "transition-[height,max-height,opacity] h-full duration-300 ease-in-out sm:overflow-hidden  mb-1 p-px",
        className,
        {
          "max-h-full opacity-100": !!query,
          "max-h-0 opacity-0": !query && !hits.length,
        }
      )}
    >
      <div className="flex flex-col gap-5 mb-4 px-8 sm:p-2 sm:grid sm:grid-cols-2 small:grid-cols-3 overflow-scroll ">
        {hits.slice(0, 6).map((hit, index) => (
          <>
            {hit.status === "published" && hit.thumbnail && (
              <li
                key={index}
                className={clx("list-none ", {
                  "hidden sm:block": index > 2,
                })}
              >
                <Hit
                  hit={hit as unknown as ProductHit}
                  header={header}
                  region={region}
                />
              </li>
            )}
          </>
        ))}
      </div>
      <ShowAll />
    </div>
  )
}

export default Hits
