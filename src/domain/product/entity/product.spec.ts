import Product from "./product"


describe("Product unit tests", () => {

    it("Should throw error when id is empty", () => {
        expect(() => {

            const product = new Product("", "product 1", 100)

        }).toThrow("product: Id is required")

    })

    it("Should throw error when name is empty", () => {
        expect(() => {

            const product = new Product("123", "", 100)

        }).toThrow("product: Name is required")

    })

    it("Should throw error when id and name is empty", () => {
        expect(() => {

            const product = new Product("", "", 100)

        }).toThrow("product: Id is required, product: Name is required")

    })

    it("Should throw error when price is less than 0", () => {
        expect(() => {

            const product = new Product("123", "product 1", -1)

        }).toThrow("product: price must be greater than 0")

    })

    it("Should throw error when id and name is empty and price is less than '", () => {
        expect(() => {

            const product = new Product("", "", -1)

        }).toThrow("product: Id is required, product: Name is required, product: price must be greater than 0")

    })

    it("Should change name", () => {
        const product = new Product("123", "product 1", 100)
        product.changeName("Product 2")
        expect(product.name).toBe("Product 2")
    })

    it("Should change price", () => {

        const product = new Product("123", "product 1", 100)
        product.changePrice(150)
        expect(product.price).toBe(150)

    })

}) 