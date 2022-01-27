import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Filter from './Filter';

beforeEach(() =>
  render(
    <Filter
      filters={{
        gender: 'any',
        favoured: 'any',
      }}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      setFilters={() => {}}
    />,
  ),
);

describe('Filter Component', () => {
  test('should be able to change select value of favourite', () => {
    const select = screen.getByLabelText(/favourite/i);
    expect(select).toHaveValue('any');

    userEvent.selectOptions(select, 'favoured');
    expect(select).toHaveValue('favoured');

    userEvent.selectOptions(select, 'not favoured');
    expect(select).toHaveValue('not favoured');
  });

  test('should be able to change select value of gender', () => {
    const select = screen.getByLabelText(/gender/i);
    expect(select).toHaveValue('any');

    userEvent.selectOptions(select, 'male');
    expect(select).toHaveValue('male');

    userEvent.selectOptions(select, 'female');
    expect(select).toHaveValue('female');
  });
});
