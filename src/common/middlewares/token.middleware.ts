import { Request, Response, NextFunction } from 'express';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import * as jwt from 'jsonwebtoken';

export function TokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(req.headers['user-agent']);
  if (req.headers.authorization) {
    const token = req.headers.authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
      if (err) {
        if (err.message == 'jwt expired') {
          throw new UnauthorizedException(1003, 'Token Expired');
        } else throw new UnauthorizedException(1002, 'Invalid Token');
      } else {
        console.log(result);
      }
    });
  }
  next();
}
