import { Account } from "../../domain/entities/Account";
import { AccountRepository } from "../../infra/repository/AccountRepository"

type Input =  {
    email: string,
    password: string,
    confirmPassword: string
}

type Output = {
    accountId: string
}

export class CreateAccount {

    constructor(readonly accountRepository: AccountRepository) {}

    async execute(input: Input): Promise<Output> {
        if(input.password != input.confirmPassword) throw new Error("Passwords doesn't match");
        const account = Account.create(input.email, input.password);
        await this.accountRepository.insertAccount(account);
        return {accountId: account.getAccountId()}
    }

}