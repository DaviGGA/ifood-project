import { CreateAccount } from "../../application/usecases/CreateAccount";
import HttpServer from "./HttpServer";

export class AccountController {
    constructor (readonly httpServer: HttpServer, readonly createAccount: CreateAccount) {
        httpServer.register("post","/users", async (params: any, body: any) => {
            const output = await createAccount.execute(body);
            return output;
        })
    }

    

    
}