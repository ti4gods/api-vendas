import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/Product";
import RedisCache from "@shared/cache/RedisCache";

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {

  public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {

    //Instanciando o repositório
    const productsRepository = getCustomRepository(ProductRepository);

    //Localiza o produto desejado pelo ID
    const product = await productsRepository.findOne(id);

    //Testa se o produto foi localizado
    if (!product) {
      throw new AppError('Product not found.');
    }

    //Pesquisa se o nome do produto já está existe (já em uso por outro produto)
    const productExists = await productsRepository.findByName(name);

    //Se existe um produto com o nome que está sendo informado.
    if (productExists) {
      throw new AppError('There is already one product wih this name.')
    };

    const redisCache = new RedisCache();

    await redisCache.invalidade('api-vendas-PRODUCT_LIST');

    //Atualzando as informações do produto com os novos valores.
    product.name = name;
    product.price = price;
    product.quantity = quantity;

    //Atualiza o produto no BD
    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
