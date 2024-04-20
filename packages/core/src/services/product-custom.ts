import { TransactionBaseService } from "@medusajs/medusa";
import { EntityManager, IsNull, Not } from "typeorm";
import { MoneyAmount } from "@medusajs/medusa/dist/models/money-amount";
import { ProductVariant } from "@medusajs/medusa/dist/models/product-variant";
import { ProductOptionValue } from "@medusajs/medusa/dist/models/product-option-value";
import { ProductOption } from "@medusajs/medusa/dist/models/product-option";

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
        const query = this.productRepository_.createQueryBuilder("product")
        query.addSelect("money_amount.amount", "amount")
        if (data.category && data.category.length > 0) {
            query.innerJoin("product_category_product", "product_category_product", "product.id=product_category_product.product_id")
        }
        query.innerJoin(ProductVariant, "variant", "product.id=variant.product_id")
        if (data.size && data.size.length > 0) {
            query.innerJoin(ProductOptionValue, "option_size", "variant.id=option_size.variant_id")
        }
        if (data.color && data.color.length > 0) {
            query.innerJoin(ProductOptionValue, "option_color", "variant.id=option_color.variant_id")
        }

        query.innerJoin("product_variant_money_amount", "product_variant_money_amount", "variant.id=product_variant_money_amount.variant_id")
            .innerJoin(MoneyAmount, "money_amount", "product_variant_money_amount.money_amount_id=money_amount.id")
        data.category && data.category.length > 0 && query.andWhere("product_category_product.product_category_id IN (:...categories)", { categories: data.category })

        if (data.material && data.material.length > 0) {
            query.andWhere(`(${this.likeArray(data.material, "product.material")})`)
        }
        if (data.color && data.color.length > 0) {
            query.andWhere(`(${this.likeArray(data.color, "option_color.value")})`)
        }
        if (data.size && data.size.length > 0) {
            query.andWhere("(option_size.value IN (:...size))", { size: data.size })
        }

        if (data.minPrice && data.maxPrice > 0) {
            query.andWhere("(money_amount.amount>= :minPrice AND money_amount.amount<= :maxPrice ) ", { minPrice: data.minPrice * 100, maxPrice: data.maxPrice * 100 })
        }

        query.andWhere("product.status= :status", { status: "published" })
        query.skip(data.skip ? data.skip : 0).take(data.take ? data.take : 20)
        if (data.sort) {
            data.sort === 'price_desc' && query.orderBy("amount", "DESC")
            data.sort === 'price_asc' && query.orderBy("amount", "ASC")
            data.sort === 'created_at' && query.orderBy("product.created_at", "ASC")
        }
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


}
export default ProductCustomService;
