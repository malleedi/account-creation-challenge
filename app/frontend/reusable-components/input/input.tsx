import React, { ChangeEvent, useState, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ onChange, label, type = 'text', ...props }: Props) {
  const [value, setValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const id = label.replace(/ /gm, '_');
  const isPassword = type === 'password';

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    onChange?.(event);
  }

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm text-[#777586]">{label}</label>
      <input
        id={id}
        className="border-b-2 border-gray-300 focus:border-blue-500 outline-none p-2 block w-full mb-3 pr-10 transition-colors duration-200 ease-in-out"
        type={isPassword && showPassword ? 'text' : type}
        value={value}
        onChange={handleChange}
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-8 text-[#777586]"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor">
              <path d="M1 12C1 12 5 5 12 5C19 5 23 12 23 12C23 12 19 19 12 19C5 19 1 12 1 12Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor">
              <path d="M2 2L22 22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
