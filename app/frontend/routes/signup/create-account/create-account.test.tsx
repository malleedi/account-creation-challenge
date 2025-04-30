import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { CreateAccount } from './create-account';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.useFakeTimers();
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
  jest.useRealTimers();
});

describe('CreateAccount Component', () => {
  test('displays success message on successful account creation', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'Account created successfully' }),
    });

    render(<CreateAccount />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'validusername' },
    });
    fireEvent.change(screen.getByLabelText(/password/i, { selector: 'input' }), {
      target: { value: 'StrongPassword123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    // Wait for the success message to appear
    await waitFor(() => {
      expect(screen.getByText(/account created successfully/i)).toBeInTheDocument();
    });

    // Simulate the timer expiration and ensure navigate was called
    act(() => {
      jest.runAllTimers(); 
    });

    expect(mockNavigate).toHaveBeenCalledWith('/signup/account-selection');
  });

  test('shows error for short username', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        error: ['Username is too short'],
      }),
    });

    render(<CreateAccount />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'short' },
    });

    fireEvent.change(screen.getByLabelText(/password/i, { selector: 'input' }), {
      target: { value: 'StrongPassword123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    const error = await screen.findByText(/username is too short/i);
    expect(error).toBeInTheDocument();
  });

  test('shows error for short password', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        error: ['Password is too short'],
      }),
    });

    render(<CreateAccount />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'validusername' },
    });

    fireEvent.change(screen.getByLabelText(/password/i, { selector: 'input' }), {
      target: { value: 'short1' },
    });

    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    const error = await screen.findByText(/password is too short/i);
    expect(error).toBeInTheDocument();
  });

  test('shows error for password without a number', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        error: ['Password must include at least one letter and one number'],
      }),
    });

    render(<CreateAccount />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'validusername' },
    });

    fireEvent.change(screen.getByLabelText(/password/i, { selector: 'input' }), {
      target: { value: 'OnlyLettersLongEnough' },
    });

    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    const error = await screen.findByText(/password must include at least one letter and one number/i);
    expect(error).toBeInTheDocument();
  });

  test('shows error for password without a letter', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        error: ['Password must include at least one letter and one number'],
      }),
    });

    render(<CreateAccount />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'validusername' },
    });

    fireEvent.change(screen.getByLabelText(/password/i, { selector: 'input' }), {
      target: { value: '12345678901234567890' },
    });

    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    const error = await screen.findByText(/password must include at least one letter and one number/i);
    expect(error).toBeInTheDocument();
  });

  test('shows error for weak password (Zxcvbn score < 2)', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        error: ['Password is too weak'],
      }),
    });

    render(<CreateAccount />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'validusername' },
    });

    fireEvent.change(screen.getByLabelText(/password/i, { selector: 'input' }), {
      target: { value: 'passwordpassword1234' },
    });

    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    const error = await screen.findByText(/password is too weak/i);
    expect(error).toBeInTheDocument();
  });
});
