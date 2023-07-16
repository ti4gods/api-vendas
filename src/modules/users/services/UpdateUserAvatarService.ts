import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UsersRepository";
import path from "path";
import uploadConfig from '@config/upload';
import fs from 'fs';
import DiskStorageProvider from "@shared/providers/StorageProvider/DiskStorageProvider";


interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {

  //DESESTRUTURANDO: {name, email, password}: IRequest
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {

    const usersRepository = getCustomRepository(UserRepository);
    const StorageProvider = new DiskStorageProvider();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (user.avatar) {
     await  StorageProvider.deleteFile(user.avatar);
    }

    const fileName = await StorageProvider.saveFile(avatarFilename);

    user.avatar = fileName;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
