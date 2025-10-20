'use client';
import React from 'react';

type P = React.ComponentType<{ children: React.ReactNode }>;

export const composeProviders = (
  ...providers: P[]
): React.FC<{ children: React.ReactNode }> => {
  const Base: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <>{children}</>
  );

  const Composed = providers.reduce<React.FC<{ children: React.ReactNode }>>(
    (Accum, Provider) => {
      const Wrapped: React.FC<{ children: React.ReactNode }> = ({
        children,
      }) => (
        <Provider>
          <Accum>{children}</Accum>
        </Provider>
      );
      Wrapped.displayName = `Compose(${Provider.displayName ?? Provider.name ?? 'Anonymous'})`;
      return Wrapped;
    },
    Base
  );

  Composed.displayName = 'ComposedProviders';
  return Composed;
};
