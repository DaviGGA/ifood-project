import { Restaurant } from "../../domain/entities/Restaurant";
import { RestaurantRepository } from "../../infra/repository/RestaurantRepository";

type Input = {
  name: string,
  address: string,
  image?:{filename: string},
  accountId: string
}

export class CreateRestaurant {
  
  constructor(readonly restaurantRepository: RestaurantRepository) {}

  async execute(input: Input) {
    if (!input.name) {
      throw Error("Restaurant name or address can't be null.");
    }

    if(!input.accountId) {
      throw Error("Restaurant accountId can't be null. A restaurant must be linked into a Account");
    }

    const restaurant = Restaurant.create(input.name, input.address, input.accountId, input.image?.filename);
    await this.restaurantRepository.insertRestaurant(restaurant);

    return {restaurantId: restaurant.getRestaurantId()}
  }
  
}