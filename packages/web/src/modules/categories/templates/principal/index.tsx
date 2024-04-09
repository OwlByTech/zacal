"use client"
import { readItems } from "@directus/sdk"
import directus from "@lib/data/directus"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useEffect, useState } from "react"

export default function PrincipalCategory() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    directus.request(readItems("product_category")).then((result) => {
      setPosts(result)
    })
  }, [])

  return (
    <div className="px-20 py-10 flex flex-col gap-10 ">
      <p className="text-3xl text-center w-full">Categorias</p>
      <div className=" gap-4 grid grid-cols-2 small:grid-cols-3 w-full">
        {posts.map((post) => (
          <>
            {post.photo && (
              <section className="flex flex-row shadow-md hover:shadow-xl ">
                <LocalizedClientLink
                  style={{
                    backgroundSize: "100% 100%",
                    backgroundImage: `url("${process.env.API_URL}/assets/${post.photo}")`,
                  }}
                  href={`/categories/${post.handle}`}
                  className="w-full h-[400px]"
                >
                  <span className="p-[10px] border border-principal-950 bg-principal-0 hover:bg-principal-400 absolute">
                    {post.name}
                  </span>
                </LocalizedClientLink>
              </section>
            )}
          </>
        ))}
      </div>
    </div>
  )
}
