// home.test.jsx

import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Home from '../src/app/page';
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders the heading", () => {
    render(<Home />);
    const heading = screen.getByRole("heading", {
      name: /Question Time/i,
    });
    expect(heading).toBeInTheDocument();
  });

it('renders the email input field', () => {
     render(<Home />);
    const emailInput = screen.getByPlaceholderText('Enter your email');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('autocomplete', 'email');
    expect(emailInput).toHaveAttribute('required');
  });

  it('allows typing into the email input field', () => {
    render(<YourComponent />);
    const emailInput = screen.getByPlaceholderText('Enter your email');
    userEvent.type(emailInput, 'test@example.com');
    expect(emailInput).toHaveValue('test@example.com');
  });

it('renders the "Submit" button', () => {
    render(<Home />);
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveClass('bg-indigo-500');
    expect(submitButton).toHaveAttribute('type', 'submit');
  });
});
