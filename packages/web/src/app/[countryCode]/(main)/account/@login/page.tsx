import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata: Metadata = {
  title: "Inicio de sesión",
  description: "Ingresa a tu cuenta de la tienda Zacal.",
}

export default function Login() {
  return <LoginTemplate />
}
