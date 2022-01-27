import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pets from './Pets';
import { server } from 'mocks/server';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-empty-function
beforeEach(() => render(<Pets />));
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Pets', () => {
  test('should render the correct about of cards', async () => {
    const cards = await screen.findAllByRole('article');
    expect(cards.length).toBe(5);
  });

  test('should filter for male cats', async () => {
    const cards = await screen.findAllByRole('article');
    userEvent.selectOptions(screen.getByLabelText(/gender/i), 'male');

    expect(screen.getAllByRole('article')).toStrictEqual([cards[1], cards[3]]);
  });

  test('should filter for female cats', async () => {
    const cards = await screen.findAllByRole('article');
    userEvent.selectOptions(screen.getByLabelText(/gender/i), 'female');

    expect(screen.getAllByRole('article')).toStrictEqual([
      cards[0],
      cards[2],
      cards[4],
    ]);
  });

  test('should filter for favoured cats', async () => {
    const cards = await screen.findAllByRole('article');
    userEvent.click(within(cards[0]).getByRole('button'));
    userEvent.click(within(cards[3]).getByRole('button'));

    userEvent.selectOptions(screen.getByLabelText(/favourite/i), 'favoured');

    expect(screen.getAllByRole('article')).toStrictEqual([cards[0], cards[3]]);
  });

  test('should filter for not favoured cats', async () => {
    const cards = await screen.findAllByRole('article');
    userEvent.click(within(cards[0]).getByRole('button'));
    userEvent.click(within(cards[3]).getByRole('button'));

    userEvent.selectOptions(
      screen.getByLabelText(/favourite/i),
      'not favoured',
    );

    expect(screen.getAllByRole('article')).toStrictEqual([
      cards[1],
      cards[2],
      cards[4],
    ]);
  });

  test('should filter for favoured male cats', async () => {
    const cards = await screen.findAllByRole('article');
    userEvent.click(within(cards[0]).getByRole('button'));
    userEvent.click(within(cards[3]).getByRole('button'));

    userEvent.selectOptions(screen.getByLabelText(/favourite/i), 'favoured');

    userEvent.selectOptions(screen.getByLabelText(/gender/i), 'male');

    expect(screen.getAllByRole('article')).toStrictEqual([cards[3]]);
  });
});
