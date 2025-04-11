"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '../ui/button';

const roleOptions = [
  { value: 'owner', label: 'Book Owner' },
  { value: 'seeker', label: 'Book Seeker' },
];

const signupSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),  
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type SignupValues = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignupValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setSignupSuccess(true);
        // Optionally, you can automatically redirect to the login page after a delay
        // setTimeout(() => window.location.href = '/login', 3000);
      } else {
        const errorData = await response.json();
        form.setError('root', { type: 'manual', message: errorData.message || 'Signup failed.' });
      }
    } catch (error) {
      form.setError('root', { type: 'manual', message: 'An error occurred during signup.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {signupSuccess ? (
        <div className="mt-4 text-green-500">
          Signup successful! Please <a href="/login" className="text-blue-500 hover:underline">login</a>.
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {form.formState.error?.root && (
              <div className="text-red-500">{form.formState.error.root.message}</div>
            )}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="(123) 456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
            <Button type="submit" disabled={isSubmitting} >
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </form>
        </Form>
      )}
    </>
  );
};

export default SignupForm;
