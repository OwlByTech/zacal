"use client"
import { Image as MedusaImage } from "@medusajs/medusa"
import { useCallback, useEffect, useRef, useState } from "react"
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom"
type ImageGalleryProps = {
  images: MedusaImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const containerRef = useRef(null)

  const [imageIndex, setImageIndex] = useState(0)
  const imgRef = useRef()
  const onUpdate = useCallback(({ x, y, scale }) => {
    const { current: img } = imgRef
    // check if image exists
    if (img) {
      const value = make3dTransformValue({ x, y, scale })
      img.style.setProperty("transform", value)
    }
  }, [])
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
        <div
          key={images[imageIndex].id}
          className="container-gallery relative cursor-zoom-in  w-full h-full flex-grow rounded-none overflow-x-auto my-2 border border-black"
          id={images[imageIndex].id}
          ref={containerRef}
        >
          <QuickPinchZoom
            onUpdate={onUpdate}
            tapZoomFactor={4}
            zoomOutFactor={2}
            inertiaFriction={0}
            maxZoom={2}
            minZoom={1}
            doubleTapZoomOutOnMaxScale={true}
          >
            <img
              ref={imgRef}
              src={images[imageIndex].url}
              className="container-gallery object-fill aspect-[28/34] h-full w-full rounded-none inset-0 "
              alt={`Product image ${+1}`}
              sizes="(max-width: 576px) 240px, (max-width: 768px) 320px, (max-width: 992px) 440px, 760px"
            />
          </QuickPinchZoom>
        </div>
      </div>
    </>
  )
}

export default ImageGallery
