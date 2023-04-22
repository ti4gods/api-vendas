import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/Product";

class ListProductService {

  //DESESTRUTURANDO: {name, price, quantity}: IRequest
  public async execute(): Promise<Product[]> {

    const productsRepository = getCustomRepository(ProductRepository);

    const products = productsRepository.find();

    return products;
  }
}

export default ListProductService;
