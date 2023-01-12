import React, { ReactNode } from 'react';
import { Navigation } from '../../component/navigation';

type TProps = {
  children: ReactNode;
}
export const MainLayout = ({ children }: TProps): JSX.Element => {
  return (
    <>
      <Navigation />
      <div style={{ height: 100 }} />
      {children}
    </>
  );
};
