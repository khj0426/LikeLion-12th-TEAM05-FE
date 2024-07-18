import { ReactNode, StrictMode, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FluentProvider } from '@fluentui/react-components';
import { customLightTheme, customDarkTheme } from '@/_types';

import { routeTree } from './routeTree.gen';

import { ThemeContext, ThemeProvider } from '@/_context/themeContext';
const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const FluentProviderTheme = ({ children }: { children: ReactNode }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <FluentProvider
      theme={theme === 'light' ? customLightTheme : customDarkTheme}
    >
      {children}
    </FluentProvider>
  );
};

const rootElement = document.getElementById('app')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
        useErrorBoundary: true,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      },
    },
  });

  root.render(
    <StrictMode>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <FluentProviderTheme>
            <RouterProvider router={router} />
          </FluentProviderTheme>
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>
  );
}
