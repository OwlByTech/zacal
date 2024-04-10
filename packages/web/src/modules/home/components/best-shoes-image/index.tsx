import LocalizedClientLink from "@modules/common/components/localized-client-link"
import directus from "@lib/data/directus"
import { readAssetRaw, readItems } from "@directus/sdk"

export async function BestShoeImage({ post }: { post: any }) {
  const result = await directus.request(readAssetRaw(post.photo))
  console.log(result)
  return (
    <>
      <LocalizedClientLink
        style={{
          backgroundSize: "100% 100%",
          backgroundImage: result,
        }}
        className="w-full h-[600px]"
        href={`/categories/${post.handle}`}
      >
        <p className="p-[10px] border border-principal-950 bg-principal-0 hover:bg-principal-400 absolute">
          {post.name}
        </p>
      </LocalizedClientLink>
    </>
  )
}
