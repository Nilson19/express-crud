import UserModel from '../models/User';
import { AppError } from '../utils/AppErrors';

export const UserRepository = {
    async register(user) {
        try {
            const createdUser = await UserModel.create(user);
            return createdUser._id.toString();
        } catch (err) {
            if (err instanceof Error) {
                throw new AppError('Error al registrar usuario: ' + err.message);
            }
            throw new AppError('Error desconocido al registrar usuario');
        }
    },

    async findAll() {
        try {
            const users = await UserModel.find().lean();
            return users;
        } catch (err) {
            if (err instanceof Error) {
                console.error('Error', err);
                throw new AppError('Error al buscar usuarios: ' + err.message);
            }
            throw new AppError('Error desconocido al buscar usuarios');
        }
    },

    async findByEmail(email) {
        try {
            const user = await UserModel.findOne({ email }).lean();
            return user;
        } catch (err) {
            if (err instanceof Error) {
                console.error('Error', err);
                throw new AppError('Error al buscar el usuario por email: ' + err.message);
            }
            throw new AppError('Error desconocido al buscar el usuario por email');
        }
    },

    async findById(id) {
        try {
            const user = await UserModel.findById(id).lean();
            return user;
        } catch (err) {
            if (err instanceof Error) {
                throw new AppError('Error al buscar el usuario por id: ' + err.message);
            }
            throw new AppError('Error desconocido al buscar el usuario por id');
        }
    },

    async update(id, data) {
        try {
            const updated = await UserModel.findByIdAndUpdate(id, data, { new: true }).lean();
            return updated;
        } catch (err) {
            if (err instanceof Error) {
                throw new AppError('Error al actualizar usuario: ' + err.message);
            }
            throw new AppError('Error desconocido al actualizar usuario');
        }
    },

    async delete(id) {
        try {
            await UserModel.findByIdAndDelete(id);
            return true;
        } catch (err) {
            if (err instanceof Error) {
                throw new AppError('Error al eliminar usuario: ' + err.message);
            }
            throw new AppError('Error desconocido al eliminar usuario');
        }
    }
};
