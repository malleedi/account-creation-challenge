import React, { ChangeEvent, useState, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ onChange, label, ...props }: Props) {
  const [value, setValue] = useState('');
  const id = label.replace(/ /gm, '_');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    onChange?.(event);
  }
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-[#777586]">{label}</label>
      <input
        id={id}
        className="border-b-2 border-gray-300 focus:border-blue-500 outline-none p-2 block w-full mb-3 transition-colors duration-200 ease-in-out"
        value={value}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}
