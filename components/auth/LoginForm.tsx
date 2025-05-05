'use client';

import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthContext } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'react-toastify';
import { login } from '@/lib/api';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  if (!authContext) {
    throw new Error('LoginForm must be used within an AuthProvider');
  }

  const { login: loginContext } = authContext;

  const form = useForm<LoginFormData>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data);
      loginContext(response.data);
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch  {
      toast.error('Login failed!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 bg-card rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Login</h2>
          <FormField
            control={form.control}
            name="email"
            rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            rules={{ required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-4">
            Login
          </Button>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-primary hover:underline" aria-label="Sign up for a new account">
              Sign up
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;