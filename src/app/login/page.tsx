'use client';

import LoginForm from '@/components/auth/LoginForm';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import React from 'react';

const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="flex justify-center items-center flex-grow py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <LoginForm />
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
