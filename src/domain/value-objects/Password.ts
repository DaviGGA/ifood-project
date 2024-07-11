import bcrypt from "bcrypt"

export class Password {
    private value: string 

    constructor(password: string) {
        this.verify(password);
        const hashedPassword = bcrypt.hashSync(password, 10);
        this.value = hashedPassword;
    }

    private verify(password: string) {
        if(!password) throw new Error("Password can't be null or undefined");
        if(password.length < 8) throw new Error("Password length can't be shorter than eight characters");
        if(!password.match(/[^\w\s]/)) throw Error("Password must contain atleast one special character");
        if(!password.match(/\d/)) throw Error("Password must contain atleast one digit");
    }

    getValue(): string {
        return this.value
    }
}