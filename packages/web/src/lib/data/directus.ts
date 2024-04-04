import * as dotenv from "dotenv"
import { authentication, createDirectus, rest } from "@directus/sdk"

const directus = createDirectus(process.env.API_URL_DIRECTUS)
  .with(rest({ credentials: "include" }))
  .with(authentication("cookie", { credentials: "include" }))

directus.login(
  process.env.ADMIN_EMAIL_DIRECTUS,
  process.env.ADMIN_PASSWORD_DIRECTUS
)

export default directus
