import dotenv from 'dotenv';

import jwt, { SignOptions } from 'jsonwebtoken';

dotenv.config();

interface JWTLoginPayload {
  username: string,
  password: string
}

export default function generateTokenLoginJWT(payload: JWTLoginPayload) {
  const config: SignOptions = {
    expiresIn: '40m',
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, 'mysecret', config);
  return token;
}