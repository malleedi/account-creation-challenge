import React, { ReactNode } from 'react';
import { Button } from '../button/button'; 

interface Props {
  children: ReactNode;
}

export function FlowLayout({ children }: Props) {
  return (
    <div className="h-full mt-5 max-w-[1000px] mx-auto">
      <div className="w-full text-right">
        <div className="w-auto inline-block p-4">
          <Button href="/create-account">Logout</Button>
        </div>
      </div>
      {children}
    </div>
  );
}
