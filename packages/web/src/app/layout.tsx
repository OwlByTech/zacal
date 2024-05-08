import { Metadata } from "next"
import localFont from "next/font/local"
import "styles/globals.css"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}
const raleway = localFont({
  src: [{ path: "../../public/font/Raleway-VariableFont_wght.ttf" }],
})
export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <main className={`${raleway.className} relative`}>
          {props.children}
        </main>
      </body>
    </html>
  )
}
