import dotenv from 'dotenv';

import jwt, { SignOptions } from 'jsonwebtoken';

dotenv.config();

interface JWTPayload {
  username: string;
  vocation: string;
  level: number;
  password: string;
}

export default function generateTokenJWT(payload: JWTPayload) {
  const config: SignOptions = {
    expiresIn: '40m',
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, 'mysecret', config);
  return token;
}