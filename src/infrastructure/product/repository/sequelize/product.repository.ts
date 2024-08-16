
import Product from "../../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductRepositoryInterface {

    async create(entity: Product): Promise<void> {

        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price
        })

    }

    async Update(entity: Product): Promise<void> {
        await ProductModel.update({
            id: entity.id,
            name: entity.name,
            price: entity.price
        }, {
            where: {
                id: entity.id
            }
        })
    }

    async find(id: string): Promise<Product> {

        let product

        try {
            product = await ProductModel.findOne({
                where: {
                    id,
                },
                rejectOnEmpty: true,
            });
        } catch (error) {
            throw new Error("Product not found");
        }

        return new Product(product.id, product.name, product.price)
    }

    async findAll(): Promise<Product[]> {
        const products = await ProductModel.findAll()

        return products.map((product) => new Product(product.id, product.name, product.price))
    }

}