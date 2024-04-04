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
            <section className="flex flex-row w-1/3">
              <div
                style={{
                  backgroundSize: "100% 100%",
                  backgroundImage: `url("${process.env.API_URL_DIRECTUS}/assets/${post.photo}")`,
                }}
                className="w-full h-[600px]"
              >
                <LocalizedClientLink
                  className="p-[10px] border border-principal-950 bg-principal-0 hover:bg-principal-400 absolute"
                  href={`/categories/${post.handle}`}
                >
                  {post.name}
                </LocalizedClientLink>
              </div>
            </section>
          )}
        </>
      ))}
    </div>
  )
}
