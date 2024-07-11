import crypto from "crypto"
import bcrypt from "bcrypt"
import { Email } from "../value-objects/Email";
import { Password } from "../value-objects/Password";

export class Account {
    
    private constructor(private accountId: string, private email: Email, public password: Password) {}

    static create(email: string, password: string) {
        const accountId = crypto.randomUUID();
        return new Account(accountId, new Email(email), new Password(password));
    }

    static restore (accountId: string, email: string, password: string) {
        return new Account(accountId, new Email(email), new Password(password));
    }

    getEmail(): string {
        return this.email.getValue()
    }

    getPassword(): string {
        return this.password.getValue();
    }

    getAccountId(): string {
        return this.accountId
    }

}