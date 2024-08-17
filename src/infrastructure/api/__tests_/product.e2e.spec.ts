import request from 'supertest';
import { sequelize, app } from "../express"

describe('E2E test for Product', () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("Should create a Product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Product 1",
                price: 15.99
            })

        expect(response.status).toBe(200)
        expect(response.body.name).toBe("Product 1")
        expect(response.body.price).toBe(15.99)

    })

    it("Should not create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "product",
            })

        expect(response.status).toBe(500)
    })

    it("shouold list all prodict", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Product 1",
                price: 15.99
            })

        expect(response.status).toBe(200)

        const response2 = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Product 2",
                price: 14.99
            })

        expect(response2.status).toBe(200)

        const listResponse = await request(app).get("/product").send()

        expect(listResponse.status).toBe(200)
        expect(listResponse.body.products.length).toBe(2)

        const product = listResponse.body.products[0]
        expect(product.name).toBe("Product 1")
        expect(product.price).toBe(15.99)

        const product2 = listResponse.body.products[1]
        expect(product2.name).toBe("Product 2")
        expect(product2.price).toBe(14.99)


    })


})
