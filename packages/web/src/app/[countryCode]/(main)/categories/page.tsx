"use client"
import { readItems } from "@directus/sdk"
import directus from "@lib/data/directus"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useEffect, useState } from "react"

export default function Page() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    directus.request(readItems("product_category")).then((result) => {
      console.log(result)
      setPosts(result)
    })
    return () => {
      // Esto se ejecuta cuando el componente no este en pantalla
    }
  }, [])

  console.log(posts)

  return (
    <div className="grid grid-cols-3 w-screen">
      {posts.map((post) => (
        <>
          {post.photo && (
            <section className="flex flex-row ">
              <div
                style={{
                  backgroundSize: "100% 100%",
                  backgroundImage: `url("http://localhost:8055/assets/${post.photo}")`,
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
