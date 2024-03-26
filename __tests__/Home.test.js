// home.test.jsx

import React from 'react';
import { render } from '@testing-library/react';
import Home from '../src/app/page';

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
