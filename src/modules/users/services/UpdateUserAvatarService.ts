import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UsersRepository";
import path from "path";
import uploadConfig from '@config/upload';
import fs from 'fs';
import DiskStorageProvider from "@shared/providers/StorageProvider/DiskStorageProvider";
import S3StorageProvider from "@shared/providers/StorageProvider/S3StorageProvider";

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

    if (uploadConfig.driver === 's3') {
      const s3Provider = new S3StorageProvider();
      if (user.avatar) {
        await s3Provider.deleteFile(user.avatar);
      }

      const fileName = await s3Provider.saveFile(avatarFilename);
      user.avatar = fileName;
    } else {
      const diskProvaider = new S3StorageProvider();
      if (user.avatar) {
        await diskProvaider.deleteFile(user.avatar);
      }

      const fileName = await diskProvaider.saveFile(avatarFilename);
      user.avatar = fileName;
    }

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
