import { Image as MedusaImage } from "@medusajs/medusa"
import { Container } from "@medusajs/ui"
import Image from "next/image"

type ImageGalleryProps = {
  images: MedusaImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="flex flex-col gap-2  ">
      <div className="flex flex-row overflow-x-auto h-28 gap-2 sticky top-36 bg-white pb-2 border-b-2 border-gray-900">
        {images.map((image, index) => {
          return (
            <img
              src={image.url}
              className="h-full object-fill rounded-none inset-0 hover:scale-110"
              alt={`Product image ${index + 1}`}
              sizes="(max-width: 576px) 80px, (max-width: 768px) 100px, (max-width: 992px) 150px, 100px"
              style={{
                objectFit: "fill",
              }}
            />
          )
        })}
      </div>
      <div className="flex flex-col overflow-y-auto  gap-y-4">
        {images.map((image, index) => {
          return (
            <Container
              key={image.id}
              className="relative aspect-[29/34] w-full rounded-none overflow-hidden bg-ui-bg-subtle"
              id={image.id}
            >
              <img
                src={image.url}
                className="h-full w-full object-fill absolute rounded-none inset-0 border border-black"
                alt={`Product image ${index + 1}`}
                sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
              />
            </Container>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
