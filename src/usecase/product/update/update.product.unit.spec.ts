import ProductFactory from "../../../domain/product/factory/product.factory"
import UpdateProductUseCase from "./update.product.usecase"

const product = ProductFactory.create("a", "Product", 15)

const input = {
    id: product.id,
    name: "Product Updated",
    price: 15.99
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        Update: jest.fn(),
    }
}

describe('Unit Test Update Product use case', () => {

    it("should update a product", async () => {

        const productRepository = MockRepository()
        const usecase = new UpdateProductUseCase(productRepository)

        const output = await usecase.execute(input)

        expect(output).toEqual(input)
    })

})