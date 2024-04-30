"use client"
import { Image as MedusaImage } from "@medusajs/medusa"
import { Container } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

type ImageGalleryProps = {
  images: MedusaImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const containerRef = useRef(null)
  const scrollToSection = (id) => {
    const image = document.getElementById(id)
    image?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    })
  }

  const [imageIndex, setImageIndex] = useState(0)

  return (
    <>
      <div
        className="flex flex-row overflow-x-auto sticky top-[70px] z-10 bg-white  border-b-2 border-gray-500 py-2 gap-x-4"
        ref={containerRef}
      >
        {images.map((image, index) => {
          return (
            <button
              key={image.id}
              onClick={() => {
                setImageIndex(index)
              }}
            >
              <img
                src={image.url}
                className={`h-20 w-16 object-fill rounded-none hover:border hover:border-black ${
                  index === imageIndex && "border border-principal-950"
                }`}
                alt={`Product image ${index + 1}`}
              />
            </button>
          )
        })}
      </div>
      <div className="flex flex-grow px-1 gap-2  overflow-x-auto">
        <Container
          key={images[imageIndex].id}
          className="container-gallery relative aspect-[29/34] w-full rounded-none overflow-x-auto bg-ui-bg-subtle px-1 my-2 "
          id={images[imageIndex].id}
          ref={containerRef}
        >
          <img
            src={images[imageIndex].url}
            className="container-gallery h-full w-full object-cover absolute rounded-none inset-0 border border-black"
            alt={`Product image ${+1}`}
            sizes="(max-width: 576px) 240px, (max-width: 768px) 320px, (max-width: 992px) 440px, 760px"
          />
        </Container>
      </div>
    </>
  )
}

export default ImageGallery
