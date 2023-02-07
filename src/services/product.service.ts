import connection from '../models/connection';
import ProductModel from '../models/product.model';

export default class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async getAll() {
    const products = await this.model.getAll();
    return products;
  }

  public async create(name: string, amount: string) {
    const newProduct = await this.model.create(name, amount);
    return newProduct;
  }

  public async getAllOrders() {
    const orders = await this.model.getAllOrders();
    return orders;
  }
}