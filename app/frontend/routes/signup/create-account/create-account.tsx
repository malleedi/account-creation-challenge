import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WealthfrontLogo from '../../../../assets/images/logo.tsx';
import { Input } from 'app/frontend/reusable-components/input/input.tsx';
import { Button } from 'app/frontend/reusable-components/button/button.tsx';
import { Card } from 'app/frontend/reusable-components/card/card.tsx';

export function CreateAccount() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Handles form input changes and clears error messages on change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); // clear error on change
  };

  // Handles form submission and validates inputs
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({});
    setSuccessMessage('');
  
    // Validate required fields
    if (!formData.username || !formData.password) {
      setErrors({
        username: formData.username ? undefined : 'Username is required',
        password: formData.password ? undefined : 'Password is required',
      });
      return; // Prevent submission if fields are missing
    }
  
    try {
      const response = await fetch('/api/create_account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSuccessMessage(data.message || 'Account created successfully');
        setTimeout(() => navigate('/signup/account-selection'), 1000);
      } else {
        // Handle backend errors and set form field-specific errors
        const errorList = Array.isArray(data.error) ? data.error : [data.error];
        const fieldErrors: { username?: string; password?: string } = {};
  
        for (const msg of errorList) {
          if (msg.toLowerCase().includes('username')) fieldErrors.username = msg;
          if (msg.toLowerCase().includes('password')) fieldErrors.password = msg;
        }
  
        setErrors(fieldErrors);
      }
    } catch (err) {
      console.error(err);
      setErrors({ username: 'Server error', password: 'Server error' }); // Generic error handling
    }
  };

  return (
    <div className="mx-auto px-6 py-14 max-w-xl">
      <Card>
        <div className="flex items-center justify-center mb-5">
          <WealthfrontLogo />
        </div>

        <h1 className="text-center text-3xl font-extrabold mb-6">Create New Account</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full border-b-2 p-2 outline-none ${
                errors.username ? 'border-red-500' : 'border-gray-200 focus:border-blue-300' // UI error validation
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border-b-2 p-2 outline-none ${
                errors.password ? 'border-red-500' : 'border-gray-200 focus:border-blue-300' // UI error validation
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <Button type="submit">Create Account</Button>
        </form>

        {successMessage && (
          <div className="bg-green-100 text-green-700 border border-green-300 rounded-md p-3 mt-6 w-fit max-w-md mx-auto text-sm">
            {successMessage}
          </div>
        )}
      </Card>
    </div>
  );
}
