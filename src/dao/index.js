import { dbConnection } from "../config/dbConnection.js";
import { ProductManager } from "./managers/ProductManager.js";
import { CartManager } from "./managers/CartManager.js";

dbConnection();
//export const userdao = new UserMongo();
export const productManager = new ProductManager();
export const cartManager = new CartManager();