import { CreateAccount } from "./application/usecases/CreateAccount";
import { CreateRestaurant } from "./application/usecases/CreateRestaurant";
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import { AccountController } from "./infra/http/AccountController";
import { ExpressAdapter } from "./infra/http/HttpServer";
import { RestaurantController } from "./infra/http/RestaurantController";
import { AccountRepositoryDatabase } from "./infra/repository/AccountRepository";
import { RestaurantRepositoryDatabase } from "./infra/repository/RestaurantRepository";

const httpServer = new ExpressAdapter();
const connection = new PgPromiseAdapter();

// Repositories
const accountRepository = new AccountRepositoryDatabase(connection);
const restaurantRepository = new RestaurantRepositoryDatabase(connection);

// Usecases
const createAccount = new CreateAccount(accountRepository);
const createRestaurant = new CreateRestaurant(restaurantRepository);

// Controllers
new AccountController(httpServer, createAccount);
new RestaurantController(httpServer, createRestaurant);

httpServer.listen(3005);