import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import Address from "../../../domain/customer/value-objeto/address"
import UpdateCustomerUseCase from "./update.customer.usecase"


const customer = CustomerFactory.createWithAddress("Josh", new Address("Street", 123, "Zip", "City"))

const input = {
    id: customer.id,
    name: "Josh Updated",
    address: {
        street: "Street Updated",
        number: 123,
        zip: "Zip Updated",
        city: "City Updated"
    }
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        Update: jest.fn(),
    }
}


describe('Unit Test Update Customer use case', () => {

    it("should update a customer", async () => {

        const customerRepository = MockRepository()
        const usecase = new UpdateCustomerUseCase(customerRepository)

        const output = await usecase.execute(input)

        expect(output).toEqual(input)
    })

})
