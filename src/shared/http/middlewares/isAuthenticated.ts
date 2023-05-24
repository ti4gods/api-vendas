import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';
import AppError from "@shared/errors/AppError";
import authConfig from '@config/auth'

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAutenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.')
  }

  // Bearer hsdufhadufdsfsdf4ds4fsd864f8
  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    console.log(decodedToken);

    //ID do usuário
    const { sub } = decodedToken as TokenPayload;

    request.user = {
      id: sub,
    }

    return next();
  } catch {
    throw new AppError('Invalid JWT Token.')
  }

}