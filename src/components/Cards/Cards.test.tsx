import { render, screen } from '@testing-library/react';
import Cards from './Cards';
import { PetsContextProvider } from 'context/PetsContext';
import catsData from 'mocks/cats.json';

describe('Cards Component', () => {
  test('should render five card components', () => {
    render(
      <PetsContextProvider>
        <Cards />
      </PetsContextProvider>,
    );

    expect(screen.getAllByRole('article')).toHaveLength(5);
  });
});
