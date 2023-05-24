import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UsersRepository";
import path from "path";
import uploadConfig from '@config/upload';
import fs from 'fs';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {

  //DESESTRUTURANDO: {name, email, password}: IRequest
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {

    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      //Exclui imagem caso já exista
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;


  }
}

export default UpdateUserAvatarService;
