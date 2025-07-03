import express from 'express';
import cors from 'cors';
import passport from "passport";
import { env } from './config/env';
import connectMongo from './config/database';
import { setupSwagger } from './config/swagger';
import configurePassport from "./config/passport";
import { errorHandler } from './middlewares/errorHandler';
// Importando las rutas
import userRoutes from './routes/UserRoute';


export const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
configurePassport(passport);

connectMongo();


setupSwagger(app);

// Usando las rutas
app.use('/', (req, res) => {
  res.send('API is running');
});
app.use('/api/v1/users', userRoutes);


app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});

app.listen(env.port, () => {
  console.log(`🚀 Server running on port ${env.port}`);
});

