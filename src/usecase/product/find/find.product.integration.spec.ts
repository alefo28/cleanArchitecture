import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import FindProductUseCase from "./find.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";

describe("Test Integration find Product use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([ProductModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should find a Product", async () => {

        const productRepository = new ProductRepository()
        const usecase = new FindProductUseCase(productRepository)

        const product = new Product("123", "Product 1", 15.99)

        await productRepository.create(product)

        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "Product 1",
            price: 15.99
        }

        const result = await usecase.execute(input)

        expect(result).toEqual(output)
    })

    it("should not find a product", async () => {

        const productRepository = new ProductRepository()
        const usecase = new FindProductUseCase(productRepository)

        const input = {
            id: "123"
        }

        expect(() => {
            return usecase.execute(input)
        }).rejects.toThrow("Product not found")

    })


})