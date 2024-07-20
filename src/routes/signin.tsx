import { createFileRoute } from '@tanstack/react-router';
import { SignInForm } from '@/pages/signin/signinform';

export const Route = createFileRoute('/signin')({
  component: () => <SignInForm />,
});
