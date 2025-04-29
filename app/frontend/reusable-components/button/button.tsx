import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  type?: 'button' | 'submit';
  href?: string;
  children: ReactNode;
}

const classes = 'inline-block py-3 px-6 bg-[hsla(244,49%,49%,1)] text-white rounded-md w-full text-base font-medium';

export function Button({ href, children, type }: Props) {
  if (href) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}
