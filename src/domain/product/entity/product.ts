import Entity from "../../@shared/entity/entity.abstract";
import Notification from "../../@shared/notification/notification";
import NotificationError from "../../@shared/notification/notification.error";
import ProductValidatorFactory from "../factory/product.validator.factory";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface {

    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        super()
        this._id = id;
        this._name = name;
        this._price = price
        this.validate();

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors())
        }
    }

    validate(): boolean {
        /* if (this._id.length === 0) {
            this.notification.addError({ message: "Id is required", context: "product" })
        }

        if (this._name.length === 0) {
            this.notification.addError({ message: "Name is required", context: "product" })
        }

        if (this._price < 0) {
            this.notification.addError({ message: "price must be greater than 0", context: "product" })
        } */

        ProductValidatorFactory.create().validate(this)


        return true
    }

    changeName(name: string): void {
        this._name = name;
        this.validate()
    }
    get name(): string {
        return this._name
    }

    get price(): number {
        return this._price
    }

    get id(): string {
        return this._id
    }

    changePrice(price: number): void {
        this._price = price
        this.validate()
    }

}