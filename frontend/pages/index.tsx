import React from 'react';
import { MainLayout } from './layouts/main-layout';

const Index = (): JSX.Element => {
  return (
    <>
      <MainLayout>
        <div className="center">
          <h1>Welcome!</h1>
          <h3>Here are the bast tracks!</h3>
        </div>
      </MainLayout>

      <style jsx>
        {`
          .center {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }
        `}
      </style>
    </>
  );
};

export default Index;
