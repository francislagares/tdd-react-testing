import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from './Card';
import { PetsContextProvider } from 'context/PetsContext';

const cardProps = {
  name: 'Sydney',
  phone: '111-111-1111',
  email: 'laith@gmail.com',
  image: {
    url: 'https://images.unsplash.com/photo-1635150103699-13fe04ace2f1?ixlib: rb-1.2.1&ixid: MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    alt: 'Adorable Cat',
  },
  favoured: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateFavourite: () => {},
  index: 1,
};

const renderCardComponentWithProps = (props: ICat) => {
  render(
    <PetsContextProvider>
      <Card {...props} />
    </PetsContextProvider>,
  );
};

describe('Card Component', () => {
  test('should show name of cat', () => {
    renderCardComponentWithProps(cardProps);

    expect(screen.getByRole('heading', { name: 'Sydney' })).toBeInTheDocument();
  });

  test('should show phone number of cat', () => {
    renderCardComponentWithProps(cardProps);

    expect(screen.getByText(/111-111-1111/i)).toBeInTheDocument();
  });

  test('should show email of cat', () => {
    renderCardComponentWithProps(cardProps);

    expect(screen.getByText('laith@gmail.com')).toBeInTheDocument();
  });

  test('should show cat image with correct src', () => {
    renderCardComponentWithProps(cardProps);

    const catImage = screen.getByAltText('Adorable Cat');
    expect(catImage).toBeInTheDocument();
    expect(catImage).toHaveAttribute('src', cardProps.image.url);
  });

  test('should show outlined heart', () => {
    renderCardComponentWithProps(cardProps);

    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });

  test('should show filled heart', () => {
    renderCardComponentWithProps({ ...cardProps, favoured: true });

    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
  });

  test('should toggle heart status', () => {
    renderCardComponentWithProps(cardProps);

    userEvent.click(screen.getByRole('button'));

    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();

    userEvent.click(screen.getByRole('button'));

    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });
});
