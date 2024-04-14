import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: PricedProduct
  region: Region
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <div className="content-container flex flex-col justify-center small:px-40 small:flex-row small:items-start gap-10 relative">
        <div className="hidden small:flex flex-col small:sticky small:top-48 small:py-0 small:w-1/4 py-8 gap-y-12">
          <ProductInfo product={product} />
          <ProductTabs product={product} />
        </div>

        <div className="flex flex-col small:sticky small:top-48 small:py-0 sm:w-2/4 py-8 gap-y-4">
          <ImageGallery images={product?.images || []} />
        </div>
        <div className="small:hidden flex flex-col small:sticky small:top-48 small:py-0 small:w-1/4 py-8 gap-y-12">
          <ProductInfo product={product} />
          <ProductTabs product={product} />
        </div>
        <div className="flex flex-col small:sticky small:top-48 small:py-0 sm:w-1/4 py-8 gap-y-12">
          <ProductOnboardingCta />
          <Suspense
            fallback={<ProductActions product={product} region={region} />}
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </div>
      </div>
      <div className="content-container my-16 small:my-32 px-20">
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
