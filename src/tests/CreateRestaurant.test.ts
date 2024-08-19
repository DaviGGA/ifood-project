import { beforeEach, describe, expect, it } from "vitest";
import sinon from "sinon";
import { PgPromiseAdapter } from "../infra/database/DatabaseConnection";
import { RestaurantRepositoryDatabase } from "../infra/repository/RestaurantRepository";
import { AccountRepositoryDatabase } from "../infra/repository/AccountRepository";
import { CreateAccount } from "../application/usecases/CreateAccount";
import { CreateRestaurant } from "../application/usecases/CreateRestaurant";
import { Account } from "../domain/entities/Account";

let createRestaurant: CreateRestaurant

beforeEach(async () => {
  const connection = new PgPromiseAdapter();
  const restaurantRepository = new RestaurantRepositoryDatabase(connection);
  createRestaurant = new CreateRestaurant(restaurantRepository);
})

describe("CreateRestaurant usecase tests", () => {
  
  it("Creates a restaurant successfully", async () => {
    const accInput = {
      email: "john.doe@hotmail.com",
      password: "1234asd!"
    }

    const account = Account.create(accInput.email,accInput.password);

    const insertRestaurantStub = sinon.
    stub(RestaurantRepositoryDatabase.prototype, "insertRestaurant").
    resolves()

    const input = {
      name: "Restaurant A",
      address: "Test St.",
      accountId: account.getAccountId()
    }

    const result = await createRestaurant.execute(input);
    expect(result.restaurantId).toBeDefined();

    insertRestaurantStub.restore();
  })

  it("Should throw error when creatint Restaurant withou accountId", async () => {

    const input = {
      name: "Restaurant A",
      address: "Test St.",
      accountId: ""
    }

    await expect(async () => createRestaurant.execute(input)).
    rejects.toThrow(new Error("Restaurant accountId can't be null. A restaurant must be linked into a Account"));
  })
})