import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title?: string;
  description?: string;
}

export function Card({ children, title, description }: Props) {
  return (
    <section className="p-5 shadow-card min-h-[400px] w-full rounded-2xl border border-solid border-slate-200 bg-white">
      <h1 className="text-2xl font-medium m-0 mb-1">{title}</h1>
      <p className="text-[hsla(243,30%,13%,.63)] text-base m-0 mb-1">{description}</p>
      {children}
    </section>
  );
}
