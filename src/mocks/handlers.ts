import { rest } from 'msw';
import catsData from 'mocks/cats.json';

export const handlers = [
  rest.get('http://localhost:4000/cats', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(catsData));
  }),
];
