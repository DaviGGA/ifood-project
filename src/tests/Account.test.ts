import { describe, expect, it } from "vitest";
import crypto from "crypto"
import { Account } from "../domain/entities/Account";

describe("Account tests", () => {

    it("It should create an Account successfully" , () => {
        const input = {
            email: "john.doe@hotmail.com",
            password: "1234asd!"
        }

        const account = Account.create(input.email,input.password);
        expect(account).toBeDefined();
    })

    it("Should throw error when creating Account with wrong email", () => {
        const input = {
            email: "john.doe",
            password: "1234asd!"
        }       

        expect(() => Account.create(input.email, input.password)).toThrow(new Error("Invalid email"))
    })

    it("Should throw error when creating Account with password smaller than eight", () => {
        const input = {
            email: "john.doe@hotmail.com",
            password: "1234"
        }       

        expect(() => Account.create(input.email, input.password)).
        toThrow(new Error("Password length can't be shorter than eight characters"))
    })

    it("Should throw error when creating Account with password without digit", () => {
        const input = {
            email: "john.doe@hotmail.com",
            password: "!bcdefgh"
        }       

        expect(() => Account.create(input.email, input.password)).
        toThrow(new Error("Password must contain atleast one digit"))
    })

    it("Should throw error when creating Account with password without special character", () => {
        const input = {
            email: "john.doe@hotmail.com",
            password: "1bcdefgh"
        }       

        expect(() => Account.create(input.email, input.password)).
        toThrow(new Error("Password must contain atleast one special character"))
    })


})