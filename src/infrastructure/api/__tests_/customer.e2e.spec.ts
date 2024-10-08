import { app, sequelize } from "../express"
import request from 'supertest';

describe('E2E test for customer', () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("Should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "Josh",
                address: {
                    street: "Street",
                    number: 123,
                    zip: "12354",
                    city: "City"
                }
            })

        expect(response.status).toBe(200)
        expect(response.body.name).toBe("Josh")
        expect(response.body.address.street).toBe("Street")
        expect(response.body.address.city).toBe("City")
        expect(response.body.address.number).toBe(123)
        expect(response.body.address.zip).toBe("12354")

    })

    it("Should not create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "Josh",
            })

        expect(response.status).toBe(500)
    })

    it("shouold list all customers", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "Josh",
                address: {
                    street: "Street",
                    number: 123,
                    zip: "12354",
                    city: "City"
                }
            })

        expect(response.status).toBe(200)

        const response2 = await request(app)
            .post("/customer")
            .send({
                name: "Jonh",
                address: {
                    street: "Street 2",
                    number: 321,
                    zip: "54321",
                    city: "City 2"
                }
            })

        expect(response2.status).toBe(200)

        const listResponse = await request(app).get("/customer").send()

        expect(listResponse.status).toBe(200)
        expect(listResponse.body.customers.length).toBe(2)

        const customer = listResponse.body.customers[0]
        expect(customer.name).toBe("Josh")
        expect(customer.address.street).toBe("Street")

        const customer2 = listResponse.body.customers[1]
        expect(customer2.name).toBe("Jonh")
        expect(customer2.address.street).toBe("Street 2")
        
    })

})