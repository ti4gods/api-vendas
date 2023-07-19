import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import RedisCache from '@shared/cache/RedisCache';

class ListProductService {

  public async execute(): Promise<Product[]> {

    const productsRepository = getCustomRepository(ProductRepository);

    // const redisCache = new RedisCache();

    let products = await RedisCache.recover<Product[]>(
      'api-vendas-PRODUCT_LIST',
    );

    //Se não existe cache...
    if (!products) {
      products = await productsRepository.find();

      await RedisCache.save('api-vendas-PRODUCT_LIST', products)
    }

    await RedisCache.save('teste', 'teste');

    return products;
  }
}

export default ListProductService;
