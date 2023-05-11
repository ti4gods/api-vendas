import UsersRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import { getCustomRepository } from "typeorm";

class ListUsertService {

  public async execute(): Promise<User[]> {

    const usersRepository = getCustomRepository(UsersRepository);
    const users = usersRepository.find();

    return users;
  }
}

export default ListUsertService;
