import { Restaurant } from "../../domain/entities/Restaurant"
import DatabaseConnection from "../database/DatabaseConnection"

export interface RestaurantRepository {
  insertRestaurant(restaurant: Restaurant): Promise<void>
}


export class RestaurantRepositoryDatabase implements RestaurantRepository  {
  
  constructor(readonly connection: DatabaseConnection) {}
  
  async insertRestaurant(restaurant: Restaurant): Promise<void> {
    await this.connection.query(
      "insert into ifood.restaurants (id, name, image, address, account_id) VALUES($1, $2, $3, $4, $5)",
      [restaurant.getRestaurantId(), restaurant.getName(), restaurant.getImage(), restaurant.getAddress(), restaurant.getAccountId()]
    )
  }
}