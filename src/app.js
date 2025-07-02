import express from 'express';
import cors from 'cors';
import passport from "passport";
import { env } from './config/env.js';
import { setupSwagger } from './config/swagger';
import configurePassport from "./config/passport";
import { errorHandler } from './middlewares/errorHandler';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
configurePassport(passport);

setupSwagger(app);


app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});

app.listen(env.port, () => {
  console.log(`🚀 Server running on port ${env.port}`);
});

