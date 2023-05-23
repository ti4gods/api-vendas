import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UsersRepository";
import { compare, hash } from "bcryptjs";

interface IRequest {
  email: string;
  password: string;
}

class CreateSessionsService {

  //DESESTRUTURANDO: { email, password}: IRequest
  public async execute({ email, password }: IRequest): Promise<User> {

    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorretc e-mail/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorretc e-mail/password combination.', 401);
    }

    await usersRepository.save(user);

    return user;
  }
}

export default CreateSessionsService;
