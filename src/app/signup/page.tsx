'use client';

import SignupForm from '@/components/auth/SignupForm';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import React from 'react';

const SignupPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="flex justify-center items-center flex-grow py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Create an account to start swapping books!
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <SignupForm />
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;
