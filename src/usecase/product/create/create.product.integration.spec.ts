import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Test Integration create Product use case", () => {

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

    it("Should create a product", async () => {

        const productRepository = new ProductRepository()
        const usecase = new CreateProductUseCase(productRepository)

        const input = {
            type: "a",
            name: "Product 1",
            price: 15.99
        }

        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })

    })

    it("should thrown an error when the name is missing", async () => {

        const productRepository = new ProductRepository()
        const usecase = new CreateProductUseCase(productRepository)

        const input = {
            type: "a",
            name: "",
            price: 15.99
        }

        expect(usecase.execute(input)).rejects.toThrow("Name is required")

    })

    it("should thrown an error when the price is lower or equal than 0", async () => {

        const productRepository = new ProductRepository()
        const usecase = new CreateProductUseCase(productRepository)

        const input = {
            type: "a",
            name: "Product 1",
            price: -1
        }

        expect(usecase.execute(input)).rejects.toThrow("Price must be grater than 0")

    })

})