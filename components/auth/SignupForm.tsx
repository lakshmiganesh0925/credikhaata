'use client';

import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'react-toastify';
import { signup } from '@/lib/api';
import Link from 'next/link';

interface SignupFormData {
  email: string;
  password: string;
}

const SignupForm = () => {
  const { login } = useContext(AuthContext)!;
  const router = useRouter();
  const form = useForm<SignupFormData>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await signup(data);
      login(response.data);
      toast.success('Signup successful!');
      router.push('/dashboard');
    } catch {
      toast.error('Signup failed!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 bg-card rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Signup</h2>
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
            Signup
          </Button>
          <p className="mt-4 text-center text-sm text-muted-foreground">
                      U have an account?{' '}
                      <Link href="/login" className="text-primary hover:underline" aria-label="Sign up for a new account">
                        Login
                      </Link>
                    </p>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;