import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { NavBar, Button, Input } from '@/_components';
import { DarkThemeToggle } from 'flowbite-react';

export const Route = createRootRoute({
  component: () => (
    <main>
      <NavBar />
      <Outlet />
      <TanStackRouterDevtools />
    </main>
  ),
});
