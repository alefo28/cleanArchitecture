import CreateProductUseCase from "./create.product.usecase"

const input = {
    type: "a",
    name: "Product 1",
    price: 15.99
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        Update: jest.fn(),
    }
}

describe('Unit Test create Product use case', () => {

    it("Should create a product", async () => {

        const productRepository = MockRepository()
        const usecase = new CreateProductUseCase(productRepository)

        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })

    })

    it("should thrown an error when the name is missing", async () => {

        const productRepository = MockRepository()
        const usecase = new CreateProductUseCase(productRepository)

        input.name = ""

        expect(usecase.execute(input)).rejects.toThrow("Name is required")

    })

    it("should thrown an error when the price is lower or equal than 0", async () => {

        const productRepository = MockRepository()
        const usecase = new CreateProductUseCase(productRepository)

        input.name = "Product 1"
        input.price = -1

        expect(usecase.execute(input)).rejects.toThrow("price must be greater than 0")

    })
})