import express, { Request, Response } from "express";
import { Express } from "express";
import cors from "cors";
export default interface HttpServer {
    register(method: string, url: string, callback: Function, ...middlewares: Function[]): void
    listen(port: number): void;
}

export class ExpressAdapter implements HttpServer {
    app: any;

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json());
    }
    
    register(method: string, url: string, callback: Function,...middlewares: Function[]): void {
        this.app[method](url,...middlewares ,async (req: Request, res: Response) => {
            try {
                const output = await callback(req.params, req.body, req.file);
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