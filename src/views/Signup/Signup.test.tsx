import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Signup from './Signup';

interface ISignupForm {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const typeIntoForm = ({ email, password, confirmPassword }: ISignupForm) => {
  const emailElement = screen.getByRole('textbox');
  const passwordElement = screen.getByLabelText('Password');
  const confirmPasswordElement = screen.getByLabelText(/confirm password/i);

  if (email) {
    userEvent.type(emailElement, email);
  }

  if (password) {
    userEvent.type(passwordElement, password);
  }

  if (confirmPassword) {
    userEvent.type(confirmPasswordElement, confirmPassword);
  }

  return {
    emailElement,
    passwordElement,
    confirmPasswordElement,
  };
};

const submitForm = () => {
  const submitButton = screen.getByRole('button', { name: /submit/i });

  userEvent.click(submitButton);
};

beforeEach(() => {
  render(<Signup />);
});

describe('Signup Form', () => {
  test('inputs should initially be empty', () => {
    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.getByLabelText('Password')).toHaveValue('');
    expect(screen.getByLabelText(/confirm password/i)).toHaveValue('');
  });

  test('should be able to type an email', () => {
    const { emailElement } = typeIntoForm({
      email: 'francis.lagares@gmail.com',
    });

    expect(emailElement).toHaveValue('francis.lagares@gmail.com');
  });

  test('should be able to type a password', () => {
    const { passwordElement } = typeIntoForm({ password: 'password!' });

    expect(passwordElement).toHaveValue('password!');
  });

  test('should be able to confirm password', () => {
    const { confirmPasswordElement } = typeIntoForm({
      confirmPassword: 'password!',
    });

    expect(confirmPasswordElement).toHaveValue('password!');
  });

  describe('Error Form Handling', () => {
    test('should show email error message on invalid email', () => {
      expect(
        screen.queryByText(/the email you input is invalid/i),
      ).not.toBeInTheDocument();

      typeIntoForm({ email: 'francis.lagaresgmail.com' });

      submitForm();

      expect(
        screen.queryByText(/the email you input is invalid/i),
      ).toBeInTheDocument();
    });

    test('should show password error message on invalid password', () => {
      expect(
        screen.queryByText(
          /the password you entered should contain 5 or more characters/i,
        ),
      ).not.toBeInTheDocument();

      typeIntoForm({
        email: 'francis.lagares@gmail.com',
        password: 'pass',
      });

      submitForm();

      expect(
        screen.queryByText(
          /the password you entered should contain 5 or more characters/i,
        ),
      ).toBeInTheDocument();
    });

    test('should show no error message if every input is valid', () => {
      typeIntoForm({
        email: 'francis.lagares@gmail.com',
        password: 'password!',
        confirmPassword: 'password!',
      });

      submitForm();

      expect(
        screen.queryByText(/the email you input is invalid/i),
      ).not.toBeInTheDocument();

      expect(
        screen.queryByText(
          /the password you entered should contain 5 or more characters/i,
        ),
      ).not.toBeInTheDocument();

      expect(
        screen.queryByText(
          /the password you entered should contain 5 or more characters/i,
        ),
      ).not.toBeInTheDocument();
    });
  });
});
