import { AppError } from '../utils/AppErrors';

export function errorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  // Errores no controlados
  res.status(500).json({
    message: 'Error interno del servidor',
  });
}
