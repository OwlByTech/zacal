import { ProductOption, TransactionBaseService } from "@medusajs/medusa";
import { FilterProducts } from "src/types/filter-products";
import ProductOptionValueRepository from "@medusajs/medusa/dist/repositories/product-option-value";
import { ProductOptionValue } from "@medusajs/medusa/dist/models/product-option-value";
import ProductOptionRepository from "src/repositories/product-option";
type InjectedDependencies = {
    productOptionRepository: typeof ProductOptionRepository;
    productOptionValueRepository: typeof ProductOptionValueRepository
};

class ProductOptionService extends TransactionBaseService {
    protected productOptionRepository_: typeof ProductOptionRepository;
    protected productOptionValueRepository_: typeof ProductOptionValueRepository

    constructor({ productOptionRepository, productOptionValueRepository }: InjectedDependencies) {
        super(arguments[0]);
        this.productOptionRepository_ = productOptionRepository;
        this.productOptionValueRepository_ = productOptionValueRepository;
    }


    async find() {
        const query_option = await this.productOptionRepository_.createQueryBuilder("option")
            .select("option.id", "id")
            .select("LOWER(option.title)", "option")
            .distinct(true)
            .getRawMany()
        const options = []
        for (let i = 0; i < query_option.length; i++) {
            const query = await this.productOptionRepository_.createQueryBuilder("option")
                .select("option_value.id", "id")
                .select("LOWER(option_value.value)", "value")
                .distinct(true)
                .innerJoin(ProductOptionValue, "option_value", "option.id=option_value.option_id")
                .where(`LOWER(option.title)= '${query_option[i].option}'`)
                .getRawMany()

            options.push({ option: query_option[i].option, values: query.map((value) => (value.value)) })
        }

        return options
    }

}

export default ProductOptionService;
