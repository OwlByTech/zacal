import { LineItem, Region } from "@medusajs/medusa"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  items?: Omit<LineItem, "beforeInsert">[]
  region?: Region
}

const ItemsTemplate = ({ items, region }: ItemsTemplateProps) => {
  return (
    <div className="flex flex-col gap-4">
      {items && region
        ? items
            .sort((a, b) => {
              return a.created_at > b.created_at ? -1 : 1
            })
            .map((item) => {
              return <Item key={item.id} item={item} region={region} />
            })
        : Array.from(Array(5).keys()).map((i) => {
            return <SkeletonLineItem key={i} />
          })}
    </div>
  )
}

export default ItemsTemplate
