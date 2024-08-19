import { CreateRestaurant } from "../../application/usecases/CreateRestaurant";
import HttpServer from "./HttpServer";
import multer from "multer";

// TO-DO: desacoplar o multer
const upload = multer({dest: 'images/restaurants'})

export class RestaurantController {
    constructor (readonly httpServer: HttpServer, readonly createRestaurant: CreateRestaurant) {
      httpServer.register("post","/restaurants", async (params: any, body: any, file: any) => {
        const output = await createRestaurant.execute({...body, image: file});
        return output;
      }, upload.single('image'))
    }   
}