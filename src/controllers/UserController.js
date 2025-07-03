import { UserService } from '../services/UserService';

export async function register(req, res, next) {
  try {
    const userId = await UserService.registerUser(req.body);
    res.status(201).json({ id: userId });
  } catch (err) {
    next(err);
  }
}

export async function getAll(req, res, next) {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const user = await UserService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function getByEmail(req, res, next) {
  try {
    const user = await UserService.getUserByEmail(req.params.email);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const updated = await UserService.updateUser(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    await UserService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function validateUserCredentials(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }
  try {
    const user = await UserService.validateUserCredentials(email, password);
    res.json(user);
  } catch (err) {
    next(err);
  }
}
