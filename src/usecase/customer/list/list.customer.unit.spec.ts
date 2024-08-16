import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-objeto/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress("Josh Nachos", new Address("Street 1", 123, "Zip 1", "City 1"))
const customer2 = CustomerFactory.createWithAddress("Jonh Doe", new Address("Street 2", 321, "Zip 2", "City 2"))

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        create: jest.fn(),
        Update: jest.fn(),
    }
}

const input = {}

describe('Unit Test for listing customer use case', () => {

    it("Shoult list a customer", async () => {
        const repository = MockRepository()
        const usecase = new ListCustomerUseCase(repository)
        const output = await usecase.execute(input)

        expect(output.customers.length).toBe(2)
        expect(output.customers[0].id).toBe(customer1.id)
        expect(output.customers[0].name).toBe(customer1.name)
        expect(output.customers[0].address.street).toBe(customer1.Address.street)

        expect(output.customers[1].id).toBe(customer2.id)
        expect(output.customers[1].name).toBe(customer2.name)
        expect(output.customers[1].address.street).toBe(customer2.Address.street)
    })

})
