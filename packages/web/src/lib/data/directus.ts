import * as dotenv from "dotenv"
import { authentication, createDirectus, rest } from "@directus/sdk"

dotenv.config()
const username = process.env.ADMIN_EMAIL
const password = process.env.ADMIN_PASSWORD

const directus = createDirectus("http://0.0.0.0:8055")
  .with(rest({ credentials: "include" }))
  .with(authentication("cookie", { credentials: "include" }))

directus.login(username, password)

export default directus
