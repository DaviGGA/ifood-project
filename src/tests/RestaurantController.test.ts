import axios, { AxiosError } from "axios";
import { describe, expect, it } from "vitest";
import 'dotenv/config'

describe("POST /restaurants", () => {
    it("Should return 200 when creating restaurant", async () => {
        if (!process.env.baseURL) throw new Error("No api url provided at .env");

        const url = process.env.baseURL + "/restaurants";

        const accInput = {
          email: `john.doe${Math.random()}@hotmail.com`,
          password: "1234asd",
          confirmPassword: "1234asd!"
        }

        const accountResponse = await axios.post(process.env.baseURL + "/users", accInput);
  
        const input = {
          name: "Test Restaurant",
          accountId: accountResponse.data.accountId
        }

        const response = await axios.post(url, input);
        
        expect(response.status).toBe(200);
        expect(response.data.accountId).toBeDefined();            
    })

})