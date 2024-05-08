import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import ProductCustomService from "src/services/product-custom";

export async function POST(
    req: MedusaRequest,
    res: MedusaResponse
): Promise<void> {
    const productCustomService: ProductCustomService = req.scope.resolve("productCustomService")
    const products = await productCustomService.find(req.body)
    res.json(products);
}


