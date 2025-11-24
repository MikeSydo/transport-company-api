import cors from 'cors';
import express from 'express';
import routes from './routes'
const app = express();
const port = 3000;

app.use(express.json());

app.use(
  cors({
    origin: [
      `http://localhost:${port}`,
      `http://127.0.0.1:${port}`,
    ],
    credentials: true,
  }),
);

app.get('/', (_req, res) => {
  res.json({ message: 'server started' });
});

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});