
import React from 'react';
import SignupForm from '@/components/auth/SignupForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SignupPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-soft-blue">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create an account to start swapping books!</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
