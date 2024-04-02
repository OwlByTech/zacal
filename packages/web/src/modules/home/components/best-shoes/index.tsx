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

  return <></>
}
