import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { ProductOption } from "@medusajs/medusa"; "@medusajs/medusa/dist/models/product-option";

const ProductOptionRepository = dataSource.getRepository(ProductOption);

export default ProductOptionRepository;
