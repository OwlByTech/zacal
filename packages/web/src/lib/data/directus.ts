import { authentication, createDirectus, rest } from "@directus/sdk"

const directus = createDirectus("http://0.0.0.0:8055")
  .with(rest({ credentials: "include" }))
  .with(authentication("cookie", { credentials: "include" }))

directus.login("zacal@zacal.co", "zacal")

export default directus
