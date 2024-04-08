"use client"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useEffect, useState } from "react"
import directus from "@lib/data/directus"
import { readItems } from "@directus/sdk"

export default function BestShoes() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    directus.request(readItems("product_category")).then((result) => {
      setPosts(result)
    })
  }, [])

  return (
    <div className="flex flex-row w-screen">
      {posts.map((post) => (
        <>
          {post.photo && post.isPrincipal && (
            <LocalizedClientLink
              href={`/categories/${post.handle}`}
              className="flex flex-row w-1/3"
            >
              <div
                style={{
                  backgroundSize: "100% 100%",
                  backgroundImage: `url("${process.env.API_URL_DIRECTUS}/assets/${post.photo}")`,
                }}
                className="w-full h-[200px] sm:h-[400px] lg:h-[600px]"
              >
                <span className="text-xs sm:text-base p-1 sm:p-[10px] border border-principal-950 bg-principal-0 hover:bg-principal-400 absolute">
                  {post.name}
                </span>
              </div>
            </LocalizedClientLink>
          )}
        </>
      ))}
    </div>
  )
}
