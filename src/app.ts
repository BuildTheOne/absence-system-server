import { errorHandler, NotFoundError } from '@/lib/error';
import { loggerMiddleware } from '@/lib/logger';
import { rateLimiter } from '@/lib/rate-limiter';
import { appRouter } from '@/router';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import { xss } from 'express-xss-sanitizer';
import helmet from 'helmet';
import 'tsconfig-paths/register';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(compression());
app.use(xss());
app.use(cors());
app.use(rateLimiter());

app.use(loggerMiddleware);

app.use('/api/v1', appRouter);

app.use((_, __, next) => {
  next(new NotFoundError());
});

app.use(errorHandler);

export { app };
