import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/Product";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {

  //DESESTRUTURANDO: {name, price, quantity}: IRequest
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {

    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(name);

    //Se entrar no if/erro não segue adiante.
    if (productExists) {
      throw new AppError('There is already one product wih this name.')
    };

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
