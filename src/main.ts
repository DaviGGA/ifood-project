import { CreateAccount } from "./application/usecases/CreateAccount";
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import { AccountController } from "./infra/http/AccountController";
import { ExpressAdapter } from "./infra/http/HttpServer";
import { AccountRepositoryDatabase } from "./infra/repository/AccountRepository";

const httpServer = new ExpressAdapter();
const connection = new PgPromiseAdapter();
const accountRepository = new AccountRepositoryDatabase(connection)
const createAccount = new CreateAccount(accountRepository);
new AccountController(httpServer, createAccount);

httpServer.listen(3005);