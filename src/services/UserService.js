import { UserRepository } from '../repositories/UserRepository';
import { AppError } from '../utils/AppErrors';
import  jwt from 'jsonwebtoken';
import { hashPassword, validatePassword, generateToken } from '../utils/validations';
import { env } from '../config/env';

export const UserService = {
  async registerUser(userData) {
    const existing = await UserRepository.findByEmail(userData.email);
    if (existing) {
      throw new AppError('El correo ya está registrado', 400);
    }

    const hashedPassword = await hashPassword(userData.password);
    const userToSave = { ...userData, password: hashedPassword };

    const userId = await UserRepository.register(userToSave);
    return userId;
  },

  async updateUser(id, data) {
    let dataToUpdate = { ...data };
    if (data.password) {
      dataToUpdate.password = await hashPassword(data.password);
    }

    const updated = await UserRepository.update(id, dataToUpdate);
    if (!updated) {
      throw new AppError('Usuario no encontrado para actualizar', 404);
    }
    return updated;
  },

  async getUserById(id) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }
    return user;
  },

  async getUserByEmail(email) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }
    return user;
  },

  async deleteUser(id) {
    const deleted = await UserRepository.delete(id);
    if (!deleted) {
      throw new AppError('Usuario no encontrado para eliminar', 404);
    }
    return true;
  },

  async validateUserCredentials(email, password) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }

    const isValid = await validatePassword(password, user.password);
    if (!isValid) {
      throw new AppError('Contraseña incorrecta', 401);
    }

    // No necesitamos devolver la contraseña
    user.password = undefined;
    user.token = generateToken(user, '1h');

    return user;
  }
};
