// home.test.jsx

import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { useRouter } from 'next/router';
import Home from '../src/app/page';


jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Home Page', () => {

  useRouter.mockImplementation(() => ({
    route: '/',
    pathname: '/',
    query: '',
    asPath: '',
    push: jest.fn(),
}));

test('renders the home page with initial state', () => {
  

  const { getByText, getByLabelText } = render(<Home />);

  // Check title
  expect(getByText(/Question Time/i)).toBeInTheDocument();

  // Check email input
  const emailInput = getByLabelText(/Email address/i);
  expect(emailInput).toBeInTheDocument();
  expect(emailInput.value).toBe('');

  // Check submit button
  const submitButton = getByText(/Submit/i);
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toBeDisabled(); // Initially disabled

  // No error message
  expect(screen.queryByText(/Please enter a valid email address./i)).toBeNull();
});

})