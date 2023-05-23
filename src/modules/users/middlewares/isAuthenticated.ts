import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';
import AppError from "@shared/errors/AppError";
import authConfig from '@config/auth'

export default function isAutenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.autorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.')
  }

  // Bearer hsdufhadufdsfsdf4ds4fsd864f8
  const [, token] = authHeader.split(' ');

  try {
    const decodeToken = verify(token, authConfig.jwt.secret)

    return next();
  } catch {
    throw new AppError('Invalid JWT Token.')
  }

}