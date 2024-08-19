import { describe, expect, it } from "vitest";
import { Account } from "../domain/entities/Account";
import { Restaurant } from "../domain/entities/Restaurant";

describe("Restaurant tests", () => {
  it("It should create an Restaurant successfully", () => {
    const accInput = {
      email: "john.doe@hotmail.com",
      password: "1234asd!"
    }

    const account = Account.create(accInput.email,accInput.password);
    
    const input = {
      name: "Restaurant Test",
      address: "Test St.",
      accountId: account.getAccountId()
    }

    const restaurant = Restaurant.create(input.name, input.address, input.accountId);
    expect(restaurant).toBeDefined();
  })
})