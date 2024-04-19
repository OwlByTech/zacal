import { TransactionBaseService } from "@medusajs/medusa";
import { EntityManager, IsNull, Not } from "typeorm";
import { MoneyAmount } from "@medusajs/medusa/dist/models/money-amount";
import { ProductVariant } from "@medusajs/medusa/dist/models/product-variant";
import { ProductOptionValue } from "@medusajs/medusa/dist/models/product-option-value";
import { FilterProducts } from "src/types/filter-products";
import ProductRepository from "@medusajs/medusa/dist/repositories/product";
type InjectedDependencies = {
    manager: EntityManager;
    productRepository: typeof ProductRepository;
};

class ProductCustomService extends TransactionBaseService {
    protected productRepository_: typeof ProductRepository;

    constructor({ productRepository }: InjectedDependencies) {

        super(arguments[0]);

        this.productRepository_ = productRepository;
    }


    async find(data?: FilterProducts): Promise<any> {
        console.log(data)
        const query = this.productRepository_.createQueryBuilder("product")
        if (data.category && data.category.length > 0) {
            query.innerJoin("product_category_product", "product_category_product", "product.id=product_category_product.product_id")
        }
        if ((data.size && data.size.length > 0) || (data.minPrice && data.maxPrice) || (data.color && data.color.length > 0)) {
            query.innerJoin(ProductVariant, "variant", "product.id=variant.product_id")
        }
        if ((data.size && data.size.length > 0 || (data.color && data.color.length > 0))) {
            query.innerJoin(ProductOptionValue, "option", "variant.id=option.variant_id")
        }
        if ((data.maxPrice && data.minPrice)) {
            query.innerJoin("product_variant_money_amount", "product_variant_money_amount", "variant.id=product_variant_money_amount.variant_id")
                .innerJoin(MoneyAmount, "money_amount", "product_variant_money_amount.money_amount_id=money_amount.id")
        }

        data.category && data.category.length > 0 && query.where("product_category_product.product_category_id IN (:...categories)", { categories: data.category })
        data.material && data.material.length > 0 && query.andWhere(`${this.likeArray(data.material, "product.material")}`)
        data.color && data.color.length > 0 && query.andWhere(`${this.likeArray(data.color, "option.value")}`)
        data.size && data.size.length > 0 && query.andWhere("option.value IN (:...size)", { size: data.size })
        data.minPrice && data.maxPrice > 0 && query.andWhere("money_amount.amount>= :minPrice AND money_amount.amount<= :maxPrice ", { minPrice: data.minPrice, maxPrice: data.maxPrice })

        query.skip(data.skip ? data.skip : 0).take(data.take ? data.take : 20)
        const response = await query.getManyAndCount()

        return { products: response[0], count: response[1] }

    }

    likeArray(array: string[], option: string) {
        let query = ''
        for (let i = 0; i < array.length; i++) {
            query += `LOWER(${option}) LIKE '%${array[i].toLowerCase()}%'`
            if (i !== array.length - 1) {
                query += " OR "
            }
        }
        return query
    }

    async findMaterials() {

        return this.productRepository_.createQueryBuilder("product").select("product.material", "material")
            .distinct(true)
    }

}
export default ProductCustomService;
