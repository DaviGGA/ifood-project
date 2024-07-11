import { Account } from "../../domain/entities/Account";
import DatabaseConnection from "../database/DatabaseConnection";

export interface AccountRepository {
    insertAccount(account: Account): Promise<void>
}

export class AccountRepositoryDatabase implements AccountRepository {
    
    constructor(readonly connection: DatabaseConnection) {}

    async insertAccount(account: Account): Promise<void> {
        console.log()
        await this.connection.query(
            "insert into ifood.accounts (id, email, password) values ($1, $2, $3)",
            [account.getAccountId(), account.getEmail(), account.getPassword()]
        )
    }
}