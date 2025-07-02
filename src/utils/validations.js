import { compare, genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

class ValidationUtils {
  static async validatePassword(enteredPassword, storedPassword) {
    return await compare(enteredPassword, storedPassword);
  }

  static async hashPassword(password) {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  static generateToken(payload, expiresIn = '1h') {
    const secret = process.env.JWT_SECRET || 'default_secret_key';
    return sign(payload, secret, { expiresIn });
  }
}


export default ValidationUtils;
