// * fake data's
import { faker } from "@faker-js/faker";

export function createRandomProduct() {
  return {
    id: Math.floor(Math.random() * 1 + 100),
    image: faker.image.avatar(),
    nom: faker.commerce.productName(),
    price: faker.commerce.price(),
    stock: faker.datatype.number(300),
    categorie: faker.commerce.productMaterial(),
    rate: Math.floor(Math.random() * 0.4 + 5),
    date: faker.date.anytime(),
  };
}

export const PRODUCTS = faker.helpers.multiple(createRandomProduct, {
  count: 30,
});
