import CreateCustomerUseCase from "./create.customer.usecase"

const input = {
    name: "John",
    address: {
        street: "Street",
        number: 1,
        zip: "Zip",
        city: "City"
    }
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        Update: jest.fn(),
    }
}

describe('Unit Test create Customer use case', () => {

    it("Should create a customer", async () => {

        const customerRepository = MockRepository()
        const usecase = new CreateCustomerUseCase(customerRepository)

        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city
            }
        })

    })

    it("should thrown an error when the name is missing", async () => {

        const customerRepository = MockRepository()
        const usecase = new CreateCustomerUseCase(customerRepository)

        input.name = ""

        expect(usecase.execute(input)).rejects.toThrow("Name is required")

    })

    it("should thrown an error when the street is missing", async () => {

        const customerRepository = MockRepository()
        const usecase = new CreateCustomerUseCase(customerRepository)

        input.address.street = ""

        expect(usecase.execute(input)).rejects.toThrow("Street is requires")

    })
})
