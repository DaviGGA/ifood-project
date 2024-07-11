import axios, { AxiosError } from "axios";
import { describe, expect, it } from "vitest";
import 'dotenv/config'

describe("POST /users", () => {
    it("Should return 200 when creating user", async () => {
        if (!process.env.baseURL) throw new Error("No api url provided at .env");

        const url = process.env.baseURL + "/users";

        const input = {
            email: `john.doe${Math.random()}@hotmail.com`,
            password: "1234asd!",
            confirmPassword: "1234asd!"
        }

        const response = await axios.post(url, input);
        
        expect(response.status).toBe(200);
        expect(response.data.accountId).toBeDefined();            


    })

    it("Should return 400 when password mismatches", async () => {
        if (!process.env.baseURL) throw new Error("No api url provided at .env");

        const url = process.env.baseURL + "/users";

        const input = {
            email: `john.doe${Math.random()}@hotmail.com`,
            password: "1234asd",
            confirmPassword: "1234asd!"
        }

        try {
            const response = await axios.post(url, input);
        } catch (error: any) {
            expect(error.response.status).toBe(400);
        }
    })
})