import express, { Request, Response } from "express";
import { Express } from "express";

export default interface HttpServer {
    register(method: string, url: string, callback: Function): void
    listen(port: number): void;
}

export class ExpressAdapter implements HttpServer {
    app: any;

    constructor() {
        this.app = express();
        this.app.use(express.json());
    }
    
    register(method: string, url: string, callback: Function): void {
        this.app[method](url, async (req: Request, res: Response) => {
            try {
                const output = await callback(req.params, req.body);
                return res.status(200).send(output);
            } catch (error: any) {
                console.log(error);
                return res.status(400).send({
                    message: error.message
                })
            }
        });
    }
    
    listen(port: number): void {
        this.app.listen(port, () =>{
            console.log("Server open on port " + port)
        });
    }

}