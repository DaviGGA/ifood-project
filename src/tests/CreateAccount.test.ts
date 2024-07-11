import { beforeEach, describe, expect, it } from "vitest";
import { Account } from "../domain/entities/Account";
import sinon from "sinon";
import { AccountRepositoryDatabase } from "../infra/repository/AccountRepository";
import { CreateAccount } from "../application/usecases/CreateAccount";
import { PgPromiseAdapter } from "../infra/database/DatabaseConnection";

let createAccount: CreateAccount

describe("CreateAccount usecase tests", () => {

    beforeEach(async () => {
        const connection = new PgPromiseAdapter();
        const accountRepository = new AccountRepositoryDatabase(connection);
        createAccount = new CreateAccount(accountRepository);
    })


    it("Create a account succesfully", async () => {
        const input = {
            email: "john.doe@hotmail.com",
            password: "1234asdf!",
            confirmPassword: "1234asdf!"
        }

        const insertAccountStub = sinon.
        stub(AccountRepositoryDatabase.prototype, "insertAccount").
        resolves();

        const result = await createAccount.execute(input);
        expect(result.accountId).toBeDefined();
        
        insertAccountStub.restore();
    })

    it("Should throw error when password is different from confirmPassword", async () => {
        const input = {
            email: "john.doe@hotmail.com",
            password: "aaaa123!",
            confirmPassword: "1234asdf!"
        }

        const insertAccountStub = sinon.
        stub(AccountRepositoryDatabase.prototype, "insertAccount").
        resolves();

        await expect(async () => createAccount.execute(input)).rejects.toThrow(new Error("Passwords doesn't match"));
        
        insertAccountStub.restore();    
    })
})