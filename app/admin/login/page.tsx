import { Logo } from '@/components/ui/logo';
import LoginForm from './login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Logo className="mb-8" />
          <h2 className="text-2xl font-bold text-primary-dark">
            Admin Login
          </h2>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}