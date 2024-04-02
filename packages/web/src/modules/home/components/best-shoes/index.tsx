"use client"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Arrow from "@modules/common/components/arrow"
import { useEffect, useState } from "react"
import directus from "@lib/data/directus"
import { readItems } from "@directus/sdk"

export default function BestShoes() {
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
    <>
      {posts.map((post) => {
        return (
          <section className="flex flex-row">
            <div
              style={{
                backgroundSize: "100% 100%",
                backgroundImage: `url("http://localhost:8055/assets/${post.photo}")`,
              }}
              className="h-[800px] w-[1300px]"
            >
              <LocalizedClientLink
                className="p-[10px] border border-principal-950 bg-principal-0 hover:bg-principal-400 absolute"
                href="/"
              >
                Casual
              </LocalizedClientLink>
            </div>

            <div className="flex flex-col">
              <div
                style={{
                  backgroundSize: "100% 100%",
                  backgroundImage: `url("http://localhost:8055/assets/${post.photo_two}")`,
                }}
                className="h-[400px] w-[700px]"
              >
                <LocalizedClientLink
                  className="p-[10px] border border-principal-950 bg-principal-0 hover:bg-principal-400 absolute"
                  href="/"
                >
                  Sports
                </LocalizedClientLink>
              </div>

              <div
                style={{
                  backgroundSize: "100% 100%",
                  backgroundImage: `url("http://localhost:8055/assets/${post.photo_three}")`,
                }}
                className="h-[400px] w-[700px]"
              >
                <LocalizedClientLink
                  className="p-[10px] border border-principal-950 bg-principal-0 hover:bg-principal-400 absolute"
                  href="/"
                >
                  Belts
                </LocalizedClientLink>
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}
