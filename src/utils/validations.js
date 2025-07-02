import { compare, genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { env } from '../config/env';

export async function validatePassword(enteredPassword, storedPassword) {
  return await compare(enteredPassword, storedPassword);
}

export async function hashPassword(password) {
  const salt = await genSalt(10);
  return hash(password, salt);
}

export function generateToken(payload, expiresIn = '1h') {
  const secret = env.jwtSecret || 'mi_clave_super_secreta';
  const user = payload;
  return sign( { sub: user.id, email: user.email }, secret, { expiresIn });
}
