import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

class ListCustomerService {

  public async execute(): Promise<Customer[]> {

    const customerRepository = getCustomRepository(CustomersRepository);
    const customer = customerRepository.find();

    return customer;
  }
}

export default ListCustomerService;
