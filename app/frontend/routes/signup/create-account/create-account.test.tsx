import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { CreateAccount } from './create-account';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.useFakeTimers(); // Enable fake timers for setTimeout
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
  jest.useRealTimers(); // Reset back to real timers after each test
});

describe('CreateAccount Component', () => {
  test('displays success message on successful account creation', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'Account created successfully' }),
    });

    render(<CreateAccount />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Test1234' },
    });

    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    // Wait for the success message to appear
    await waitFor(() => {
      expect(screen.getByText(/account created successfully/i)).toBeTruthy();
    });

    // Simulate the timer expiration and ensure navigate was called
    act(() => {
      jest.runAllTimers(); 
    });

    expect(mockNavigate).toHaveBeenCalledWith('/signup/account-selection');
  });
});
