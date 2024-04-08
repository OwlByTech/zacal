"use client"
import { Image as MedusaImage } from "@medusajs/medusa"
import { Container } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"

type ImageGalleryProps = {
  images: MedusaImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const containerRef = useRef(null)
  const containerImage = useRef(null)
  const scrollToSection = (id) => {
    const image = document.getElementById(id)
    image?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    })
  }

  return (
    <>
      <div
        className="flex flex-row overflow-x-auto sticky top-20 z-20 bg-white  border-b-2 border-gray-500 py-2 gap-x-4"
        ref={containerRef}
      >
        {images.map((image, index) => {
          return (
            <button
              onClick={() => {
                scrollToSection(image.id)
              }}
            >
              <img
                src={image.url}
                className="h-20 w-16 object-fill rounded-none hover:border hover:border-black "
                alt={`Product image ${index + 1}`}
              />
            </button>
          )
        })}
      </div>
      <div className="px-1 gap-2 inline-block overflow-y-auto">
        {images.map((image, index) => {
          return (
            <Container
              key={image.id}
              className="container-gallery relative aspect-[29/34] w-full rounded-none overflow-hidden bg-ui-bg-subtle px-1 my-2 "
              id={image.id}
              ref={containerRef}
            >
              <img
                src={image.url}
                className=" container-gallery h-full w-full object-fill absolute rounded-none inset-0 border border-black"
                alt={`Product image ${index + 1}`}
                sizes="(max-width: 576px) 240px, (max-width: 768px) 320px, (max-width: 992px) 440px, 760px"
              />
            </Container>
          )
        })}
      </div>
    </>
  )
}

export default ImageGallery
