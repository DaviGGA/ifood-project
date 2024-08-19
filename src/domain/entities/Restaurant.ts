import crypto from "crypto"

export class Restaurant {

  private constructor (
    private restaurantId: string,
    private name: string,
    private address: string,
    private accountId: string,
    private image?: string
  ) {}

  static create(name: string, address: string, accountId: string, image?: string) {
    const restaurantId = crypto.randomUUID()
    return new Restaurant(restaurantId, name, address, accountId, image);
  }

  static restore(restaurantId: string, name: string, address: string, accountId: string, image: string) {
    return new Restaurant(restaurantId, name, address, accountId, image);
  }

  getRestaurantId() {
    return this.restaurantId;
  }

  getName() {
    return this.name;
  }

  getAddress() {
    return this.address;
  }

  getImage() {
    return this.image;
  }

  getAccountId() {
    return this.accountId;
  }


}