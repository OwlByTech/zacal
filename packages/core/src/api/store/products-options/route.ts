import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import ProductOptionService from "src/services/product-option";

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
): Promise<void> {
    const productOptionService: ProductOptionService = req.scope.resolve("productOptionService")
    const products = await productOptionService.find()
    res.json(products);
}

