import { RouteConfig } from "@medusajs/admin"


const CustomPage = () => {

    return (
        <div>
            This is my custom route
        </div>
    )
}
export const config: RouteConfig = {
    link: {
        label: " Imagen categoria-producto",
    },
}
export default CustomPage
