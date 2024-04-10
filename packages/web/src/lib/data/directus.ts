import * as dotenv from "dotenv"
import { authentication, createDirectus, rest } from "@directus/sdk"

const directus = createDirectus(process.env.API_URL)
  .with(rest({ credentials: "include" }))
  .with(authentication("cookie", { credentials: "include" }))

directus.login(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD)

export default directus
